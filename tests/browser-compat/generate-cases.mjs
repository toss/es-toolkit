/**
 * Harvests JSDoc `@example` blocks from `src` and turns them into runnable
 * browser test cases.
 *
 * Each example block becomes one case. Expected-value comments
 * (`// => x`, `// Returns: x`, either on the same line or on the following
 * line) are turned into deep-equality assertions; blocks without a parseable
 * expected value are executed and only asserted not to throw.
 *
 * The output (`generated/cases.mjs`) imports the *built* `dist` files, so the
 * suite exercises exactly what npm users download.
 *
 * Requires `yarn build` to have been run at the repository root first.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SRC = path.join(ROOT, 'src');
const OUT_DIR = path.resolve(import.meta.dirname, 'generated');

const SKIP_LIST = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, 'skip-list.json'), 'utf8'));

/** Directories that never produce cases. */
const EXCLUDED_DIRS = new Set(['server', '_internal', 'types']);

/** Categories under src/ that have their own dist entrypoint. */
const CATEGORIES = [
  'array',
  'bigint',
  'error',
  'function',
  'map',
  'math',
  'object',
  'predicate',
  'promise',
  'set',
  'string',
  'util',
];

async function loadNamespaces() {
  const load = async p => {
    const url = pathToFileURL(path.join(ROOT, 'dist', p)).href;
    return new Set(Object.keys(await import(url)));
  };
  const namespaces = {
    main: await load('index.mjs'),
    compat: await load('compat/index.mjs'),
    fp: await load('fp/index.mjs'),
  };
  for (const category of CATEGORIES) {
    namespaces[category] = await load(`${category}/index.mjs`);
  }
  return namespaces;
}

function listSourceFiles() {
  /** @type {string[]} */
  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      const rel = path.relative(SRC, p);
      const top = rel.split(path.sep)[0];
      const compatSub = rel.startsWith(`compat${path.sep}`) ? rel.split(path.sep)[1] : null;
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(top) || (compatSub && EXCLUDED_DIRS.has(compatSub))) {
          continue;
        }
        walk(p);
      } else if (
        entry.name.endsWith('.ts') &&
        !entry.name.endsWith('.spec.ts') &&
        entry.name !== 'index.ts' &&
        entry.name !== 'browser.ts'
      ) {
        files.push(p);
      }
    }
  })(SRC);
  return files.sort();
}

