---
name: migrate
description: Migrate lodash code to es-toolkit. Use when the user wants to replace lodash imports, reduce bundle size by switching to es-toolkit, or decide between es-toolkit and es-toolkit/compat.
argument-hint: '<paste lodash code, a file path, or a function name>'
allowed-tools: Read, Grep, Glob, Edit, Bash
---

# Lodash → es-toolkit Migration

## The one mistake to avoid

Guessing which entry point a function belongs to **is wrong about half the time**. Measured with Claude Haiku 4.5 against a real project: 7 of 15 lodash functions produced an import from the wrong entry point, reproducing 21/21 across repeated runs. Every one of them type-checks and then resolves to `undefined` at runtime.

Resolving it costs a single command, so run it whatever model you are — the check in step 1 is authoritative and takes about a second.

- `es-toolkit/compat` — lodash-compatible. **This is the default target for a migration**
- `es-toolkit` — the strict API. Many functions available in compat are not here
- `es-toolkit/fp` — data-last, `pipe`-based

Most lodash functions exist in compat, but `chain`, `tap`, `thru`, `mixin`, and `sortedUniq` exist **nowhere**. When later moving to strict, remember that `get`, `set`, `has`, `castArray`, `defaultsDeep`, `toArray`, `assign`, and `defaults` have to stay on compat.

Single-function packages count too. A codebase that imports `lodash.orderby`, `lodash.omit`, or `lodash.throttle` — rather than `lodash` itself — is doing the same thing under a different specifier, and migrates the same way. Grep for `lodash` in `package.json`, not just for `from 'lodash'` in source.

## Step 1 — Resolve every entry point (required, do this first)

Collect the lodash functions in the input, then run this **from the package directory that depends on es-toolkit** — in a monorepo that is the workspace package, not the repo root, where nothing resolves. If the repo has a `.pnp.cjs` (Yarn PnP), run `yarn node` instead of `node`; plain `node` cannot resolve anything there.

```bash
node --input-type=module -e "
const names = ['get','chunk','map','chain'];
const entries = ['es-toolkit','es-toolkit/fp','es-toolkit/server','es-toolkit/compat'];
const mods = await Promise.all(entries.map(e => import(e).then(m => m, () => null)));
if (!mods[0]) {
  console.error('es-toolkit is not resolvable from ' + process.cwd() + ' — run this inside the package that depends on it.');
  process.exit(1);
}
for (const n of names) {
  const found = entries.filter((_, i) => mods[i] && n in mods[i]);
  console.log(n.padEnd(16), found.join(', ') || 'NOT AVAILABLE');
}
const missing = entries.filter((_, i) => !mods[i]);
if (missing.length) console.log('(not in this version: ' + missing.join(', ') + ')');
"
```

Replace `names` with the actual function names. The output is authoritative — it reflects the version the user installed, so it never goes stale.

Entry points were added over time (`server` in 1.47.0, `fp` in 1.49.0), so older installs legitimately lack some of them — that is why each import is tolerated individually rather than through a bare `Promise.all`, which throws `ERR_PACKAGE_PATH_NOT_EXPORTED` and takes the whole check down.

**A function can appear in more than one entry point**, so read the whole list rather than the first hit. For example `map` and `filter` are in both `fp` and `compat` but not in strict, `sum` is in strict and `compat` but not `fp`, and `chunk` is in all three.

### The default is `es-toolkit/compat`

The recommended migration path has two stages (`docs/compat/intro.md`):

1. Change the import path from `lodash` / `lodash-es` to `es-toolkit/compat`. **Leave call sites as they are.**
2. Clean up call sites over time and move to `es-toolkit`.

This skill handles stage 1. compat matches lodash behavior 1:1, so nothing changes at runtime. **Default to moving onto compat**; moving to strict is a separate stage that goes call site by call site. Do not mix the two in one pass.

Use strict during this stage only when:

- the user explicitly asks for it, or
- the function is not in compat

If the user wants to go through stage 2 as well, verify each call site against step 2 first, then move it.

For environments without tree shaking (CommonJS `require()`, React Native, Node without a bundler), mention that per-function entry points also exist:

```ts
import merge from 'es-toolkit/compat/merge';
```

If a function reports `NOT AVAILABLE`, do not invent a replacement. Say it is unavailable and either keep lodash for that call or propose a rewrite. `chain`/`tap`/`thru` in particular mean the code uses lodash's chaining style, which has no drop-in equivalent — migrating it is a restructure into plain calls or `es-toolkit/fp`'s `pipe`, so flag that as its own decision rather than a mechanical swap.

## Step 2 — Only needed when moving to strict

While moving onto compat, behavior is unchanged, so this step can be skipped. Do it when the user wants to move a specific call site to strict.

