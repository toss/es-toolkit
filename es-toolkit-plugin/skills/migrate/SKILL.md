---
name: migrate
description: Convert lodash code to es-toolkit. Use when the user wants to migrate from lodash, replace lodash imports, or reduce bundle size by switching to es-toolkit.
argument-hint: '<paste lodash code or specify function names>'
allowed-tools: Read, Grep, Glob, WebFetch
---

# Lodash Migration

Convert lodash usage to es-toolkit by checking actual source code for availability and behavioral differences.

## Input

$ARGUMENTS — Lodash code to migrate, or specific function names.

## Why source-first matters

The es-toolkit/compat layer is feature-complete and matches lodash behavior exactly, but the strict `es-toolkit` API intentionally differs in some cases. The only reliable way to know the difference is to read the actual implementation. Never guess — always verify from source.

## Workflow

### 1. Identify lodash functions from input

Extract which lodash functions are used and how they're imported.

### 2. Verify availability in source code

For each function, search both APIs:

- `src/{category}/{fn}.ts` — strict API
- `src/compat/{category}/{fn}.ts` — compat API

Read the implementation to understand the exact signature and any behavioral differences.

### 3. Determine the right migration path

| Scenario                                    | Recommendation                               |
| ------------------------------------------- | -------------------------------------------- |
| Function exists in both, same behavior      | Use `es-toolkit` (smaller bundle)            |
| Function exists in both, different behavior | Explain the difference, let user choose      |
| Only in compat                              | Use `es-toolkit/compat`                      |
| Not available at all                        | Keep lodash or suggest modern JS alternative |

### 4. Generate before/after migration

For each function, provide:

- Availability: es-toolkit and/or es-toolkit/compat
- Doc link: `https://es-toolkit.dev/reference/{category}/{fn}.html`
- Before (lodash) and After (es-toolkit) code examples
- Any behavioral differences found in source code

For migrations involving many functions, use a summary table instead of repeating the full template for each one.

### 5. Provide consolidated import rewrite

Show the final import transformation as a single block.

### 6. Note bundle size impact

es-toolkit is up to 97% smaller than lodash and 2-3x faster. These numbers come from the official benchmarks in `benchmarks/bundle-size/` — reference them for specific function comparisons if the user asks.

### 7. Only use WebFetch for discovery

If you need to check whether an obscure lodash function has an es-toolkit equivalent and can't find it locally, fetch `https://es-toolkit.dev/llms.txt` and search the returned content for the target function name.
