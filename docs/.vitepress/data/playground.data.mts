import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

export interface PlaygroundCategory {
  name: string;
  functions: string[];
}

export interface PlaygroundFunctionDoc {
  description: string;
  params: Array<{ name: string; type: string; description: string }>;
  returns: { type: string; description: string } | null;
}

export interface PlaygroundData {
  categories: PlaygroundCategory[];
  examples: Record<string, string>;
  docs: Record<string, PlaygroundFunctionDoc>;
  localizedDocs: Record<string, Record<string, PlaygroundFunctionDoc>>;
}

const LOCALES = ['en', 'ko', 'ja', 'zh_hans'];

const CATEGORY_ORDER = [
  'array',
  'function',
  'math',
  'object',
  'predicate',
  'promise',
  'string',
  'set',
  'map',
  'error',
  'util',
];

// Directories under docs/reference/ that are NOT function categories:
// - compat: lodash-compatible variants, not standard es-toolkit functions
// - server: server-only modules whose imports won't resolve through 'es-toolkit' in Sandpack
const EXCLUDED_DIRS = ['compat', 'server'];

interface ParseResult {
  code: string;
  doc: PlaygroundFunctionDoc;
}

function parseMarkdown(content: string, fnName: string): ParseResult | null {
  // 1. Extract description (first paragraph after "# heading")
  let description = '';
  const descMatch = content.match(/^#\s+.+\s*\n\s*\n(.+)/m);
  if (descMatch) {
    description = descMatch[1].trim();
  } else {
    // Fallback: first non-blank, non-heading, non-comment line
    const fallback = content.match(/^(?!#|<!--|---|\s*$)(.+)/m);
    if (fallback) {
      description = fallback[1].trim();
    }
  }

  // 2. Extract parameters
  const paramsSection = content.match(/####\s*Parameters\s*\n([\s\S]*?)(?=\n####|\n##|$)/);
  const params: string[] = [];
  const docParams: PlaygroundFunctionDoc['params'] = [];
  if (paramsSection) {
    const paramLines = paramsSection[1].matchAll(/^-\s+`(\w+)`\s+\((`[^`]+`)\):\s*(.+)/gm);
    for (const m of paramLines) {
      params.push(`// @param ${m[1]} (${m[2].replace(/`/g, '')}) - ${m[3].trim()}`);
      docParams.push({ name: m[1], type: m[2].replace(/`/g, ''), description: m[3].trim() });
    }
  }

  // 3. Extract returns
  const returnsSection = content.match(/####\s*Returns\s*\n\s*\n?\s*\((`[^`]+`)\):\s*(.+)/);
  let returnsLine = '';
  let docReturns: PlaygroundFunctionDoc['returns'] = null;
  if (returnsSection) {
    returnsLine = `// @returns (${returnsSection[1].replace(/`/g, '')}) - ${returnsSection[2].trim()}`;
    docReturns = { type: returnsSection[1].replace(/`/g, ''), description: returnsSection[2].trim() };
  }

  // 4. Extract throws
  const throwsSection = content.match(/####\s*Throws\s*\n\s*\n?\s*(.+)/);
  let throwsLine = '';
  if (throwsSection) {
    throwsLine = `// @throws ${throwsSection[1].trim()}`;
  }

  // 5. Extract sandpack code block
  let code = '';
  const sandpackMatch = content.match(/:::\s*sandpack\s*\n\s*```ts\s+index\.ts\s*\n([\s\S]*?)```\s*\n\s*:::/);
  if (sandpackMatch) {
    code = sandpackMatch[1].trim();
  }

  // 6. If no sandpack, try the first usage code block with an import
  if (!code) {
    const usageMatch = content.match(
      /```typescript\s*\nimport\s*\{[^}]*\}\s*from\s*'es-toolkit[^']*';\s*\n([\s\S]*?)```/
    );
    if (usageMatch) {
      code = usageMatch[0]
        .replace(/```typescript\s*\n/, '')
        .replace(/\n```$/, '')
        .trim();
    }
  }

  if (!code) {
    return null;
  }

  // Normalize import paths: 'es-toolkit/array' → 'es-toolkit'
  // Keep subpath imports for categories not re-exported from main entry (map, set)
  const SUBPATH_ONLY = ['map', 'set'];
  code = code.replace(/from 'es-toolkit\/([^']+)'/g, (match, subpath) => {
    if (SUBPATH_ONLY.includes(subpath)) {
      return match;
    }
    return "from 'es-toolkit'";
  });

  // Auto-insert console.log so results are visible in Sandpack console.
  if (!code.includes('console.log')) {
    const lines = code.split('\n');
    const result: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Skip empty lines, comments, imports, type/interface declarations
      if (
        !trimmed ||
        trimmed.startsWith('//') ||
        trimmed.startsWith('import ') ||
        trimmed.startsWith('type ') ||
        trimmed.startsWith('interface ') ||
        trimmed.startsWith('export ') ||
        trimmed.startsWith('function ') ||
        trimmed.startsWith('class ')
      ) {
        result.push(line);
        continue;
      }

      // Assignment: const/let/var x = ...;
      // Add console.log(varName) after the declaration statement.
      const assignMatch = trimmed.match(/^(?:const|let|var)\s+(\w+)\s*=/);
      if (assignMatch) {
        result.push(line);

        let openBrackets = (trimmed.match(/[([{]/g) || []).length;
        let closeBrackets = (trimmed.match(/[)\]}]/g) || []).length;
        let hasStatementEnded = trimmed.endsWith(';') && openBrackets === closeBrackets;

        while (!hasStatementEnded && i + 1 < lines.length) {
          i++;
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();
          result.push(nextLine);

          openBrackets += (nextLine.match(/[([{]/g) || []).length;
          closeBrackets += (nextLine.match(/[)\]}]/g) || []).length;
          hasStatementEnded = nextTrimmed.endsWith(';') && openBrackets === closeBrackets;
        }

        // Add console.log after the assignment (skip if next line is a comment describing the result)
        const nextTrimmed = i + 1 < lines.length ? lines[i + 1].trim() : '';
        if (!nextTrimmed.startsWith('console.log')) {
          result.push(`console.log('${assignMatch[1]}:', ${assignMatch[1]});`);
        }
        continue;
      }

      // Bare expression statement (function call without assignment)
      // Skip statements that aren't safe to wrap: throw, return, await, delete, and
      // lines with unbalanced brackets (likely part of a multi-line statement)
      if (trimmed.endsWith(';') && !trimmed.startsWith('{') && !trimmed.startsWith('}')) {
        const UNSAFE_KEYWORDS = /^(throw|return|await|delete|break|continue)\b/;
        const openBrackets = (trimmed.match(/[([{]/g) || []).length;
        const closeBrackets = (trimmed.match(/[)\]}]/g) || []).length;
        if (!UNSAFE_KEYWORDS.test(trimmed) && openBrackets === closeBrackets) {
          const expr = trimmed.replace(/;$/, '');
          result.push(`console.log(${expr});`);
          continue;
        }
      }

      result.push(line);
    }

    code = result.join('\n');
  }

  // Build the commented example
  const commentLines = [`// ${fnName}`];
  if (description) {
    commentLines.push(`// ${description}`);
  }
  if (params.length > 0 || returnsLine || throwsLine) {
    commentLines.push('//');
    commentLines.push(...params);
    if (returnsLine) {
      commentLines.push(returnsLine);
    }
    if (throwsLine) {
      commentLines.push(throwsLine);
    }
  }

  const doc: PlaygroundFunctionDoc = { description, params: docParams, returns: docReturns };

  // Extract the import line from the code and place comments after it
  const importMatch = code.match(/^(import\s+\{[^}]*\}\s+from\s+'[^']+';?\s*\n?)/);
  if (importMatch) {
    const importLine = importMatch[1].trimEnd();
    const restCode = code.slice(importMatch[0].length).replace(/^\n+/, '');
    return { code: `${importLine}\n\n${commentLines.join('\n')}\n\n${restCode}`, doc };
  }

  return { code: `${commentLines.join('\n')}\n\n${code}`, doc };
}

