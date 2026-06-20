import type { LazyDefinition, LazyEvaluator, LazyResult } from './_internal/lazy.ts';
import { SKIP_ITEM } from './_internal/lazy.ts';

type PreparedLazyFunction = LazyEvaluator & {
  readonly isSingle: boolean;

  // Intentionally mutable: these hold the per-run state of a lazy operator.
  index: number;
  items: unknown[];
};

type LazyFunction = LazyDefinition & ((input: unknown) => unknown);

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
  let index = 0;

  while (index < functions.length) {
    const func = functions[index];

    if (isLazyFunction(func) && isIterable(output)) {
      // Group consecutive lazy functions so lazy only ever runs alongside lazy,
      // as a single fused pass through `lazyPipe`.
      const lazyFunctions: LazyFunction[] = [];
      while (index < functions.length) {
        const candidate = functions[index];
        if (!isLazyFunction(candidate)) {
          break;
        }
        lazyFunctions.push(candidate);
        index += 1;
        // A "single" function (one that emits at most one value) ends the run.
        if (candidate.lazy.single === true) {
          break;
        }
      }
      output = lazyPipe(output, lazyFunctions);
    } else {
      // Group consecutive non-lazy functions and run them through `eagerPipe`.
      const eagerFunctions: Array<(input: unknown) => unknown> = [];
      do {
        eagerFunctions.push(functions[index]);
        index += 1;
      } while (index < functions.length && !isLazyFunction(functions[index]));
      output = eagerPipe(output, eagerFunctions);
    }
  }

  return output;
}

function isLazyFunction(func: (input: unknown) => unknown): func is LazyFunction {
  return 'lazy' in func;
}

/**
 * Runs a value through a sequence of plain functions, left to right; each
 * function receives the previous result. No lazy bookkeeping is involved.
 */
function eagerPipe(value: unknown, functions: ReadonlyArray<(input: unknown) => unknown>): unknown {
  let output = value;
  for (let index = 0; index < functions.length; index++) {
    output = functions[index](output);
  }
  return output;
}

/**
 * Runs an iterable through a run of lazy functions as a single fused pass: each
 * element is pushed through the whole run before the next is read, so a
 * short-circuiting function (e.g. `take`) can end iteration early. Returns the
 * collected array, or the single value for a `single` run.
 */
function lazyPipe(data: Iterable<unknown>, lazyFunctions: readonly LazyFunction[]): unknown {
  const lazySequence: PreparedLazyFunction[] = [];
  for (let index = 0; index < lazyFunctions.length; index++) {
    lazySequence.push(prepareLazyFunction(lazyFunctions[index]));
  }

  const accumulator: unknown[] = [];
  if (Array.isArray(data)) {
    // Fast path: indexing avoids allocating an iterator result per element.
    for (let index = 0; index < data.length; index++) {
      if (processItem(data[index], accumulator, lazySequence)) {
        break;
      }
    }
  } else {
    const iterator = data[Symbol.iterator]();
    for (let step = iterator.next(); !step.done; step = iterator.next()) {
      if (processItem(step.value, accumulator, lazySequence)) {
        break;
      }
    }
  }

  const lastFunction = lazySequence[lazySequence.length - 1];
  return lastFunction.isSingle ? accumulator[0] : accumulator;
}

/**
 * Pushes a single value through a fused run of lazy operators, appending any
 * emitted values to `accumulator`.
 *
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
    const { index, items } = lazyFn;
    items.push(currentItem);
    lazyResult = lazyFn(currentItem, index, items);
    lazyFn.index += 1;

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

function prepareLazyFunction(func: LazyFunction): PreparedLazyFunction {
  const { lazy, lazyArgs } = func;
  const evaluator = lazy(...lazyArgs);
  return Object.assign(evaluator, {
    isSingle: lazy.single ?? false,
    index: 0,
    items: [] as unknown[],
  });
}

function isIterable(value: unknown): value is Iterable<unknown> {
  // Guard against null/undefined before probing for Symbol.iterator.
  return typeof value === 'string' || (typeof value === 'object' && value !== null && Symbol.iterator in value);
}