/** Extracts every `@example` section body from all JSDoc blocks of a file. */
function extractExampleBlocks(source) {
  const blocks = [];
  for (const doc of source.match(/\/\*\*[\s\S]*?\*\//g) ?? []) {
    const sections = doc.split(/^\s*\*\s*@example[^\n]*$/m).slice(1);
    for (const section of sections) {
      const lines = [];
      for (const raw of section.split('\n')) {
        if (raw.trim() === '*/') {
          break;
        }
        const line = raw
          .replace(/\*\/\s*$/, '')
          .replace(/^\s*\* ?/, '')
          .replace(/\s+$/, '');
        if (/^@\w+/.test(line)) {
          break;
        }
        if (/^```/.test(line.trim())) {
          continue;
        }
        lines.push(line);
      }
      const text = lines.join('\n').trim();
      if (text.length > 0) {
        blocks.push(text);
      }
    }
  }
  return blocks;
}

const EXPECTED_RE = /\/\/\s*(?:=>|Returns:|Output:|Result:)\s*(.+)$/;
const BARE_COMMENT_RE = /\/\/\s*(.+)$/;

/**
 * Extracts an expected-value expression from a comment, if any.
 * Handles `// => x`, `// Returns: x`, and bare `// [1, 2, 3]` styles.
 */
function expectedFromComment(text) {
  const marked = text.match(EXPECTED_RE);
  if (marked) {
    return asExpression(marked[1]);
  }
  const bare = text.match(BARE_COMMENT_RE);
  if (bare && /^[[{'"`\d-]|^(?:true|false|null|undefined|NaN|Infinity)\b/.test(bare[1].trim())) {
    return asExpression(bare[1]);
  }
  return null;
}

/** Strips TypeScript-only syntax (annotations, casts) that appears in examples. */
function stripTypeScript(code) {
  try {
    return ts
      .transpileModule(code, {
        compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
      })
      .outputText.replace(/\n$/, '');
  } catch {
    return code;
  }
}

/** Returns the JS source of `text` if it parses as a standalone expression. */
function asExpression(text) {
  const trimmed = text.trim().replace(/[;.]$/, '');
  try {
    // eslint-disable-next-line no-new-func
    new Function(`return (${trimmed});`);
    return trimmed;
  } catch {
    return null;
  }
}

function isCompleteStatement(buffer) {
  let depth = 0;
  let inString = null;
  let prev = '';
  for (const ch of buffer) {
    if (inString) {
      if (ch === inString && prev !== '\\') {
        inString = null;
      }
    } else if (ch === "'" || ch === '"' || ch === '`') {
      inString = ch;
    } else if (ch === '(' || ch === '[' || ch === '{') {
      depth++;
    } else if (ch === ')' || ch === ']' || ch === '}') {
      depth--;
    }
    prev = ch;
  }
  const tail = buffer.trim();
  return depth <= 0 && !/(=>|[=,+\-*/&|?:.])$/.test(tail) && !/\b(?:const|let|var|return|await)$/.test(tail);
}

/**
 * Rewrites an example block into an assertion-bearing function body.
 * Returns `{ body, assertions }`.
 */
function transformBlock(block) {
  const lines = block.split('\n');
  /** Each unit is one complete statement (with its assertion) or one comment/blank line. */
  const units = [];
  const out = {
    push: (...items) => {
      for (const item of items) {
        units.push(item);
      }
    },
  };
  let assertions = 0;
  /** Pending completed statement that may receive a next-line assertion. */
  let buffer = [];

  const flush = () => {
    if (buffer.length > 0) {
      units.push(buffer.join('\n'));
    }
    buffer = [];
  };

  const attach = expected => {
    const statement = buffer.join('\n');
    const trimmed = statement.trim().replace(/;$/, '');
    let rewritten = null;
    const constMatch = trimmed.match(/^const\s+([A-Za-z_$][\w$]*)\s*=/s);
    const arrayPatternMatch = trimmed.match(/^const\s+(\[[^\]]+\])\s*=/s);
    const logMatch = trimmed.match(/^console\.log\(([\s\S]+)\)$/);
    if (constMatch) {
      rewritten = `${statement}\n__assertEq(${constMatch[1]}, ${expected});`;
    } else if (arrayPatternMatch) {
      rewritten = `${statement}\n__assertEq(${arrayPatternMatch[1].replace(/,\s*\]$/, ']')}, ${expected});`;
    } else if (logMatch) {
      rewritten = `__assertEq((${logMatch[1]}), ${expected});`;
    } else if (!/^(?:if|for|while|function|class|return|const |let |var )/.test(trimmed)) {
      rewritten = `__assertEq((${trimmed}), ${expected});`;
    }
    if (rewritten != null) {
      buffer = [rewritten];
      assertions++;
    }
    flush();
  };

  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trim();
    if (/^import\b/.test(trimmed)) {
      continue;
    }
    // Standalone expected comment attaches to the buffered statement.
    if (/^\/\//.test(trimmed)) {
      if (buffer.length > 0) {
        const expected = expectedFromComment(trimmed);
        if (expected != null) {
          attach(expected);
          continue;
        }
      }
      flush();
      out.push(line);
      continue;
    }
    if (trimmed === '') {
      flush();
      out.push(line);
      continue;
    }
    // Same-line expected comment.
    const commentIndex = line.indexOf('//');
    let code = line;
    let sameExpected = null;
    if (commentIndex > 0) {
      const candidate = expectedFromComment(line.slice(commentIndex));
      if (candidate != null) {
        sameExpected = candidate;
        code = line.slice(0, commentIndex).replace(/\s+$/, '');
      }
    }
    if (code.trim() === '') {
      continue;
    }
    buffer.push(code);
    if (!isCompleteStatement(buffer.join('\n'))) {
      continue;
    }
    if (sameExpected != null) {
      attach(sameExpected);
    } else {
      flush();
    }
  }
  flush();
  return { body: units.join('\n'), units, assertions };
}

/** ECMAScript reserved words that cannot appear in destructuring shorthand. */
const RESERVED = new Set(
  (
    'break case catch class const continue debugger default delete do else enum export extends false finally for ' +
    'function if import in instanceof new null return super switch this throw true typeof var void while with ' +
    'yield await let static implements interface package private protected public arguments eval'
  ).split(' ')
);

/** Names declared inside the body (must not be shadowed by destructuring). */
function declaredNames(body) {
  const names = new Set();
  for (const m of body.matchAll(/\b(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)) {
    names.add(m[1]);
  }
  return names;
}

function usedNames(body) {
  const names = new Set();
  for (const m of body.matchAll(/[A-Za-z_$][\w$]*/g)) {
    names.add(m[0]);
  }
  return names;
}

/** compat functions whose `.placeholder` can stand in for lodash's bare `_`. */
const PLACEHOLDER_FNS = new Set(['partial', 'partialRight', 'curry', 'curryRight', 'bind', 'bindKey']);

function buildCase({ id, ns, body, assertions, namespaces, placeholderFn }) {
  const declared = declaredNames(body);
  const used = usedNames(body);
  const bindable = n => !declared.has(n) && !RESERVED.has(n);
  const primary = [...used].filter(n => namespaces[ns].has(n) && bindable(n));
  const fallback =
    ns === 'main' ? [] : [...used].filter(n => namespaces.main.has(n) && bindable(n) && !primary.includes(n));
  const bindings = [];
  if (primary.length > 0) {
    bindings.push(`const { ${primary.join(', ')} } = __ns.${ns};`);
  }
  if (fallback.length > 0) {
    bindings.push(`const { ${fallback.join(', ')} } = __ns.main;`);
  }
  // Lodash-style examples in compat use `_` both as the namespace (`_.map`)
  // and as the partial-application placeholder (`partial(fn, _, 'x')`). In
  // lodash these are the same object; in es-toolkit compat the placeholder is
  // `fn.placeholder`, so bind whichever role the example actually uses.
  if (ns === 'compat' && used.has('_') && !declared.has('_')) {
    const usesMember = /\b_\s*\./.test(body);
    const placeholderHost = placeholderFn != null ? `__ns.compat.${placeholderFn}.placeholder` : null;
    if (!usesMember && placeholderHost != null) {
      bindings.push(`const _ = ${placeholderHost};`);
    } else {
      bindings.push(`const _ = __ns.compat;`);
    }
  }
  const isAsync = /\bawait\b/.test(body);
  const fullBody = `'use strict';\n${bindings.join('\n')}\n${body}`;
  try {
    // eslint-disable-next-line no-new-func
    new Function('__ns', '__assertEq', isAsync ? `return (async () => {\n${fullBody}\n})();` : fullBody);
  } catch (error) {
    return { id, error: String(error) };
  }
  return {
    id,
    source: `{\n  id: ${JSON.stringify(id)},\n  async: ${isAsync},\n  assertions: ${assertions},\n  browserOnly: ${
      SKIP_LIST.nodeSkip?.[id] != null
    },\n  run: ${isAsync ? 'async ' : ''}function (__ns, __assertEq) {\n${fullBody}\n  },\n}`,
  };
}

async function main() {
  const namespaces = await loadNamespaces();
  const files = listSourceFiles();
  const cases = [];
  const failures = [];
  const skipped = [];
  const coveredNames = {};

  for (const file of files) {
    const rel = path.relative(SRC, file).replace(/\\/g, '/');
    const top = rel.split('/')[0];
    // Main-library files bind against their category entrypoint so that
    // category-specific functions shadowed in the barrel (e.g. bigint/range)
    // resolve to the right implementation.
    const ns = top === 'compat' ? 'compat' : top === 'fp' ? 'fp' : top;
    if (namespaces[ns] == null) {
      continue;
    }
    const name = path.basename(file, '.ts');
    const exported = namespaces[ns].has(name) || (ns !== 'main' && namespaces.main.has(name));
    if (!exported) {
      continue;
    }
    const source = fs.readFileSync(file, 'utf8');
    const blocks = extractExampleBlocks(source);
    blocks.forEach((block, index) => {
      const id = `${ns}:${rel.replace(/\.ts$/, '')}#${index}`;
      if (SKIP_LIST.skip[id] != null) {
        skipped.push(id);
        return;
      }
      const { body, assertions } = transformBlock(stripTypeScript(block));
      const override = SKIP_LIST.overrides?.[id];
      const attempts =
        override != null
          ? [{ body: override, assertions: 0 }]
          : [
              { body, assertions },
              // Scope blank-line-separated paragraphs to tolerate redeclared consts.
              {
                body: body
                  .split(/\n\s*\n/)
                  .map(p => `{\n${p}\n}`)
                  .join('\n'),
                assertions,
              },
              // Last resort: run the raw example as-is, without assertions.
              { body: stripTypeScript(block), assertions: 0 },
            ];
      let built = null;
      for (const attempt of attempts) {
        const candidate = buildCase({
          id,
          ns,
          body: attempt.body,
          assertions: attempt.assertions,
          namespaces,
          placeholderFn: PLACEHOLDER_FNS.has(name) ? name : null,
        });
        if (candidate.error == null) {
          built = candidate;
          break;
        }
        built ??= candidate;
      }
      if (built.error != null) {
        failures.push({ id, error: built.error });
        return;
      }
      cases.push(built);
      if (namespaces[ns].has(name)) {
        (coveredNames[ns] ??= new Set()).add(name);
      }
    });
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const header = [
    '// Generated by generate-cases.mjs — do not edit.',
    "import * as __mainNs from '../../../dist/index.mjs';",
    "import * as __compatNs from '../../../dist/compat/index.mjs';",
    "import * as __fpNs from '../../../dist/fp/index.mjs';",
    ...CATEGORIES.map(c => `import * as __${c}Ns from '../../../dist/${c}/index.mjs';`),
    `export const namespaces = { main: __mainNs, compat: __compatNs, fp: __fpNs, ${CATEGORIES.map(
      c => `${c}: __${c}Ns`
    ).join(', ')} };`,
    'export const cases = [',
  ].join('\n');
  fs.writeFileSync(path.join(OUT_DIR, 'cases.mjs'), `${header}\n${cases.map(c => `${c.source},`).join('\n')}\n];\n`);

  const report = {
    total: cases.length,
    skipped: skipped.length,
    failures,
    covered: Object.fromEntries(Object.entries(coveredNames).map(([k, v]) => [k, [...v].sort()])),
  };
  fs.writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2));

  console.log(`generated ${cases.length} cases (${skipped.length} skipped)`);
  if (failures.length > 0) {
    console.error(`\n${failures.length} example blocks could not be turned into cases:`);
    for (const f of failures) {
      console.error(`  ${f.id}: ${f.error.split('\n')[0]}`);
    }
    process.exitCode = 1;
  }
}

await main();
