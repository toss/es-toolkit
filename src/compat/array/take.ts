import { take as takeToolkit } from '../../array/take.ts';
import { toArray } from '../_internal/toArray.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Creates a slice of array with n elements taken from the beginning.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to query.
 * @param {number} [n=1] - The number of elements to take.
 * @returns {T[]} Returns the slice of array.
 *
 * @example
 * take([1, 2, 3]);
 * // => [1]
 *
 * @example
 * take([1, 2, 3], 2);
 * // => [1, 2]
 *
 * @example
 * take([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * @example
 * take([1, 2, 3], 0);
 * // => []
 */
export function take<T>(array: ArrayLike<T> | null | undefined, n?: number): T[];

/**
 * Returns a new array containing the first `count` elements from the input array `arr`.
 * If `count` is greater than the length of `arr`, the entire array is returned.
 *
 * @template T - Type of elements in the input array.
 *
 * @param {ArrayLike<T> | null | undefined} arr - The array to take elements from.
 * @param {number} [count=1] - The number of elements to take.
 * @param {unknown} [guard] - Enables use as an iteratee for methods like `_.map`.
 * @returns {T[]} A new array containing the first `count` elements from `arr`.
 *
 * @example
 * // Returns [1, 2, 3]
 * take([1, 2, 3, 4, 5], 3);
 *
 * @example
 * // Returns ['a', 'b']
 * take(['a', 'b', 'c'], 2);
 *
 * @example
 * // Returns [1, 2, 3]
 * take([1, 2, 3], 5);
 */
export function take<T>(arr: ArrayLike<T> | null | undefined, count = 1, guard?: unknown): T[] {
  count = guard ? 1 : toInteger(count);
  if (count < 1 || !isArrayLike(arr)) {
    return [];
  }

  return takeToolkit(toArray(arr), count);
}
