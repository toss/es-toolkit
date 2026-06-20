import type { LazyEvaluator, LazyFunction, LazyResult } from './_internal/lazy.ts';
import { SKIP_ITEM } from './_internal/lazy.ts';
import { chunkBy } from '../array/chunkBy.ts';

interface PreparedLazyFunction extends LazyEvaluator {
  // Intentionally mutable: holds the per-run prefix of inputs seen by this operator.
  items: unknown[];
}

/**
 * Performs left-to-right function composition, threading `value` through each
 * function in sequence. Every function receives the output of the previous
 * one, so the data flows top-to-bottom in the same order it is read. This
 * turns deeply nested calls into clear, sequential steps without temporary
 * variables.
 *
 * This is the entry point of `es-toolkit/fp`. Each `es-toolkit/fp` function is
 * called with its configuration (e.g. `map(fn)`, `take(2)`) and returns a
 * function that takes the data, which `pipe` then supplies.
 *
 * When consecutive **lazy-capable** functions (`map`, `filter`, `take`, ...)
 * appear together, `pipe` fuses them and processes the input element-by-element
 * instead of building an intermediate array after every step. This allows
 * early termination: a trailing `take(n)` stops the walk as soon as `n`
 * results exist, so the remaining input is never visited.
 *
 * IMPORTANT: during lazy evaluation, a callback's third argument (the data
 * array) contains only the elements processed so far, not the complete input.
 *
 * @param value - The initial value fed into the pipe.
 * @param functions - Data-last operators (or any unary functions) applied in order.
 * @returns The result of applying every function, left to right.
 *
 * @example
 * import { pipe, map, filter, take } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3], map(x => x * 3)); // => [3, 6, 9]
 *
 * @example
 * // Lazy evaluation with early termination: only the first two even squares
 * // are ever computed, the rest of the array is never touched.
 * pipe(
 *   [1, 2, 3, 4, 5, 6, 7, 8],
 *   map(x => x * x),
 *   filter(x => x % 2 === 0),
 *   take(2)
 * ); // => [4, 16]
 *
 * @example
 * // Any unary function works inside a pipe, not just es-toolkit operators.
 * pipe(
 *   '  Hello  ',
 *   s => s.trim(),
 *   s => s.toLowerCase()
 * ); // => 'hello'
 */
export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, fn1: (input: A) => B): B;
export function pipe<A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
export function pipe<A, B, C, D>(value: A, fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D): D;
export function pipe<A, B, C, D, E>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E
): E;
export function pipe<A, B, C, D, E, F>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F
): F;
export function pipe<A, B, C, D, E, F, G>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G
): G;
export function pipe<A, B, C, D, E, F, G, H>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H
): H;
export function pipe<A, B, C, D, E, F, G, H, I>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I
): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J
): J;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K
): K;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L
): L;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L,
  fn12: (input: L) => M
): M;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L,
  fn12: (input: L) => M,
  fn13: (input: M) => N
): N;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L,
  fn12: (input: L) => M,
  fn13: (input: M) => N,
  fn14: (input: N) => O
): O;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  value: A,
  fn1: (input: A) => B,
  fn2: (input: B) => C,
  fn3: (input: C) => D,
  fn4: (input: D) => E,
  fn5: (input: E) => F,
  fn6: (input: F) => G,
  fn7: (input: G) => H,
  fn8: (input: H) => I,
  fn9: (input: I) => J,
  fn10: (input: J) => K,
  fn11: (input: K) => L,
  fn12: (input: L) => M,
  fn13: (input: M) => N,
  fn14: (input: N) => O,
  fn15: (input: O) => P
): P;
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- variadic; the overloads carry the real types.
export function pipe(value: unknown, ...functions: ReadonlyArray<(input: any) => unknown>): unknown {
  let output = value;

  // Partition the functions into maximal runs of consecutive lazy / non-lazy
  // operators. A lazy run (applied to an iterable) is fused into a single
  // element-by-element pass through `lazyPipe`; everything else is applied one
  // function at a time.
  const groups = chunkBy(functions, isLazyFunction);
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const group = groups[groupIndex];

    if (isLazyFunction(group[0]) && Array.isArray(output)) {
      // `chunkBy` keyed every member of this run as lazy, so the cast is safe.
      output = lazyPipe(output, group as unknown as readonly LazyFunction[]);
    } else {
      for (let index = 0; index < group.length; index++) {
        output = group[index](output);
      }
    }
  }

  return output;
}

