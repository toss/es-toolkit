import { uniqBy as uniqByToolkit } from '../../array/uniqBy';

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the mapper function.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of mapped elements.
 * @param {T[]} arr - The array to process.
 * @param {(item: T) => U} mapper - The function used to convert the array elements.
 * @returns {T[]} A new array containing only the unique elements from the original array, based on the values returned by the mapper function.
 *
 * @example
 * ```ts
 * uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
 * // [1.2, 2.1, 3.2, 5.7, 7.19]
 * ```
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 * ];
 * uniqBy(array, item => item.category).length
 * // 2
 * ```
 */
export function uniqBy<T, U>(arr: readonly T[], mapper: (item: T) => U): T[];

/**
 * Returns a new array containing only the unique elements from the original array,
 * based on the values returned by the mapper function.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of mapped elements.
 * @param {(item: T) => U} mapper - The function used to convert the array elements.
 * @returns {(arr: T[]) => T[]} A function that receive the array to process as argument and returns a new array containing only the unique elements from the original array, based on the values returned by the mapper function.
 *
 * @example
 * ```ts
 * uniqBy(1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor)([1.2);
 * // [1.2, 2.1, 3.2, 5.7, 7.19]
 * ```
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 * ];
 * uniqBy(array, item => item.category).length
 * // 2
 * ```
 */
export function uniqBy<T, U>(mapper: (item: T) => U): (arr: readonly T[]) => T[];

export function uniqBy<T, U>(arrOrMapper: readonly T[] | ((item: T) => U), mapper?: (item: T) => U) {
  if (mapper == null) {
    return (arr: readonly T[]) => uniqBy(arr, arrOrMapper as (item: T) => U);
  }

  const arr = arrOrMapper as readonly T[];
  return uniqByToolkit(arr, mapper);
}
