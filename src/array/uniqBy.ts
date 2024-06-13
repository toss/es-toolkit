import { uniqWith } from './uniqWith';

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the mapper function.
 *
 * @param {T[]} arr - The array to process.
 * @param {(item: T) => U} mapper - The function used to convert the array elements.
 * @returns {T[]} A new array containing only the unique elements from the original array, based on the values returned by the mapper function.
 *
 * @example
 * ```ts
 * uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
 * // [1.2, 2.1, 3.3, 5.7, 7.19]
 * ```
 */
export function uniqBy<T, U>(arr: readonly T[], mapper: (item: T) => U): T[] {
  return uniqWith(arr, (item1, item2) => mapper(item1) === mapper(item2));
}
