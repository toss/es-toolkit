import { unzipWith as unzipWithToolkit } from '../../array/unzipWith';

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * @template T, R
 * @param {T[][]} target - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {(...args: T[]) => R} iteratee - A function to transform the unzipped elements.
 * @returns {R[]} A new array of unzipped and transformed elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
 * // result will be [9, 12]
 */
export function unzipWith<T, R>(target: readonly T[][], iteratee: (...args: T[]) => R): R[];

/**
 * Unzips an array of arrays, applying an `iteratee` function to regrouped elements.
 *
 * @template T, R
 * where each inner array contains elements to be unzipped.
 * @param {(...args: T[]) => R} iteratee - A function to transform the unzipped elements.
 * @returns {(target: T[][]) => R[]} A function that receive the nested array to unzip. This is an array of arrays, as argument and returns a new array of unzipped and transformed elements.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith((item, item2, item3) => item + item2 + item3)(nestedArray);
 * // result will be [9, 12]
 */
export function unzipWith<T, R>(iteratee: (...args: T[]) => R): (target: readonly T[][]) => R[];

export function unzipWith<T, R>(
  targetOrIteratee: readonly T[][] | ((...args: T[]) => R),
  iteratee?: (...args: T[]) => R
) {
  if (iteratee == null) {
    return (target: readonly T[][]) => unzipWith(target, targetOrIteratee as (...args: T[]) => R);
  }

  const target = targetOrIteratee as readonly T[][];
  return unzipWithToolkit(target, iteratee);
}
