/**
 * Lazy-evaluation primitives shared by {@link pipe} and the lazy-capable
 * operators (`map`, `filter`, `take`, `flatMap`, ...).
 *
 * `pipe` fuses a run of adjacent lazy operators into a single pass: each input
 * element is pushed all the way through the run before the next element is
 * read. This lets short-circuiting operators such as `take` end the walk early,
 * so later elements are never produced or transformed and no intermediate
 * arrays are allocated.
 *
 * Operators are authored with {@link createLazyFunction}: provide the eager
 * implementation plus a per-element function, and the helper wires up the lazy
 * protocol below.
 */

/**
 * The outcome of feeding a single value to a lazy operator.
 *
 * - `hasNext: false` — the value is dropped from the output.
 * - `hasNext: true`  — `next` is emitted to the next operator (or the output).
 * - `hasMany: true`  — `next` is a list; every element flows down the pipe.
 * - `done: true`     — no further input elements should be read after this one.
 *
 * @template T - The type of the emitted value(s).
 */
export type LazyResult<T> = LazyEmpty | LazyNext<T> | LazyMany<T>;

interface LazyEmpty {
  readonly done: boolean;
  readonly hasNext: false;
  readonly hasMany?: false;
  readonly next?: undefined;
}

interface LazyNext<T> {
  readonly done: boolean;
  readonly hasNext: true;
  readonly hasMany?: false;
  readonly next: T;
}

interface LazyMany<T> {
  readonly done: boolean;
  readonly hasNext: true;
  readonly hasMany: true;
  readonly next: readonly T[];
}

/**
 * The per-element transform `pipe` runs while evaluating a fused lazy pass.
 * Built internally by {@link createLazyFunction} from an operator's per-element
 * function — operator authors never write this shape directly.
 */
export interface LazyEvaluator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- element types are erased here
  (value: any, index: number, array: readonly any[]): LazyResult<unknown>;
}

/**
 * A data-last operator augmented with the factory that lets {@link pipe} fuse
 * it with adjacent lazy operators. `lazy()` builds a fresh {@link LazyEvaluator}
 * for one pipe run, so per-run state never leaks between runs.
 */
export interface LazyFunction {
  (input: unknown): unknown;
  readonly lazy: () => LazyEvaluator;
}

/**
 * The per-element function an operator hands to {@link createLazyFunction}.
 * Receives `(value, index, array)` exactly like an `Array.prototype.map`
 * callback, where `array` is the prefix seen so far during lazy evaluation.
 */
export interface LazyEach {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- element types are erased here
  (value: any, index: number, array: readonly any[]): unknown;
}

/**
 * Emit semantics for {@link createLazyFunction}. Omit for a 1-to-1 transform
 * (`map`); the three flags are mutually exclusive.
 */
export interface LazyOptions {
  /** `each` is a predicate; keep the value when it returns truthy (e.g. `filter`). */
  readonly filter?: boolean;
  /** `each` returns an array; every element it returns is emitted (e.g. `flatMap`). */
  readonly many?: boolean;
  /** Emit at most this many elements, then stop reading the input (e.g. `take`). */
  readonly limit?: number;
}

/** Sentinel result that drops the current value without ending the run. */
export const SKIP_ITEM = { done: false, hasNext: false } as const;

const EMPTY_PIPE = { done: true, hasNext: false } as const;

/**
 * Turns a data-last operator into a lazy-capable one.
 *
 * `allFn` is the eager implementation, used when the operator runs on its own
 * (or on a non-array value). `each` is the per-element function `pipe` calls
 * directly while fusing adjacent lazy operators — pass the operator's own
 * callback or predicate, not a wrapper, so no extra call is added per element.
 * `options` selects the emit semantics:
 *
 * - default: `each(value, index, array)` returns the value to emit (e.g. `map`).
 * - `{ filter: true }`: `each` is a predicate; the value is kept when truthy (e.g. `filter`).
 * - `{ many: true }`: `each` returns an array; every element is emitted (e.g. `flatMap`).
 * - `{ limit: n }`: emit at most `n` elements, then stop reading input (e.g. `take`).
 *
 * @template F - The eager data-last function type.
 * @param allFn - The eager `(array) => result` implementation.
 * @param each - The per-element callback or predicate.
 * @param options - Emit semantics; omit for a 1-to-1 transform.
 * @returns `allFn`, augmented in place with the lazy metadata.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last operator
export function createLazyFunction<F extends (input: any) => any>(allFn: F, each: LazyEach, options?: LazyOptions): F {
  return Object.assign(allFn, { lazy: () => toEvaluator(each, options) });
}

/**
 * Builds the {@link LazyEvaluator} that adapts a per-element function to the
 * {@link LazyResult} protocol, according to the chosen emit semantics.
 */
function toEvaluator(each: LazyEach, options?: LazyOptions): LazyEvaluator {
  if (options?.filter === true) {
    return (value, index, array) =>
      each(value, index, array) ? { done: false, hasNext: true, next: value } : SKIP_ITEM;
  }

  if (options?.many === true) {
    return (value, index, array) => ({
      done: false,
      hasNext: true,
      hasMany: true,
      next: each(value, index, array) as readonly unknown[],
    });
  }

  const limit = options?.limit;
  if (limit !== undefined) {
    return (value, index, array) => {
      // Past the cap: drop the value and stop. `index` is the operator's own
      // count of values it has received, so no separate counter is needed.
      if (index >= limit) {
        return EMPTY_PIPE;
      }
      return { done: index >= limit - 1, hasNext: true, next: each(value, index, array) };
    };
  }

  return (value, index, array) => ({ done: false, hasNext: true, next: each(value, index, array) });
}
