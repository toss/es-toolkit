## Summary

Adds a new `MergeDeep<T, S>` type that performs a recursive deep merge of two object types,
mirroring the runtime behavior of `merge`, `mergeWith`, and `toMerged`.

Also introduces `.deep()` namespace methods on `merge`, `mergeWith`, and `toMerged`
that return `MergeDeep<T, S>` instead of `T & S`, allowing users to get structurally-merged
types without breaking existing callers.

## Motivation

The existing `merge()` return type is `T & S`, which produces intersection types like
`{ a: number } & { a: string }` instead of `{ a: number | string }`. This makes it hard
to use the result type in practice.

Adding an overload to `merge()` directly was considered, but following the precedent of
#1498 → #1595 (`omit` overload revert), we chose namespace methods (`merge.deep()`)
to avoid inference drift on existing callers.

## Changes

- **New type:** `MergeDeep<T, S>` in `src/_internal/types/MergeDeep.ts`
  - Deeply merges plain objects
  - Preserves tuple lengths (`[A, B]` + `[C, D]` → `[MergeDeep<A,C>, MergeDeep<B,D>]`)
  - Preserves and merges index signatures (`[x: string]: T` + `[x: string]: S`)
  - Handles `null`, `undefined`, and built-in types (Date, RegExp, etc.) correctly
- **New APIs:**
  - `merge.deep(target, source)` → `MergeDeep<T, S>`
  - `mergeWith.deep(target, source, mergeFn)` → `MergeDeep<T, S>`
  - `toMerged.deep(target, source)` → `MergeDeep<T, S>`
- **JSDoc updates:** Added `@example` blocks with type annotations for all three `.deep()` methods
- **Export:** `MergeDeep` type exported from `src/object/index.ts`

## No breaking changes

- Existing `merge` / `mergeWith` / `toMerged` signatures are unchanged
- The `compat/` modules are intentionally left untouched to preserve lodash type compatibility
- All existing tests pass without modification

## Before / After

**Before:**
```ts
const result = merge({ a: { x: 1 } }, { a: { y: '2' } });
//    ^? { a: { x: number } & { y: string } }  ❌
```

**After:**
```ts
const result = merge.deep({ a: { x: 1 } }, { a: { y: '2' } });
//    ^? { a: { x: number; y: string } }  ✅
```

## Test plan

- [x] Type tests added for `MergeDeep` (objects, arrays, tuples, null, undefined, built-ins, index signatures)
- [x] Type tests added for `merge.deep`, `mergeWith.deep`, `toMerged.deep`
- [x] Runtime tests pass (no behavioral change)
- [x] `yarn typecheck` passes
- [x] Compat type tests pass (lodash compatibility preserved)
