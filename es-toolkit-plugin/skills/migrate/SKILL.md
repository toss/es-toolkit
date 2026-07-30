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

## Step 1 — Resolve every entry point (required, do this first)

Collect the lodash functions in the input, then run this **from the project root** (it resolves through the project's own `node_modules`; running it from `/tmp` fails):

```bash
node --input-type=module -e "
const names = ['get','chunk','map','chain'];
const entries = ['es-toolkit','es-toolkit/fp','es-toolkit/server','es-toolkit/compat'];
const mods = await Promise.all(entries.map(e => import(e)));
for (const n of names) {
  const found = entries.filter((_, i) => n in mods[i]);
  console.log(n.padEnd(16), found.join(', ') || 'NOT AVAILABLE');
}
"
```

Replace `names` with the actual function names. The output is authoritative — it reflects the version the user installed, so it never goes stale.

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

A function present in **both** strict and compat is not interchangeable between them. Read the signature and JSDoc from the installed package:

- `./node_modules/es-toolkit/dist/{category}/{fn}.d.ts` — strict
- `./node_modules/es-toolkit/dist/compat/{category}/{fn}.d.ts` — compat

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

**Do not install anything.** Measuring with a bundler is more accurate, but it leaves a dependency and a lockfile change in the user's project. Instead, walk the lodash and es-toolkit files already installed. The script below uses only Node built-ins.

Write it as a temporary file **in the project root**, run it, then delete it. Replace `FNS` and `FROM` with the actual migration.

```js
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

const FNS = ['chunk', 'debounce', 'get'];
const FROM = 'lodash';

const size = f => {
  try {
    const s = statSync(f);
    return s.isFile() ? s.size : 0;
  } catch {
    return 0;
  }
};
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
  const src = readFileSync(file, 'utf8');
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
function findDist(root, fn, compat) {
  const hits = [];
  (function rec(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (e.name === `${fn}.mjs`) hits.push(p);
    }
  })(root);
  return compat ? hits.find(h => h.includes('/compat/')) : hits.find(h => !h.includes('/compat/'));
}
const sum = s => [...s].reduce((n, f) => n + size(f), 0);
const dist = path.resolve('node_modules/es-toolkit/dist');

const before = new Set(),
  compat = new Set(),
  strict = new Set();
const stillCompat = [];
for (const fn of FNS) {
  try {
    walk(require.resolve(`${FROM}/${fn}.js`)).forEach(f => before.add(f));
  } catch {}
  const c = findDist(dist, fn, true),
    s = findDist(dist, fn, false);
  if (c) walk(c).forEach(f => compat.add(f));
  if (s) walk(s).forEach(f => strict.add(f));
  else {
    stillCompat.push(fn);
    if (c) walk(c).forEach(f => strict.add(f));
  }
}
const b = sum(before),
  c = sum(compat),
  s = sum(strict);
const pct = n => (100 - (n / b) * 100).toFixed(0);
const row = (label, set, bytes) =>
  `${label.padEnd(26)} ${String(set.size).padStart(3)} files  ${bytes.toLocaleString().padStart(9)} B`;
console.log(row(`AS-IS   ${FROM}`, before, b));
console.log(row('TO-BE   es-toolkit/compat', compat, c) + `   -${pct(c)}%`);
console.log('');
console.log('If you later move on to es-toolkit (strict):');
console.log(row('        es-toolkit', strict, s) + `   -${pct(s)}%  (${(c - s).toLocaleString()} B more)`);
if (stillCompat.length) console.log(`        note: these stay on compat: ${stillCompat.join(', ')}`);
```

It follows what each function actually `require`s / `import`s and sums the files without double counting.

**Always say this is a conservative estimate.** It counts unminified bytes and ignores tree shaking, so it reads lower than the real gain — one migration measured 68% this way where the bundled measurement of the same code showed 96%. **The real saving is larger**, so frame it as an undercount rather than a claim.

It also **cannot tell `lodash` from `lodash-es`**: they are the same code in different module formats, so the on-disk totals come out nearly equal (47.8KB vs 47.7KB in that case). Real bundles tree-shake `lodash-es` far better, so if the project already uses `lodash-es`, note that the actual gain will be smaller than this estimate.

### The accurate number comes from the project's own build

The script counts only the files those functions pull in. A real app shares dependencies across modules and splits chunks, so tell the user to **re-run their own production build and compare output sizes** for the number that actually matters.

**Warn them about `external` first.** If the project treats dependencies as external — library builds, SSR/server bundles, or an explicit `external`/`rollupOptions.external` entry — then neither lodash nor es-toolkit lands in the output. The comparison then shows no difference, or even a larger bundle, and it means nothing. Have them drop the external setting for the test build so the dependency is actually inlined, then compare.

Runtime benchmarks are usually not worth it: for typical call volumes the difference is unmeasurable in a real app, and microbenchmarks mislead. Only run one if the user explicitly asks.

## Wrap up as if the user is new to es-toolkit

When the work is done, summarize briefly. Assume the user has never used es-toolkit and avoid terms they would have to look up.

**1. What changed**

Only the import path changed; the calling code is untouched, and `es-toolkit/compat` is built to match lodash behavior — so **it behaves exactly as before**. This is what a first-time user most wants to know.

**2. How much smaller it gets** (if measured)

Show AS-IS / TO-BE, and add that it is a conservative estimate.

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
