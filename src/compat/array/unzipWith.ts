import { unzip as unzipToolkit } from '../../array/unzip.ts';
import { isArray } from '../predicate/isArray.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject';

/**
 * Unzips an array of arrays.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {T[][] | ArrayLike<ArrayLike<T>> | null | undefined} array - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @returns {T[][]} A new array of unzipped elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray);
 * console.log(result); // [[1, 3, 5], [2, 4, 6]]
 *
 * const result2 = unzipWith(null);
 * console.log(result2); // []
 *
 * const result3 = unzipWith();
 * console.log(result3); // []
 */
export function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][];

/**
 * Unzips an array of arrays.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {T[][] | ArrayLike<ArrayLike<T>> | null | undefined} array - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {null | undefined} iteratee - A function to transform the unzipped elements.
 * @returns {T[][]} A new array of unzipped elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, null);
 * console.log(result); // [[1, 3, 5], [2, 4, 6]]
 *
 * const result2 = unzipWith(nestedArray);
 * console.log(result2); // [[1, 3, 5], [2, 4, 6]]
 */
export function unzipWith<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined, iteratee?: null): T[][];

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T, R
 * @param {T[][] | ArrayLike<ArrayLike<T>> | null | undefined} array - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {(...args: T[]) => R} iteratee - A function to transform the unzipped elements.
 * @returns {R[]} A new array of unzipped and transformed elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, (a, b) => a + b);
 * console.log(result); // [9, 12]
 */
export function unzipWith<T, R>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: T[]) => R
): R[];

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {T[][] | ArrayLike<ArrayLike<T>> | null | undefined} array - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {(...args: any[]) => unknown} iteratee - A function to transform the unzipped elements.
 * @returns {any[]} A new array of unzipped and transformed elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, (a, b) => a + b);
 * console.log(result); // [9, 12]
 */
export function unzipWith<T>(
  array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined,
  iteratee: (...args: any[]) => unknown
): any[];

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {T[][] | ArrayLike<ArrayLike<T>> | null | undefined} array - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {(...args: any[]) => unknown} iteratee - A function to transform the unzipped elements.
 * @returns {any[]} A new array of unzipped and transformed elements.
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

  const unziped = isArray(array) ? unzipToolkit(array) : unzipToolkit(Array.from(array, value => Array.from(value)));

  if (!iteratee) {
    return unziped;
  }

  const result: any[] = new Array(unziped.length);

  for (let i = 0; i < unziped.length; i++) {
    const value = unziped[i];

    result[i] = iteratee(...value);
  }

  return result;
}
