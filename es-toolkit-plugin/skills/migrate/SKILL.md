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

## Step 4 — Estimate the size saving (only if the user asks)

Do not run this automatically. Offer it, and run it on request.

**Do not install anything.** Measuring with a bundler is more accurate, but it leaves a dependency and a lockfile change in the user's project. Instead, scan the source for lodash usage and walk the packages already installed. The script below uses only Node built-ins and takes no configuration — it detects which functions the project actually uses.

Write it as a temporary file **in the package directory that depends on es-toolkit**, run it, then delete it. Under Yarn PnP run it with `yarn node`. It anchors module resolution to the working directory, so running it from anywhere else measures the wrong packages.

```js
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// 해석 기준은 실행 위치(cwd) — 스크립트 파일 위치가 아니다
const require = createRequire(path.join(process.cwd(), '__estimator__.js'));

const SRC_DIRS = ['src', 'app', 'pages', 'lib', 'components'];
const SKIP = new Set(['node_modules', '.next', 'dist', 'build', '.git', 'coverage']);

const size = f => {
  try {
    const s = statSync(f);
    return s.isFile() ? s.size : 0;
  } catch {
    return 0;
  }
};
const stripComments = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const repoRoot = (() => {
  let cur = process.cwd();
  while (cur !== path.dirname(cur)) {
    if (existsSync(path.join(cur, '.git')) || existsSync(path.join(cur, 'pnpm-workspace.yaml'))) return cur;
    cur = path.dirname(cur);
  }
  return process.cwd();
})();

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
const usage = new Map();
const unmeasurable = new Set();
for (const f of SRC_DIRS.flatMap(d => collect(path.resolve(d)))) {
  const src = stripComments(readFileSync(f, 'utf8'));
  for (const [, spec] of [
    ...src.matchAll(/from\s*["'](lodash[.\/][^"']*)["']/g),
    ...src.matchAll(/require\(\s*["'](lodash[.\/][^"']*)["']\s*\)/g),
  ]) {
    const m = spec.match(/^lodash[.\/](.+)$/);
    if (m) usage.set(m[1], (usage.get(m[1]) ?? new Set()).add(spec));
  }
  for (const [, names] of [
    ...src.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']lodash(?:-es)?["']/g),
    ...src.matchAll(/\{([^}]+)\}\s*=\s*require\(\s*["']lodash(?:-es)?["']\s*\)/g),
  ])
    for (const n of names.split(',')) {
      const name = n
        .trim()
        .split(/\s+as\s+/)[0]
        .trim();
      if (name) usage.set(name, (usage.get(name) ?? new Set()).add('lodash'));
    }
  // 측정 불가 형태는 조용히 넘기지 않고 알린다
  if (
    /import\s+(?:\w+\s*,\s*)?(?:\*\s*as\s+\w+|\w+)\s+from\s*["']lodash(?:-es)?["']/.test(src) ||
    /export\s*\{[^}]*\}\s*from\s*["']lodash(?:-es)?["']/.test(src) ||
    /import\(\s*["']lodash/.test(src)
  )
    unmeasurable.add(path.relative(process.cwd(), f));
}

let dist, compatMod;
try {
  dist = path.join(path.dirname(require.resolve('es-toolkit/package.json')), 'dist');
  compatMod = await import(pathToFileURL(require.resolve('es-toolkit/compat')).href);
} catch {
  console.error(`es-toolkit is not resolvable from ${process.cwd()} — run this inside the package that depends on it.`);
  process.exit(1);
}
const canon = n => Object.keys(compatMod).find(k => k.toLowerCase() === n.toLowerCase()) ?? n;

if (unmeasurable.size) {
  console.warn('NOTE: these files use a lodash import form this script cannot measure');
  console.warn('      (default / namespace / re-export / dynamic import) — excluded from the numbers:');
  for (const f of unmeasurable) console.warn(`      ${f}`);
  console.warn('');
}
if (!usage.size) {
  console.error(`No measurable lodash usage under ${SRC_DIRS.join(', ')} in ${process.cwd()}`);
  process.exit(1);
}

const resolveRel = (from, spec) => {
  const base = path.resolve(path.dirname(from), spec);
  return (
    [
      base,
      base + '.mjs',
      base + '.js',
      base.replace(/\.js$/, '.mjs'),
      path.join(base, 'index.mjs'),
      path.join(base, 'index.js'),
    ].find(c => size(c)) ?? null
  );
};
function walk(file, seen = new Set()) {
  if (!file || seen.has(file) || !size(file)) return seen;
  seen.add(file);
  const src = stripComments(readFileSync(file, 'utf8'));
  for (const [, spec] of [
    ...src.matchAll(/from\s*["']([^"']+)["']/g),
    ...src.matchAll(/require\(\s*["']([^"']+)["']\s*\)/g),
    ...src.matchAll(/import\s*["']([^"']+)["']/g),
  ]) {
    if (spec.startsWith('.')) walk(resolveRel(file, spec), seen);
    else {
      try {
        walk(require.resolve(spec), seen);
      } catch {}
    }
  }
  return seen;
}
function findDist(fn, compat) {
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
}

const before = new Set(),
  compat = new Set(),
  strict = new Set();
const entries = [],
  outside = new Set(),
  stillCompat = [],
  notFound = [];
for (const [raw, specs] of usage) {
  const fn = canon(raw);
  let entry = null;
  for (const spec of specs) {
    try {
      entry = require.resolve(spec);
      break;
    } catch {}
  }
  if (entry) {
    entries.push(entry);
    if (!entry.startsWith(repoRoot)) outside.add(entry);
    walk(entry).forEach(f => before.add(f));
  }
  const c = findDist(fn, true),
    s = findDist(fn, false);
  if (!c && !s) {
    notFound.push(fn);
    continue;
  }
  if (c) walk(c).forEach(f => compat.add(f));
  if (s) walk(s).forEach(f => strict.add(f));
  else {
    stillCompat.push(fn);
    if (c) walk(c).forEach(f => strict.add(f));
  }
}
const sum = st => [...st].reduce((n, f) => n + size(f), 0);
const b = sum(before),
  c = sum(compat),
  s = sum(strict);
console.log(`detected: ${[...usage.keys()].map(canon).join(', ')}`);
console.log('AS-IS entry points:');
for (const e of entries) console.log(`  ${e.replace(repoRoot, '<repo>')}`);
console.log('');
if (!b) {
  console.error('Could not locate the lodash packages from this directory.');
  process.exit(1);
}
if (outside.size) {
  console.warn('WARNING: resolved OUTSIDE this repository — this project may not actually depend on it:');
  for (const f of outside) console.warn(`  ${f}`);
  console.warn('');
}
const pct = n => {
  const p = 100 - (n / b) * 100;
  return `${p >= 0 ? '-' : '+'}${Math.abs(p).toFixed(0)}%`;
};
const row = (l, st, by) => `${l.padEnd(26)} ${String(st.size).padStart(3)} files  ${by.toLocaleString().padStart(9)} B`;
console.log(row('AS-IS   lodash', before, b));
console.log(row('TO-BE   es-toolkit/compat', compat, c) + `   ${pct(c)}`);
console.log('');
console.log('If you later move on to es-toolkit (strict):');
console.log(
  row('        es-toolkit', strict, s) +
    `   ${pct(s)}  (${Math.abs(c - s).toLocaleString()} B ${c >= s ? 'more' : 'LESS'})`
);
if (stillCompat.length) console.log(`        note: these stay on compat: ${stillCompat.join(', ')}`);
if (notFound.length) console.log(`        NOT AVAILABLE in es-toolkit: ${notFound.join(', ')}`);
console.log('');
console.log('These are raw source bytes, not shipped size. Trust the percentages (within ~5pp of a');
console.log('real bundle in testing); the absolute byte counts run 2-5x high, so do not quote them.');
```

