import { uniqWith as uniqWithToolkit } from '../../array/uniqWith';

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the comparator function.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to process.
 * @param {(item1: T, item2: T) => boolean} areItemsEqual - The function used to compare the array elements.
 * @returns {T[]} A new array containing only the unique elements from the original array, based on the values returned by the comparator function.
 *
 * @example
 * ```ts
 * uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1);
 * // [1.2, 3.2, 5.7, 7.19]
 * ```
 */
export function uniqWith<T>(arr: readonly T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the comparator function.
 *
 * @template T - The type of elements in the array.
 * @param {(item1: T, item2: T) => boolean} areItemsEqual - The function used to compare the array elements.
 * @returns {(arr: T[]) => T[]} A function that receive the array to process as argument and returns a new array containing only the unique elements from the original array, based on the values returned by the comparator function.
 *
 * @example
 * ```ts
 * uniqWith(1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1)([1.2);
 * // [1.2, 3.2, 5.7, 7.19]
 * ```
 */
export function uniqWith<T>(areItemsEqual: (item1: T, item2: T) => boolean): (arr: readonly T[]) => T[];

export function uniqWith<T>(
  arrOrAreItemsEqual: readonly T[] | ((item1: T, item2: T) => boolean),
  areItemsEqual?: (item1: T, item2: T) => boolean
) {
  if (areItemsEqual == null) {
    return (arr: readonly T[]) => uniqWith(arr, arrOrAreItemsEqual as (item1: T, item2: T) => boolean);
  }

  const arr = arrOrAreItemsEqual as readonly T[];
  return uniqWithToolkit(arr, areItemsEqual);
}