/**
 * Determines whether a piped function carries lazy-evaluation metadata (i.e. was
 * produced by `createLazyFunction`). Such functions can be fused into a single
 * element-by-element pass; every other function runs eagerly.
 *
 * @param func - A function supplied to `pipe`.
 * @returns `true` if `func` is a lazy-capable operator.
 */
function isLazyFunction(func: (input: unknown) => unknown): func is LazyFunction {
  return 'lazy' in func;
}

/**
 * Runs an array through a run of lazy functions as a single fused pass: each
 * element is pushed through the whole run before the next is read, so a
 * short-circuiting function (e.g. `take`) can end the walk early. Indexing the
 * array directly avoids allocating an iterator result per element.
 *
 * @param data - The array input fed to the first lazy operator in the run.
 * @param lazyFunctions - The consecutive lazy operators to fuse, in order.
 * @returns The collected output array.
 */
function lazyPipe(data: readonly unknown[], lazyFunctions: readonly LazyFunction[]): unknown[] {
  const lazySequence: PreparedLazyFunction[] = [];
  for (let index = 0; index < lazyFunctions.length; index++) {
    lazySequence.push(prepareLazyFunction(lazyFunctions[index]));
  }

  const accumulator: unknown[] = [];
  // The `Array.isArray` guard is redundant with `pipe`'s own check, but it is
  // load-bearing: it gives V8 the type feedback to compile `data[index]` as fast
  // packed-array access instead of a generic property load.
  if (Array.isArray(data)) {
    for (let index = 0; index < data.length; index++) {
      if (processItem(data[index], accumulator, lazySequence)) {
        break;
      }
    }
  }

  return accumulator;
}

/**
 * Pushes a single value through a fused run of lazy operators, appending any
 * emitted values to `accumulator`.
 *
 * @param item - The current input element to feed through the run.
 * @param accumulator - The output array that emitted values are appended to.
 * @param lazySequence - The prepared lazy operators the item is run through.
 * @returns `true` when the pipe should stop reading further input elements.
 */
function processItem(item: unknown, accumulator: unknown[], lazySequence: readonly PreparedLazyFunction[]): boolean {
  if (lazySequence.length === 0) {
    accumulator.push(item);
    return false;
  }

  let currentItem = item;
  let lazyResult: LazyResult<unknown> = SKIP_ITEM;
  let isDone = false;

  for (let functionsIndex = 0; functionsIndex < lazySequence.length; functionsIndex++) {
    const lazyFn = lazySequence[functionsIndex];
    const { items } = lazyFn;
    items.push(currentItem);
    // After the push, `items.length - 1` is this element's index, so there is
    // no separate counter to keep.
    lazyResult = lazyFn(currentItem, items.length - 1, items);

    if (lazyResult.hasNext) {
      if (lazyResult.hasMany === true) {
        const subItems = lazyResult.next as readonly unknown[];
        const restSequence = lazySequence.slice(functionsIndex + 1);
        for (let subIndex = 0; subIndex < subItems.length; subIndex++) {
          const subShouldExitEarly = processItem(subItems[subIndex], accumulator, restSequence);
          if (subShouldExitEarly) {
            return true;
          }
        }
        return isDone;
      }
      currentItem = lazyResult.next;
    }

    if (!lazyResult.hasNext) {
      break;
    }

    // Keep processing the remaining operators for this element, but remember
    // that no further input elements should be read.
    if (lazyResult.done) {
      isDone = true;
    }
  }

  if (lazyResult.hasNext) {
    accumulator.push(currentItem);
  }

  return isDone;
}

/**
 * Builds a fresh evaluator for one lazy operator and attaches the per-run
 * `items` buffer (the prefix of inputs it has seen). A new evaluator is built
 * per pipe run so that operator state never leaks between runs.
 *
 * @param func - A lazy-capable operator carrying its `lazy` evaluator factory.
 * @returns The evaluator, augmented with an empty `items` buffer.
 */
function prepareLazyFunction(func: LazyFunction): PreparedLazyFunction {
  const evaluator = func.lazy() as PreparedLazyFunction;
  evaluator.items = [];
  return evaluator;
}
