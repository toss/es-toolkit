import { unzip as unzipToolkit } from '../../array/unzip.ts';
import { isArray } from '../predicate/isArray.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * This method is like `unzip` except that it accepts an iteratee to specify
 * how regrouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @template T, R
 * @param array - The array of grouped elements to process.
 * @param iteratee - The function to combine regrouped values.
 * @returns Returns the new array of regrouped elements.
 *
 * @example
 * unzipWith([[1, 10, 100], [2, 20, 200]], (a, b) => a + b);
 * // => [3, 30, 300]
 */
export function unzipWith<T, R>(
  array: ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...values: T[]) => R
): R[];

/**
 * This method is like `unzip` except that it accepts an iteratee to specify
 * how regrouped values should be combined.
 *
 * @template T
 * @param array - The array of grouped elements to process.
 * @returns Returns the new array of regrouped elements.
 *
 * @example
 * unzipWith([[1, 10, 100], [2, 20, 200]]);
 * // => [[1, 2], [10, 20], [100, 200]]
 */
export function unzipWith<T>(array: ArrayLike<ArrayLike<T>> | null | undefined): T[][];

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param array - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param iteratee - A function to transform the unzipped elements.
 * @returns A new array of unzipped and transformed elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, (a, b) => a + b);
 * console.log(result); // [9, 12]
 */
export function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee?: ((...args: any[]) => unknown) | null
): any[] {
  if (!isArrayLikeObject(array) || !array.length) {
    return [];
  }

  const unzipped = isArray(array) ? unzipToolkit(array) : unzipToolkit(Array.from(array, value => Array.from(value)));

  if (!iteratee) {
    return unzipped;
  }

  const result: any[] = new Array(unzipped.length);

  for (let i = 0; i < unzipped.length; i++) {
    const value = unzipped[i];

    result[i] = iteratee(...value);
  }

  return result;
}
