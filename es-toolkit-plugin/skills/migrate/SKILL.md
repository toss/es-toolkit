---
name: migrate
description: Guide migrating lodash code to es-toolkit. Use when the user wants to migrate from lodash, replace lodash imports, reduce bundle size by switching to es-toolkit, or understand the difference between es-toolkit and es-toolkit/compat.
argument-hint: '<paste lodash code, function names, or ask about strict vs compat>'
allowed-tools: Read, Grep, Glob
---

# Lodash Migration & Compat Guide

Guide users through migrating lodash to es-toolkit and understanding the strict vs compat APIs, grounded in actual source code.

## Input

$ARGUMENTS — Lodash code to migrate, specific function names, or a question about strict vs compat.

## Core Concepts

**es-toolkit (strict)**: Opinionated, simplified API for the 85% use case. Smaller bundle, may differ from lodash in edge cases by design. New functions are added here.

**es-toolkit/compat**: Aims for full lodash test compatibility within a defined scope. See `docs/compatibility.md` for out-of-scope behaviors (e.g., implicit type conversions, prototype modifications).

## Why source-first matters

The only reliable way to know the difference between strict and compat is to read the actual implementation. Never guess — always verify from source.

## Workflow

### If a specific function or lodash code is given

#### 1. Identify lodash functions from input

Extract which lodash functions are used and how they're imported.

#### 2. Verify availability in source code

For each function, search both APIs:

- `src/{category}/{fn}.ts` — strict API
- `src/compat/{category}/{fn}.ts` — compat API

Read the implementation to understand the exact signature and any behavioral differences.

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
- Doc link: `https://es-toolkit.dev/reference/{category}/{fn}` (strict) or `https://es-toolkit.dev/reference/compat/{category}/{fn}` (compat)
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

es-toolkit is up to 97% smaller than lodash and 2-3x faster. Bundle size numbers come from `benchmarks/bundle-size/` and runtime performance numbers from `benchmarks/performance/` and `docs/performance.md` — reference them for specific function comparisons if the user asks.

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

## Search local docs for discovery

If you need to check whether a lodash function has an es-toolkit equivalent:

- **By name**: Read `docs/reference/{category}/{functionName}.md` directly
- **By keyword**: `Grep` for the function name across `docs/reference/**/*.md`
- **Compat-only functions**: `Glob docs/reference/compat/{category}/*.md` — then check if the same file exists in `docs/reference/{category}/`
- **Available categories**: array, compat, error, function, map, math, object, predicate, promise, set, string, util
