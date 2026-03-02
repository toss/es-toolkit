# CLAUDE.md

Instructions for AI assistants working on es-toolkit.

## Quick Reference

```bash
corepack enable && yarn install   # Setup
yarn vitest run                   # Tests
yarn vitest run src/array/chunk   # Test specific function
yarn lint                         # ESLint
tsc --noEmit                      # Typecheck
```

## Structure

```
src/{category}/{fn}.ts            # Implementation (array, function, math, object, predicate, promise, set, string, util, error, map)
src/{category}/{fn}.spec.ts       # Tests (vitest)
src/compat/{category}/{fn}.ts     # Lodash-compatible variant
docs/reference/{category}/{fn}.md           # English
docs/ko/reference/{category}/{fn}.md        # Korean
docs/ja/reference/{category}/{fn}.md        # Japanese
docs/zh_hans/reference/{category}/{fn}.md   # Chinese
```

## Design Principles

- **Performance**: Must match or beat lodash.
- **Simplicity**: Simplest interface for the 85% use case. No complex options.
- **Don't implement**: Functions replaceable by modern JS (`Array.isArray`, `Number.isNaN`, `Math.min`), or TC39 Stage 3+ proposals.
- **es-toolkit vs compat**: `es-toolkit` is the strict, opinionated API. `es-toolkit/compat` matches lodash behavior exactly for migration.

## Coding Conventions

- `for` loops over `reduce` (local mutation is fine)
- Built-in JS over custom helpers (`Array.isArray()`, not `isArray()`)
- Type params: `T` elements, `K` keys, `E` errors
- `readonly T[]` for array params that aren't mutated
- Detailed JSDoc with `@template`, `@param`, `@returns`, `@throws`, `@example`

## New Function Checklist

1. `src/{category}/{fn}.ts` — Implementation
2. `src/{category}/{fn}.spec.ts` — Tests
3. Re-export in `src/{category}/index.ts` and `src/index.ts`
4. Docs in all 4 languages (see `docs/CLAUDE.md` for templates)
