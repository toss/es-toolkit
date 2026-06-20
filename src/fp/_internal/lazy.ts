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
 * Operators are authored with one of the `createLazy*Function` helpers
 * ({@link createLazyFunction} for `map`, {@link createLazyFilterFunction} for
 * `filter`, {@link createLazyManyFunction} for `flatMap`,
 * {@link createLazyLimitFunction} for `take`): provide the eager implementation
 * plus a per-element function, and the helper wires up the lazy protocol below.
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

/** Sentinel result that drops the current value without ending the run. */
export const SKIP_ITEM = { done: false, hasNext: false } as const;

const EMPTY_PIPE = { done: true, hasNext: false } as const;

/**
 * Attaches the lazy-evaluation factory to a data-last operator. The factory
 * builds a fresh {@link LazyEvaluator} per pipe run (see {@link LazyFunction}),
 * so per-run state never leaks between runs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last operator
function toLazy<F extends (input: any) => any>(all: F, lazy: () => LazyEvaluator): F {
  return Object.assign(all, { lazy });
}

/**
 * Makes a 1-to-1 lazy operator (e.g. `map`): each input emits the value
 * `each(value, index, array)` returns.
 *
 * `each` is the per-element function `pipe` calls directly while fusing adjacent
 * lazy operators — pass the operator's own callback, not a wrapper, so no extra
 * call is added per element.
 *
 * @template F - The eager data-last function type.
 * @param all - The eager `(array) => result` implementation.
 * @param each - The per-element callback.
 * @returns `all`, augmented in place with the lazy metadata.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last operator
export function createLazyFunction<F extends (input: any) => any>(all: F, each: LazyEach): F {
  return toLazy(all, () => {
    return (value, index, array) => {
      return { done: false, hasNext: true, next: each(value, index, array) };
    };
  });
}

/**
 * Makes a filtering lazy operator (e.g. `filter`): each input is kept when
 * `predicate(value, index, array)` is truthy and dropped otherwise.
 *
 * @template F - The eager data-last function type.
 * @param all - The eager `(array) => result` implementation.
 * @param predicate - The per-element predicate, called directly during a fused pass.
 * @returns `all`, augmented in place with the lazy metadata.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last operator
export function createLazyFilterFunction<F extends (input: any) => any>(all: F, predicate: LazyEach): F {
  return toLazy(all, () => {
    return (value, index, array) => {
      if (predicate(value, index, array)) {
        return { done: false, hasNext: true, next: value };
      }
      return SKIP_ITEM;
    };
  });
}

/**
 * Makes an expanding lazy operator (e.g. `flatMap`): each input emits every
 * element of the array `each(value, index, array)` returns.
 *
 * @template F - The eager data-last function type.
 * @param all - The eager `(array) => result` implementation.
 * @param each - The per-element callback returning an array.
 * @returns `all`, augmented in place with the lazy metadata.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last operator
export function createLazyManyFunction<F extends (input: any) => any>(all: F, each: LazyEach): F {
  return toLazy(all, () => {
    return (value, index, array) => {
      return { done: false, hasNext: true, hasMany: true, next: each(value, index, array) as readonly unknown[] };
    };
  });
}

/**
 * Makes a limiting lazy operator (e.g. `take`): each input emits
 * `each(value, index, array)` until `limit` values have been emitted, then the
 * run stops. `index` is the operator's own count of values it has received, so
 * no separate counter is needed.
 *
 * @template F - The eager data-last function type.
 * @param all - The eager `(array) => result` implementation.
 * @param each - The per-element callback.
 * @param limit - The maximum number of values to emit.
 * @returns `all`, augmented in place with the lazy metadata.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last operator
export function createLazyLimitFunction<F extends (input: any) => any>(all: F, each: LazyEach, limit: number): F {
  return toLazy(all, () => {
    return (value, index, array) => {
      if (index >= limit) {
        return EMPTY_PIPE;
      }
      return { done: index >= limit - 1, hasNext: true, next: each(value, index, array) };
    };
  });
}
