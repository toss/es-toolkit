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

- `es-toolkit` — the strict API (190 functions)
- `es-toolkit/fp` — data-last, `pipe`-based (74 functions)
- `es-toolkit/server` — Node-only helpers (`exec`, `colors`)
- `es-toolkit/types` — type utilities (type-only)
- `es-toolkit/compat` — lodash-compatible (298 functions; 158 of these do **not** exist in strict)

Commonly mis-assigned: `get`, `set`, `has`, `castArray`, `defaultsDeep`, `toArray`, `assign`, `defaults` are **compat-only**. `pipe` and `flow` are **fp-only**. `chain`, `tap`, `thru`, `mixin`, `sortedUniq` exist **nowhere**.

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

Replace `names` with the actual function names. The output is authoritative — it reflects the version the user actually installed, so it never goes stale.

**A function can appear in more than one entry point**, so read the whole list rather than the first hit. For example `map` and `filter` are in both `fp` and `compat` but not in strict, `sum` is in strict and `compat` but not `fp`, and `chunk` is in all three.

### Which entry point to pick

`es-toolkit`, `es-toolkit/fp`, `es-toolkit/server`, and `es-toolkit/types` are all first-class — recommend whichever fits:

- `es-toolkit` — the default
- `es-toolkit/fp` — data-last functions for `pipe` composition
- `es-toolkit/server` — Node-only helpers (`exec`, `colors`)
- `es-toolkit/types` — type utilities; **type-only, so the script above cannot see it** (`import('es-toolkit/types')` throws `ERR_PACKAGE_PATH_NOT_EXPORTED`). Use `import type` and check `./node_modules/es-toolkit/types.d.ts` directly.

**Use `es-toolkit/compat` only when there is a specific reason** — the function exists nowhere else, or the call site depends on lodash-exact behavior (see step 2). compat is a migration layer, not the destination: it is feature-complete and receives no new functions, so anything you route through it stays there. When you do choose compat, say why.

If a function reports `NOT AVAILABLE`, do not invent a replacement. Say it is unavailable and either keep lodash for that call or propose a rewrite. `chain`/`tap`/`thru` in particular mean the code uses lodash's chaining style, which has no drop-in equivalent — migrating it is a restructure into plain calls or `es-toolkit/fp`'s `pipe`, so flag that as its own decision rather than a mechanical swap.

## Step 2 — Check behavior before choosing strict over compat

When a function exists in **both** strict and compat, they are not interchangeable. Read the signature and JSDoc from the installed package:

- `./node_modules/es-toolkit/dist/{category}/{fn}.d.ts` — strict
- `./node_modules/es-toolkit/dist/compat/{category}/{fn}.d.ts` — compat

Both carry full JSDoc with `@example`. Compare against how the user actually calls the function, and report any option or edge case that differs. Real examples:

- `chunk` — strict throws on `null` input and on a non-positive or fractional `size`; lodash and compat return `[]` or coerce
- `debounce` — strict has no `maxWait` and returns `void`; compat supports both
- `merge` — strict takes exactly 2 arguments; lodash and compat are variadic
- `get` — returns the default only when the resolved value is `undefined`, so `?.` with `??` is **not** an equivalent rewrite when the value can be `null`

Prefer strict when the call site is safe, compat when inputs are uncertain. State the assumption you relied on.

## Step 3 — Apply the migration

Rewrite the imports, grouping by entry point:

```js
import { chunk, debounce } from 'es-toolkit';
import { get } from 'es-toolkit/compat';
```

Edit the actual files when the user pointed at code. Afterwards, verify: run the project's typecheck or tests if they exist, and confirm no lodash imports remain (`Grep` for `'lodash'`).

For a large migration, mention that a bundler alias (`resolve.alias: { lodash: 'es-toolkit/compat' }`) switches everything at once with no source changes, and that ESLint's `no-restricted-imports` then surfaces whatever is left.

## Step 4 — Offer to measure the result (only if the user asks)

Do not run this automatically; it installs esbuild and costs a build. Offer it, and run it on request.

Write this to a file **inside the project** and run it, listing the real before/after imports:

```js
import esbuild from 'esbuild';
import { gzipSync } from 'node:zlib';

const build = async script => {
  const out = await esbuild.build({
    stdin: { contents: script, resolveDir: process.cwd(), sourcefile: 'entry.js', loader: 'js' },
    write: false,
    minify: true,
    bundle: true,
    format: 'esm',
  });
  const raw = Buffer.from(out.outputFiles[0].contents);
  return { min: raw.byteLength, gzip: gzipSync(raw).byteLength };
};

console.log('before', await build(`import { chunk, get } from 'lodash'; console.log(chunk, get)`));
console.log(
  'after',
  await build(`import { chunk } from 'es-toolkit'; import { get } from 'es-toolkit/compat'; console.log(chunk, get)`)
);
```

Bundling with no `external` entries is what makes the number honest — it measures what actually ships, unlike `npm pack` or summing file sizes on disk. (Summing files understates the gain badly: on one migration it reported 77% where the bundled measurement showed 97%, because it counts unminified bytes and ignores tree shaking.)

### This is an estimate — the real number comes from the project's own build

The script above measures an isolated entry point containing only the migrated functions. A real app shares dependencies across modules and splits chunks, so tell the user to **re-run their own production build and compare output sizes** for the number that actually matters.

**Warn them about `external` before they do.** If the project treats dependencies as external — library builds, SSR/server bundles, or an explicit `external`/`rollupOptions.external` entry — then neither lodash nor es-toolkit code lands in the output. The comparison then shows no difference, or even a larger bundle, and it means nothing. Have them drop the external setting for the test build so the dependency is actually inlined, then compare.

**Always state the baseline**, because it changes the headline: the same migration measured −97% against CJS `lodash` but −75% against `lodash-es`. If the project imports from `lodash`, report both — most of the first jump comes from leaving CJS, not from es-toolkit.

Runtime benchmarks are usually not worth it: for typical call volumes the difference is unmeasurable in a real app, and microbenchmarks mislead. Only run one if the user explicitly asks.

## Linking to docs

Function pages need the `.html` suffix or the site 404s:

- strict: `https://es-toolkit.dev/reference/{category}/{fn}.html`
- compat: `https://es-toolkit.dev/compat/reference/{category}/{fn}.html`
- fp: `https://es-toolkit.dev/fp/reference/{fn}.html` (flat, no category)

If you are unsure a page exists, omit the link rather than guessing one.