A function present in **both** strict and compat is not interchangeable between them. Read the signature and JSDoc from the installed package — locate it with `node -e "console.log(require.resolve('es-toolkit/package.json'))"` rather than assuming `node_modules`, which does not exist under Yarn PnP:

- `<pkg>/dist/{category}/{fn}.d.ts` — strict
- `<pkg>/dist/compat/{category}/{fn}.d.ts` — compat

Both carry full JSDoc with `@example`. Compare against how the user actually calls the function, and report any option or edge case that differs. Real examples:

- `chunk` — strict throws on `null` input and on a non-positive or fractional `size`; lodash and compat return `[]` or coerce
- `debounce` — strict has no `maxWait` and returns `void`; compat supports both
- `merge` — strict takes exactly 2 arguments; lodash and compat are variadic
- `get` — returns the default only when the resolved value is `undefined`, so `?.` with `??` is **not** an equivalent rewrite when the value can be `null`

Move the call sites you have confirmed to be equivalent, and state the assumption you relied on. Call sites you have not checked yet can stay on compat and be picked up later — mixing the two is fine.

## Step 3 — Apply the migration

Change the import path to `es-toolkit/compat` and leave call sites alone:

```js
// before
import { chunk, debounce, get } from 'lodash';

// after
import { chunk, debounce, get } from 'es-toolkit/compat';
```

Group separately any function that has to come from strict or fp because compat does not have it.

Edit the actual files when the user pointed at code. Afterwards, verify: run the project's typecheck or tests if they exist, and confirm no lodash imports remain (`Grep` for `'lodash'`).

For a large migration, mention that a bundler alias (`resolve.alias: { lodash: 'es-toolkit/compat' }`) switches everything at once with no source changes, and that ESLint's `no-restricted-imports` then surfaces whatever is left.

## Step 4 — Measure the size saving (only if the user asks)

Do not run this automatically. Offer it, and run it on request.

**Install nothing.** The script below detects which lodash functions the project actually uses, then measures with the esbuild **already present** in the project — most app projects have one as a transitive dependency of Vite, Vitest, or similar. That gives real minified and gzipped numbers in well under a second. If no esbuild is resolvable it falls back to summing source bytes and says so.

Write it as a temporary file **in the package directory that depends on es-toolkit**, run it, then delete it. Under Yarn PnP run it with `yarn node`. It anchors module resolution to the working directory, so running it from anywhere else measures the wrong packages.