function parseDocOnly(content: string): PlaygroundFunctionDoc | null {
  let description = '';
  const descMatch = content.match(/^#\s+.+\s*\n\s*\n(.+)/m);
  if (descMatch) {
    description = descMatch[1].trim();
  } else {
    const fallback = content.match(/^(?!#|<!--|---|\s*$)(.+)/m);
    if (fallback) {
      description = fallback[1].trim();
    }
  }

  const paramsSection = content.match(/####\s*(?:Parameters|파라미터|パラメータ|参数)\s*\n([\s\S]*?)(?=\n####|\n##|$)/);
  const docParams: PlaygroundFunctionDoc['params'] = [];
  if (paramsSection) {
    const paramLines = paramsSection[1].matchAll(/^-\s+`(\w+)`\s+\((`[^`]+`)\):\s*(.+)/gm);
    for (const m of paramLines) {
      docParams.push({ name: m[1], type: m[2].replace(/`/g, ''), description: m[3].trim() });
    }
  }

  const returnsSection = content.match(/####\s*(?:Returns|반환 값|戻り値|返回值)\s*\n\s*\n?\s*\((`[^`]+`)\):\s*(.+)/);
  let docReturns: PlaygroundFunctionDoc['returns'] = null;
  if (returnsSection) {
    docReturns = { type: returnsSection[1].replace(/`/g, ''), description: returnsSection[2].trim() };
  }

  if (!description && docParams.length === 0 && !docReturns) {
    return null;
  }

  return { description, params: docParams, returns: docReturns };
}

export default {
  watch: [
    '../../reference/**/*.md',
    '../../ko/reference/**/*.md',
    '../../ja/reference/**/*.md',
    '../../zh_hans/reference/**/*.md',
  ],

  load(): PlaygroundData {
    const docsRoot = path.resolve(import.meta.dirname, '../..');
    const refRoot = path.join(docsRoot, 'reference');

    // Scan categories
    const categoryDirs = fs
      .readdirSync(refRoot, { withFileTypes: true })
      .filter(d => d.isDirectory() && !EXCLUDED_DIRS.includes(d.name))
      .map(d => d.name);

    const categories: PlaygroundCategory[] = [];
    const examples: Record<string, string> = {};
    const docs: Record<string, PlaygroundFunctionDoc> = {};

    for (const cat of categoryDirs) {
      const catDir = path.join(refRoot, cat);
      const files = glob.sync('*.md', { cwd: catDir });
      const fns = files.map(f => f.replace(/\.md$/, '')).sort();

      if (fns.length === 0) {
        continue;
      }

      categories.push({ name: cat, functions: fns });

      for (const fn of fns) {
        const mdPath = path.join(catDir, `${fn}.md`);
        const content = fs.readFileSync(mdPath, 'utf-8');
        const result = parseMarkdown(content, fn);
        const selectKey = `${cat}/${fn}`;

        if (result) {
          examples[selectKey] = result.code;
          docs[selectKey] = result.doc;
        }
      }
    }

    // Sort categories by predefined order
    categories.sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a.name);
      const ib = CATEGORY_ORDER.indexOf(b.name);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    // Load locale-specific docs (description, params, returns) for i18n
    const localizedDocs: Record<string, Record<string, PlaygroundFunctionDoc>> = { en: docs };
    for (const locale of LOCALES) {
      if (locale === 'en') {
        continue;
      }
      const localeRefRoot = path.join(docsRoot, locale, 'reference');
      if (!fs.existsSync(localeRefRoot)) {
        continue;
      }

      const localeDocs: Record<string, PlaygroundFunctionDoc> = {};
      for (const cat of categoryDirs) {
        const catDir = path.join(localeRefRoot, cat);
        if (!fs.existsSync(catDir)) {
          continue;
        }
        const files = glob.sync('*.md', { cwd: catDir });
        for (const file of files) {
          const fn = file.replace(/\.md$/, '');
          const content = fs.readFileSync(path.join(catDir, file), 'utf-8');
          const doc = parseDocOnly(content);
          const selectKey = `${cat}/${fn}`;
          if (doc) {
            localeDocs[selectKey] = doc;
          }
        }
      }
      localizedDocs[locale] = localeDocs;
    }

    return { categories, examples, docs, localizedDocs };
  },
};