Read the numbers this way:

- **Percentages are reliable.** Checked against real esbuild bundles they landed within ~5pp (script −73% vs bundled −69% on one service; −97% vs −96% on another).
- **Absolute bytes are not.** They run 2–5x high because they count unminified source. Never quote them as "you will save N bytes" — quote the percentage.
- **The AS-IS entry points are printed for a reason.** A bare `import { chunk } from 'lodash'` resolves to lodash's single 546KB bundle, and that is correct: CJS lodash does not tree-shake, so a bundler really does pull the whole thing. Deep imports (`lodash/chunk.js`) and single-function packages (`lodash.orderby`) resolve to just their own files. Seeing which one applies explains the size immediately.

Import forms the scanner cannot follow — `import _ from 'lodash'`, `import * as ld`, re-exports, dynamic `import()` — are reported as excluded rather than silently dropped. If they appear, say the estimate is partial.

### The accurate number comes from the project's own build

The script counts only the files those functions pull in. A real app shares dependencies across modules and splits chunks, so tell the user to **re-run their own production build and compare output sizes** for the number that actually matters.

**Warn them about `external` first.** If the project treats dependencies as external — library builds, SSR/server bundles, or an explicit `external`/`rollupOptions.external` entry — then neither lodash nor es-toolkit lands in the output. The comparison then shows no difference, or even a larger bundle, and it means nothing. Have them drop the external setting for the test build so the dependency is actually inlined, then compare.

Runtime benchmarks are usually not worth it: for typical call volumes the difference is unmeasurable in a real app, and microbenchmarks mislead. Only run one if the user explicitly asks.

## Wrap up as if the user is new to es-toolkit

When the work is done, summarize briefly. Assume the user has never used es-toolkit and avoid terms they would have to look up.

**1. What changed**

Only the import path changed; the calling code is untouched, and `es-toolkit/compat` is built to match lodash behavior — so **it behaves exactly as before**. This is what a first-time user most wants to know.

**2. How much smaller it gets** (if measured)

Show AS-IS / TO-BE as percentages. Do not present the raw byte counts as the saving — they run high, as the script's own output says.

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