```js
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

// 해석 기준은 실행 위치(cwd) — 스크립트 파일 위치가 아니다
const require = createRequire(path.join(process.cwd(), '__estimator__.js'));
const SRC_DIRS = ['src', 'app', 'pages', 'lib', 'components'];
const SKIP = new Set(['node_modules', '.next', 'dist', 'build', '.git', 'coverage']);
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

// ── 1. 소스에서 실제 lodash 사용 수집
function collect(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) collect(p, out);
    else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(e.name)) out.push(p);
  }
  return out;
}
const usage = new Map(); // fn -> specifier
const unmeasurable = new Set();
for (const f of SRC_DIRS.flatMap(d => collect(path.resolve(d)))) {
  const src = strip(readFileSync(f, 'utf8'));
  for (const [, spec] of [
    ...src.matchAll(/from\s*["'](lodash[.\/][^"']*)["']/g),
    ...src.matchAll(/require\(\s*["'](lodash[.\/][^"']*)["']\s*\)/g),
  ]) {
    const m = spec.match(/^lodash[.\/](.+)$/);
    if (m) usage.set(m[1], spec);
  }
  for (const [, names] of [
    ...src.matchAll(/import\s*\{([^}]+)\}\s*from\s*["'](lodash(?:-es)?)["']/g),
    ...src.matchAll(/\{([^}]+)\}\s*=\s*require\(\s*["'](lodash(?:-es)?)["']\s*\)/g),
  ])
    for (const n of names.split(',')) {
      const name = n
        .trim()
        .split(/\s+as\s+/)[0]
        .trim();
      if (name) usage.set(name, src.includes("'lodash-es'") ? 'lodash-es' : 'lodash');
    }
  if (
    /import\s+(?:\w+\s*,\s*)?(?:\*\s*as\s+\w+|\w+)\s+from\s*["']lodash(?:-es)?["']/.test(src) ||
    /export\s*\{[^}]*\}\s*from\s*["']lodash(?:-es)?["']/.test(src) ||
    /import\(\s*["']lodash/.test(src)
  )
    unmeasurable.add(path.relative(process.cwd(), f));
}
if (unmeasurable.size) {
  console.warn('NOTE: import forms this script cannot follow (default / namespace / re-export /');
  console.warn('      dynamic) — excluded from the numbers, so the estimate is partial:');
  for (const f of unmeasurable) console.warn(`      ${f}`);
  console.warn('');
}
if (!usage.size) {
  console.error(`No measurable lodash usage under ${SRC_DIRS.join(', ')} in ${process.cwd()}`);
  process.exit(1);
}

// ── 2. es-toolkit 진입점 확인
let compatMod, strictMod;
try {
  compatMod = await import(pathToFileURL(require.resolve('es-toolkit/compat')).href);
  strictMod = await import(pathToFileURL(require.resolve('es-toolkit')).href);
} catch {
  console.error(`es-toolkit is not resolvable from ${process.cwd()} — run this inside the package that depends on it.`);
  process.exit(1);
}
const canon = n => Object.keys(compatMod).find(k => k.toLowerCase() === n.toLowerCase()) ?? n;
const fns = [...usage.keys()].map(canon);
const missing = fns.filter(f => !(f in compatMod));
const inStrict = fns.filter(f => f in strictMod);
const onlyCompat = fns.filter(f => f in compatMod && !(f in strictMod));

console.log(`detected: ${fns.join(', ')}`);
if (missing.length) console.log(`NOT AVAILABLE in es-toolkit: ${missing.join(', ')} (keep lodash or rewrite)`);
const usable = fns.filter(f => f in compatMod);
if (!usable.length) process.exit(0);

// ── 3. 측정: 이미 설치된 esbuild가 있으면 정확히, 없으면 파일 크기로 근사
let esbuild = null;
try {
  esbuild = await import(pathToFileURL(require.resolve('esbuild')).href);
} catch {}

const importsFor = (mod, names) =>
  names.map(n => `import { ${n} } from '${mod}';`).join('') + `console.log(${names.join(',')})`;
const asIsScript =
  [...usage]
    .filter(([k]) => usable.includes(canon(k)))
    .map(([k, spec]) =>
      spec.startsWith('lodash.') || spec.includes('/')
        ? `import _${canon(k)} from '${spec}';`
        : `import { ${canon(k)} } from '${spec}';`
    )
    .join('') +
  `console.log(${[...usage]
    .filter(([k]) => usable.includes(canon(k)))
    .map(([k, spec]) => (spec.startsWith('lodash.') || spec.includes('/') ? '_' : '') + canon(k))
    .join(',')})`;

if (esbuild) {
  const build = async script => {
    const out = await esbuild.build({
      stdin: { contents: script, resolveDir: process.cwd(), sourcefile: 'entry.js', loader: 'js' },
      write: false,
      minify: true,
      bundle: true,
      format: 'esm',
      logLevel: 'silent',
    });
    const raw = Buffer.from(out.outputFiles[0].contents);
    return { min: raw.byteLength, gz: gzipSync(raw).byteLength };
  };
  const rows = [];
  try {
    rows.push(['AS-IS   lodash', await build(asIsScript)]);
  } catch (e) {
    console.error('could not bundle the lodash side:', String(e).split('\n')[0]);
    process.exit(1);
  }
  rows.push(['TO-BE   es-toolkit/compat', await build(importsFor('es-toolkit/compat', usable))]);
  if (inStrict.length === usable.length)
    rows.push(['        es-toolkit', await build(importsFor('es-toolkit', usable))]);
  const base = rows[0][1].min,
    baseGz = rows[0][1].gz;
  console.log('');
  for (const [label, r] of rows) {
    const pct = label.startsWith('AS-IS')
      ? ''
      : `   -${(100 - (r.min / base) * 100).toFixed(0)}% min / -${(100 - (r.gz / baseGz) * 100).toFixed(0)}% gzip`;
    console.log(`${label.padEnd(26)} ${String(r.min).padStart(8)} B min   ${String(r.gz).padStart(7)} B gzip${pct}`);
  }
  if (onlyCompat.length) console.log(`        these stay on compat: ${onlyCompat.join(', ')}`);
  console.log('\nBundled with the esbuild already present in this project (nothing installed).');
  console.log('Real numbers, though for an isolated entry point — a full app shares deps and splits chunks.');
} else {
  const size = f => {
    try {
      const s = statSync(f);
      return s.isFile() ? s.size : 0;
    } catch {
      return 0;
    }
  };
  const rel = (from, spec) => {
    const b = path.resolve(path.dirname(from), spec);
    return (
      [b, b + '.mjs', b + '.js', b.replace(/\.js$/, '.mjs'), path.join(b, 'index.mjs'), path.join(b, 'index.js')].find(
        c => size(c)
      ) ?? null
    );
  };
  const walk = (f, seen = new Set()) => {
    if (!f || seen.has(f) || !size(f)) return seen;
    seen.add(f);
    const src = strip(readFileSync(f, 'utf8'));
    for (const [, s] of [
      ...src.matchAll(/from\s*["']([^"']+)["']/g),
      ...src.matchAll(/require\(\s*["']([^"']+)["']\s*\)/g),
    ]) {
      if (s.startsWith('.')) walk(rel(f, s), seen);
      else {
        try {
          walk(require.resolve(s), seen);
        } catch {}
      }
    }
    return seen;
  };
  const dist = path.join(path.dirname(require.resolve('es-toolkit/package.json')), 'dist');
  const find = (fn, compat) => {
    const hits = [];
    (function rec(d) {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) rec(p);
        else if (e.name === `${fn}.mjs`) hits.push(path.relative(dist, p));
      }
    })(dist);
    const pick = compat
      ? hits.find(h => h.startsWith('compat' + path.sep))
      : hits.find(h => !h.startsWith('compat' + path.sep) && !h.startsWith('fp' + path.sep));
    return pick ? path.join(dist, pick) : null;
  };
  const sum = s => [...s].reduce((n, f) => n + size(f), 0);
  const before = new Set(),
    compat = new Set(),
    strict = new Set();
  for (const [k, spec] of usage) {
    const fn = canon(k);
    if (!usable.includes(fn)) continue;
    try {
      walk(require.resolve(spec)).forEach(f => before.add(f));
    } catch {}
    const c = find(fn, true),
      s = find(fn, false);
    if (c) walk(c).forEach(f => compat.add(f));
    walk(s ?? c).forEach(f => strict.add(f));
  }
  const b = sum(before),
    c = sum(compat),
    s = sum(strict);
  if (!b) {
    console.error('Could not locate the lodash packages from this directory.');
    process.exit(1);
  }
  console.log('');
  console.log(`AS-IS   lodash              ${String(b).padStart(8)} B`);
  console.log(`TO-BE   es-toolkit/compat   ${String(c).padStart(8)} B   -${(100 - (c / b) * 100).toFixed(0)}%`);
  console.log(`        es-toolkit          ${String(s).padStart(8)} B   -${(100 - (s / b) * 100).toFixed(0)}%`);
  if (onlyCompat.length) console.log(`        these stay on compat: ${onlyCompat.join(', ')}`);
  console.log('\nesbuild is not installed here, so these are raw source bytes, not shipped size.');
  console.log('Quote the percentages (within ~5pp of a real bundle in testing), never the byte counts.');
}
```

