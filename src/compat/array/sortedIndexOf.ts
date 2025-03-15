import { sortedIndex } from './sortedIndex';
import { eq } from '../util/eq';

/**
 * This method is like `indexOf` but performs a binary search on a sorted `array`.
 *
 * @param {ArrayLike<T> | null | undefined} array The sorted array to inspect.
 * @param {T} value The value to search for.
 * @returns {number} Returns the index of the matched value, else -1.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * sortedIndexOf(numbers, 11); // Return value: 0
 * sortedIndexOf(numbers, 30); // Return value: -1
 *
 * // If the value is duplicated, it returns the first index of the value.
 * const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4];
 * sortedIndexOf(duplicateNumbers, 3); // Return value: 3
 *
 * // If the array is unsorted, it can return the wrong index.
 * const unSortedArray = [55, 33, 22, 11, 44];
 * sortedIndexOf(unSortedArray, 11); // Return value: -1
 *
 * // -0 and 0 are treated the same
 * const mixedZeroArray = [-0, 0];
 * sortedIndexOf(mixedZeroArray, 0); // Return value: 0
 * sortedIndexOf(mixedZeroArray, -0); // Return value: 0
 *
 * // It works with array-like objects
 * const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };
 * sortedIndexOf(arrayLike, 20); // Return value: 1
 */
export function sortedIndexOf<T>(array: ArrayLike<T> | null | undefined, value: T): number {
  if (!array?.length) {
    return -1;
  }

  const index = sortedIndex(array, value);
  if (index < array.length && eq(array[index], value)) {
    return index;
  }
  return -1;
}
