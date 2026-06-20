# es-toolkit/fp — Design Choices

This document records the decisions made while building `es-toolkit/fp`, especially
where the original goal was ambiguous or conflicted with the existing codebase.
The four headline decisions (1–4) were agreed with the maintainer up front; the rest
were resolved during implementation by choosing what seemed best and noting it here.

## 1. Functions missing from core are defined in `fp` itself (no `compat` dependency)

The flagship example `pipe([1, 2, 3], map(multiply(3)))` uses `map` and `multiply`,
but **neither exists in es-toolkit core** — both live only in `es-toolkit/compat`
(core omits them because `Array.prototype.map` and `*` are native).

Decision: `es-toolkit/fp` defines its own data-last `map`, `filter`, `multiply`, and
`add`. It does **not** depend on `es-toolkit/compat`. Providing a data-last form that
native JavaScript does not offer is consistent with es-toolkit's "don't reimplement
native JS" rule — we are adding composition shape, not duplicating behavior.

Operators that already exist in core (`uniq`, `chunk`, `sortBy`, `take`, `pick`,
`omit`) are thin data-last wrappers around the core implementation.

## 2. Data-last only (no dual data-first/data-last overloads)

Every `fp` operator is data-last: `map(fn)` returns `(array) => result`. There is no
data-first call form. This keeps each operator to a single overload set and matches
the agreed design. Use `pipe` (or call the returned function directly) to supply data.

## 3. Lazy evaluation is ported (hybrid wrapper model)

`pipe` fuses consecutive lazy operators and short-circuits (e.g. `take` after `map`
stops the walk early). This means a plain `(data) => core(data)` wrapper is not enough
for streaming operators, so there are two operator shapes:

- **Plain**: `(data) => coreFn(data, ...args)` — `uniq`, `chunk`, `sortBy`, `pick`, `omit`.
- **Lazy-capable**: a data-last function carrying a `.lazy` evaluator via
  `toLazy(...)` — `map`, `filter`, `take`. `pipe` detects and fuses these.

The lazy machinery lives in `src/fp/_internal/lazy.ts` (types + `toLazy`, `SKIP_ITEM`,
`lazyEmptyEvaluator`) and `src/fp/pipe.ts` (fusion loop, `processItem`).

## 4. Staged scope (v1)

v1 ships `pipe` plus 10 representative operators chosen to exercise both code paths
and all target categories: `map`, `filter`, `take` (lazy), `uniq`, `chunk`, `sortBy`,
`pick`, `omit` (plain core-wrap), `multiply`, `add` (plain, fp-defined). The remaining
pipe-able functions are intended to follow once this pattern is settled.

---

## Smaller decisions made during implementation

- **`take` with negative / non-integer `count`.** The lazy fast-path can only represent
  "the first N elements" for a non-negative integer. For other values, `take` keeps the
  eager path and delegates to core `take`, which truncates non-integers toward zero and,
  for negative counts, drops from the end (`Array.prototype.slice(0, count)` semantics).
  So `pipe([1,2,3,4], take(-1))` is `[1,2,3]`, matching `es-toolkit`'s `take`.

- **Only element-streaming operators are lazy in v1.** `map`, `filter`, and `take` carry
  lazy evaluators; `uniq`/`chunk`/`sortBy`/`pick`/`omit` are eager. (`uniq` could be made
  lazy later; `chunk`/`sortBy` are inherently whole-array.)

- **Simple array types.** Operators use straightforward types (`(array: readonly T[]) => U[]`)
  rather than tuple-length-preserving generics. This matches es-toolkit's simpler typing
  philosophy and keeps the public surface readable.

- **`pipe` type overloads.** `pipe` is overloaded for 0–15 functions for precise inference,
  modeled on the existing `src/function/flow.ts`. Beyond that, the implementation signature
  still runs correctly but inference falls back to `unknown`.

- **Zero-argument operators use the call form.** `uniq` is written as `uniq()` (returns the
  operator) for consistency with configured operators like `chunk(2)`, rather than allowing
  bare `uniq` in a pipe.

- **Lazy helpers are internal.** `src/fp/_internal/lazy.ts` is not re-exported from the
  public `es-toolkit/fp` entry in v1. Authoring custom lazy operators is not part of the
  public API yet.

- **`Record<string, any>` in `pick`/`omit`.** These mirror the core `pick`/`omit` signatures
  (which use the same), so they emit the same `@typescript-eslint/no-explicit-any` warning
  (a `warn`, not an error) as core. Kept for type compatibility with the wrapped functions.

## Packaging & docs wiring

- **Package export.** Added `"./fp"` to `package.json` `exports` (dev → `./src/fp/index.ts`)
  and to `publishConfig.exports` (dist → `./dist/fp/index.*`). Added `fp` to the root-export
  loop in `.scripts/postbuild.sh` and `fp.js` to the `files` field. `tsdown` discovers the
  new entry automatically from the `exports` map.

- **Docs as a new "flavor".** Because `es-toolkit/fp` is its own entry point (like
  `es-toolkit/compat` and `es-toolkit/server`), it is registered as a docs flavor in
  `docs/.vitepress/libs/flavors.mts` (prefix `fp`, flat reference, one intro page) rather
  than as a category of the main package. Reference docs live at `docs/fp/reference/*.md`
  with translations under `docs/ko`, `docs/ja`, `docs/zh_hans`, per the 4-language rule.

## Tests

Every operator has a `*.spec.ts` that exercises it through `pipe` with real usage, as
requested. Lazy operators additionally assert short-circuiting (e.g. a spied `map`
followed by `take(2)` is called exactly twice).