Reading the output:

- **With esbuild** the byte counts are real shipped sizes; report the gzip figure, since that is what users download. It measures an isolated entry point, so a full app — sharing dependencies across modules and splitting chunks — will differ, but the ratio holds.
- **Without esbuild** only the percentages are trustworthy (they landed within ~5pp of a bundled measurement in testing: −73% vs −69% on one service). The absolute bytes run several times high, so do not quote them.
- Functions absent from es-toolkit are named rather than silently skipped, as are import forms the scanner cannot follow (`import _ from 'lodash'`, namespace imports, re-exports, dynamic `import()`). If those appear, say the estimate is partial.

Do not ask the user to run their own production build for a better number. It takes far longer and is rarely worth it — but if they do compare builds themselves, warn them first that **dependencies marked external never land in the output**, so a before/after comparison of a library build, an SSR bundle, or anything with `rollupOptions.external` will show no difference or an apparent regression until that setting is dropped.

Runtime benchmarks are usually not worth it: for typical call volumes the difference is unmeasurable in a real app, and microbenchmarks mislead. Only run one if the user explicitly asks.

## Wrap up as if the user is new to es-toolkit

When the work is done, summarize briefly. Assume the user has never used es-toolkit and avoid terms they would have to look up.

**1. What changed**

Only the import path changed; the calling code is untouched, and `es-toolkit/compat` is built to match lodash behavior — so **it behaves exactly as before**. This is what a first-time user most wants to know.

**2. How much smaller it gets** (if measured)

Show AS-IS / TO-BE. If esbuild measured it, the gzip figure is the one worth quoting — that is what users download. If it fell back to source bytes, give the percentage only.

**3. What they can do next**

Explain what moving on to `es-toolkit` (strict) improves. Frame it as an optional next stage they can take one function at a time, not something they have to do now:

- smaller bundle and faster execution — compat carries extra logic to match lodash's behavior
- safer types — strict exposes only the modern, type-safe forms
- lodash's dated APIs get cleaned up — compat keeps deprecated functions for parity, strict does not

If you measured, include how much more it would save. And if some functions have to stay on compat (like `get`), say so up front so they don't expect to move everything.

**4. Where to read more**

Point to `https://es-toolkit.dev/compat/intro.html` (migration overview) and `https://es-toolkit.dev/intro.html` (what es-toolkit is).

## Linking to docs

Function pages need the `.html` suffix or the site 404s:

- strict: `https://es-toolkit.dev/reference/{category}/{fn}.html`
- compat: `https://es-toolkit.dev/compat/reference/{category}/{fn}.html`
- fp: `https://es-toolkit.dev/fp/reference/{fn}.html` (flat, no category)

If you are unsure a page exists, omit the link rather than guessing one.
