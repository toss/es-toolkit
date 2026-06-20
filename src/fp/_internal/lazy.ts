/* eslint-disable @typescript-eslint/no-explicit-any -- Lazy factories accept heterogeneous operator arguments and must stay assignable from every operator. */

/**
 * Lazy-evaluation primitives shared by {@link pipe} and the lazy-capable
 * operators (`map`, `filter`, `take`, ...).
 *
 * `pipe` fuses a run of adjacent lazy operators into a single pass: each input
 * element is pushed all the way through the run before the next element is
 * read. This lets short-circuiting operators such as `take` end the walk
 * early, so later elements are never produced or transformed and intermediate
 * arrays are never allocated.
 */

/**
 * The outcome of feeding a single value to a {@link LazyEvaluator}.
 *
 * - `hasNext: false` — the value is dropped from the output.
 * - `hasNext: true`  — `next` is emitted to the next operator (or the output).
 * - `hasMany: true`  — `next` is a list; every element flows down the pipe.
 * - `done: true`     — no further input elements should be read after this one.
 *
 * @template T - The type of the emitted value(s).
 */
export type LazyResult<T> = LazyEmpty | LazyMany<T> | LazyNext<T>;

type LazyEmpty = {
  done: boolean;
  hasNext: false;
  hasMany?: false | undefined;
  next?: undefined;
};

type LazyNext<T> = {
  done: boolean;
  hasNext: true;
  hasMany?: false | undefined;
  next: T;
};

type LazyMany<T> = {
  done: boolean;
  hasNext: true;
  hasMany: true;
  next: readonly T[];
};

/**
 * A stateful, per-element transform used while a `pipe` evaluates lazily.
 *
 * @template T - The type of the values entering the evaluator.
 * @template R - The type of the values the evaluator emits.
 * @param item - The current value.
 * @param index - The zero-based position of `item` within the values seen so far.
 * @param data - The values seen so far. NOTE: during lazy evaluation this is
 *   only the prefix processed up to this point, not the complete input array.
 * @returns A {@link LazyResult} describing what to emit and whether to stop.
 */
export type LazyEvaluator<T = unknown, R = T> = (item: T, index: number, data: readonly T[]) => LazyResult<R>;

/**
 * A factory that builds a {@link LazyEvaluator} from a data-last operator's
 * arguments. The optional `single` flag marks operators that emit at most one
 * value (e.g. a future `find`), which terminates the fused lazy run.
 */
export type LazyFactory = {
  readonly single?: boolean;
} & ((...args: any[]) => LazyEvaluator<any, any>);

/**
 * Metadata attached to a data-last function so that {@link pipe} can evaluate
 * it lazily. `lazy(...lazyArgs)` produces a fresh evaluator for one pipe run.
 */
export interface LazyDefinition {
  readonly lazy: LazyFactory;
  readonly lazyArgs: readonly unknown[];
}

/**
 * Sentinel result that drops the current value without stopping iteration.
 */
export const SKIP_ITEM = { done: false, hasNext: false } as const;

const EMPTY_PIPE = { done: true, hasNext: false } as const;

/**
 * An evaluator that emits nothing and stops immediately. Useful for operators
 * whose arguments make the result trivially empty (e.g. `take(0)`).
 *
 * @returns A terminal, empty {@link LazyResult}.
 */
export function lazyEmptyEvaluator(): LazyResult<never> {
  return EMPTY_PIPE;
}

/**
 * Attaches lazy-evaluation metadata to a data-last function.
 *
 * The returned function behaves exactly like `dataLast` when called directly
 * (the eager path). When placed inside a {@link pipe}, the attached
 * `lazy`/`lazyArgs` let `pipe` fuse it with adjacent lazy operators for a
 * single-pass, short-circuiting evaluation.
 *
 * @template F - The data-last function type.
 * @param dataLast - The eager `(data) => result` implementation.
 * @param lazy - Factory that produces the per-element evaluator from `lazyArgs`.
 * @param lazyArgs - The operator arguments forwarded to `lazy`.
 * @returns `dataLast`, augmented in place with the lazy metadata.
 */
export function toLazy<F extends (data: any) => any>(dataLast: F, lazy: LazyFactory, lazyArgs: readonly unknown[]): F {
  return Object.assign(dataLast, { lazy, lazyArgs });
}
