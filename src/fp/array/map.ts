import type { LazyEvaluator } from '../_internal/lazy.ts';
import { toLazy } from '../_internal/lazy.ts';

/**
 * Creates a data-last operator that builds a new array by calling `callback`
 * on every element, equivalent to `Array.prototype.map`.
 *
 * The returned operator is **lazy-capable**: inside a {@link pipe} it is fused
 * with adjacent lazy operators and runs element-by-element, so a trailing
 * `take` can terminate the walk early without mapping the rest of the input.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type of elements in the output array.
 * @param callback - Called with `(value, index, array)` for each element; its
 *   return value becomes the corresponding element of the output array. During
 *   lazy evaluation `array` holds only the elements seen so far.
 * @returns A function that maps a `readonly T[]` to a new `U[]`.
 *
 * @example
 * import { pipe, map } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3], map(x => x * 2)); // => [2, 4, 6]
 *
 * @example
 * // The index is available as the second argument.
 * pipe([10, 20, 30], map((value, index) => value + index)); // => [10, 21, 32]
 */
export function map<T, U>(callback: (value: T, index: number, array: readonly T[]) => U): (array: readonly T[]) => U[] {
  return toLazy((array: readonly T[]): U[] => array.map((value, index) => callback(value, index, array)), mapLazy, [
    callback,
  ]);
}

function mapLazy<T, U>(callback: (value: T, index: number, array: readonly T[]) => U): LazyEvaluator<T, U> {
  return (value, index, data) => ({
    done: false,
    hasNext: true,
    next: callback(value, index, data),
  });
}
