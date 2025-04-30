import { uniqWith as uniqWithToolkit } from '../../array/uniqWith.ts';
import { uniq as uniqToolkit } from '../array/uniq.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

type Comparator<T> = (a: T, b: T) => boolean;

/**
 * This method is like `uniq`, except that it accepts a `comparator` which is used to determine the equality of elements.
 *
 * It creates a duplicate-free version of an array, in which only the first occurrence of each element is kept.
 * If a `comparator` is provided, it will be invoked with two arguments: `(arrVal, othVal)` to compare elements.
 * If no comparator is provided, shallow equality is used.
 *
 * The order of result values is determined by the order they appear in the input array.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr  - The array to process.
 * @param {Comparator<T>} [comparator] - Optional function to compare elements for equality.
 * @returns {T[]} A new array with only unique values based on the comparator.
 *
 * @example
 * const array = [1, 2, 2, 3];
 * const result = uniqWith(array);
 * // result will be [1, 2, 3]
 *
 * const array = [1, 2, 3];
 * const result = uniqWith(array, (a, b) => a % 2 === b % 2)
 * // result will be [1, 2]
 */
export function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  return typeof comparator === 'function' ? uniqWithToolkit(Array.from(arr), comparator) : uniqToolkit(Array.from(arr));
}
