import { createLazyManyFunction } from '../_internal/lazy.ts';

/**
 * Creates a function that maps every element to an array with `callback` and
 * concatenates the results, equivalent to `Array.prototype.flatMap`. Use it
 * with {@link pipe}.
 *
 * The returned function is **lazy-capable**: inside a {@link pipe} it is fused
 * with adjacent lazy operations and runs element-by-element, so a trailing
 * `take` can terminate the walk early without expanding the rest of the input.
 *
 * @template T - The type of elements in the input array.
 * @template U - The type of elements in the output array.
 * @param callback - Called with `(value, index, array)` for each element;
 *   returns an array whose elements are flattened into the output. During lazy
 *   evaluation `array` holds only the elements seen so far.
 * @returns A function that maps a `readonly T[]` to a new `U[]`.
 *
 * @example
 * import { pipe, flatMap } from 'es-toolkit/fp';
 *
 * pipe([1, 2, 3], flatMap(x => [x, x * 10])); // => [1, 10, 2, 20, 3, 30]
 *
 * @example
 * // Returning an empty array drops the element.
 * pipe([1, 2, 3, 4], flatMap(x => (x % 2 === 0 ? [x] : []))); // => [2, 4]
 */
export function flatMap<T, U>(
  callback: (value: T, index: number, array: readonly T[]) => U[]
): (array: readonly T[]) => U[] {
  function flatMapAll(array: readonly T[]): U[] {
    return array.flatMap(callback);
  }

  // `callback` is the per-element function as-is — the many factory emits every
  // element of the array it returns.
  return createLazyManyFunction(flatMapAll, callback);
}
