---
name: migrate
description: Guide migrating lodash code to es-toolkit. Use when the user wants to migrate from lodash, replace lodash imports, reduce bundle size by switching to es-toolkit, or understand the difference between es-toolkit and es-toolkit/compat.
argument-hint: '<paste lodash code, function names, or ask about strict vs compat>'
allowed-tools: Read, Grep, Glob, Bash
---

# Lodash Migration & Compat Guide

Guide users through migrating lodash to es-toolkit and understanding the strict vs compat APIs, grounded in actual source code.

## Input

$ARGUMENTS — Lodash code to migrate, specific function names, or a question about strict vs compat.

## Core Concepts

**es-toolkit (strict)**: Opinionated, simplified API for the 85% use case. Smaller bundle, may differ from lodash in edge cases by design. New functions are added here.

**es-toolkit/compat**: Aims for full lodash test compatibility within a defined scope. See `docs/compatibility.md` for out-of-scope behaviors (e.g., implicit type conversions, prototype modifications).

## Why source-first matters

The only reliable way to know the difference between strict and compat is to inspect the version installed in the user's project. The skill may be installed as a standalone directory, so never assume the es-toolkit repository or a sibling `docs` directory is available.

## Workflow

### If a specific function or lodash code is given

#### 1. Identify lodash functions from input

Extract which lodash functions are used and how they're imported.

#### 2. Verify availability in the installed package

Run from the package that depends on es-toolkit. In a monorepo this is usually a workspace package, not the repository root. If the project uses Yarn Plug'n'Play, use `yarn node` instead of `node`.

Replace the example names with the lodash functions found in the input:

```bash
node --input-type=module -e "
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const names = ['get', 'chunk', 'map'];
const pkg = require('es-toolkit/package.json');
const entries = Object.keys(pkg.exports)
  .filter(subpath => subpath !== './package.json' && !subpath.includes('*'))
  .map(subpath => subpath === '.' ? 'es-toolkit' : 'es-toolkit/' + subpath.slice(2));
const modules = await Promise.all(entries.map(entry => import(entry).catch(() => null)));
if (modules.every(module => module == null)) {
  console.error('es-toolkit is not resolvable from ' + process.cwd());
  process.exit(1);
}
for (const name of names) {
  const found = entries.filter((_, index) => modules[index] != null && name in modules[index]);
  console.log(name.padEnd(20), found.join(', ') || 'NOT AVAILABLE');
}
"
```

A function can appear in several entry points, so read the complete result. `es-toolkit/types` is type-only and cannot be checked through a runtime import.

Resolve the package metadata with the following command, then read declarations under its `dist/` directory for exact signatures and JSDoc. Do not assume a conventional `node_modules` path.

```bash
node -e "console.log(require.resolve('es-toolkit/package.json'))"
```

When the current project is the es-toolkit source repository itself, inspect `src/{category}/{fn}.ts`, `src/compat/{category}/{fn}.ts`, and their specs directly instead of requiring a built package.

#### 3. Determine the right migration path

| Scenario                                    | Recommendation                               |
| ------------------------------------------- | -------------------------------------------- |
| Function exists in both, same behavior      | Use `es-toolkit` (smaller bundle)            |
| Function exists in both, different behavior | Explain the difference, let user choose      |
| Only in compat                              | Use `es-toolkit/compat`                      |
| Not available at all                        | Keep lodash or suggest modern JS alternative |

If the function only exists in compat (like `get`, `set`, `has`), explain why — es-toolkit doesn't implement functions replaceable by modern JS (optional chaining `?.`, `Object.hasOwn()`, etc.).

#### 4. Generate before/after migration

For each function, provide:

- Availability: es-toolkit and/or es-toolkit/compat
- Doc link: `https://es-toolkit.dev/reference/{category}/{fn}.html` (strict) or `https://es-toolkit.dev/compat/reference/{category}/{fn}.html` (compat)
- Before (lodash) and After (es-toolkit) code examples
- Any behavioral differences found in source code
- **Feature comparison table**: Compare API capabilities side-by-side (e.g., cancel support, flush, maxWait, return values, AbortSignal, callback arguments). Read both implementations to identify all supported options and present them in a table like:

| Feature                       | lodash | es-toolkit | es-toolkit/compat |
| ----------------------------- | ------ | ---------- | ----------------- |
| (list each option/capability) | ✅/❌  | ✅/❌      | ✅/❌             |

- **"When to use which"**: Based on the feature comparison, provide scenario-based guidance — e.g., "Use es-toolkit if you only need basic debounce; use compat if you rely on cancel/flush; keep lodash if you need X."

For migrations involving many functions, use a summary table instead of repeating the full template for each one.

#### 5. Provide consolidated import rewrite

Show the final import transformation as a single block.

#### 5a. Suggest automation patterns for large-scale migrations

When migrating many files, mention practical automation approaches:

- **Bundler alias**: Configure `resolve.alias` in webpack or Vite to redirect lodash imports at build time without changing source files:
  ```js
  // vite.config.js or webpack.config.js
  resolve: { alias: { 'lodash': 'es-toolkit/compat' } }
  ```
- **ESLint rule**: Use `no-restricted-imports` to warn or error on remaining lodash imports after migration.
- **Codemod**: For systematic AST-based transforms, mention tools like jscodeshift if the migration pattern is complex.

#### 6. Note bundle size impact

Explain that strict and compat imports are tree-shakeable, but quote exact size or performance numbers only after measuring the user's project or reading current benchmark data from an es-toolkit source checkout. Otherwise link to the official bundle-size and performance pages.

### If no specific function (migration strategy overview)

Provide a strategic overview with three migration options:

- **Option A: Direct to es-toolkit** — new/small projects
- **Option B: Gradual via compat** — large codebases (recommended for legacy)
- **Option C: Mixed** — pragmatic approach

For each option, include a **trade-off matrix**:

| Factor                | Option A (strict)       | Option B (compat)        | Option C (mixed)  |
| --------------------- | ----------------------- | ------------------------ | ----------------- |
| Code change volume    | High                    | Low                      | Medium            |
| Bundle size reduction | Maximum                 | Moderate                 | Varies            |
| Risk level            | Higher (behavior diffs) | Low (lodash-compatible)  | Medium            |
| Maintenance effort    | Low (clean API)         | Medium (compat tracking) | Higher (two APIs) |

**Compat-exclusive functions**: Search `src/compat/` for functions that don't exist in `src/` (strict). List representative examples so users know what can only come from compat (e.g., `get`, `set`, `has`).

For concrete behavioral differences, read a few representative function pairs from source (e.g., `chunk`, `debounce`) to give real examples rather than abstract descriptions.

## Documentation links

- Migration overview: `https://es-toolkit.dev/compat/intro.html`
- Bundle size: `https://es-toolkit.dev/bundle-size.html`
- Performance: `https://es-toolkit.dev/performance.html`

Function pages use these forms:

- strict: `https://es-toolkit.dev/reference/{category}/{fn}.html`
- compat: `https://es-toolkit.dev/compat/reference/{category}/{fn}.html`
- fp: `https://es-toolkit.dev/fp/reference/{fn}.html`

If you are unsure that a page exists, omit the page link rather than guessing.
