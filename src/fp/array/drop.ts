import { drop as dropToolkit } from '../../array/drop';

/**
 * Removes a specified number of elements from the beginning of an array and returns the rest.
 *
 * This function takes an array and a number, and returns a new array with the specified number
 * of elements removed from the start.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which to drop elements.
 * @param {number} itemsCount - The number of elements to drop from the beginning of the array.
 * @returns {T[]} A new array with the specified number of elements removed from the start.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = drop(array, 2);
 * // result will be [3, 4, 5] since the first two elements are dropped.
 */
export function drop<T>(arr: readonly T[], itemsCount: number): T[];

/**
 * Removes a specified number of elements from the beginning of an array and returns the rest.
 *
 * This function takes an array and a number, and returns a new array with the specified number
 * of elements removed from the start.
 *
 * @template T - The type of elements in the array.
 * @param {number} itemsCount - The number of elements to drop from the beginning of the array.
 * @returns {(arr: T[]) => T[]} A function that receive the array from which to drop elements as argument and returns a new array with the specified number of elements removed from the start.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = drop(2)(array);
 * // result will be [3, 4, 5] since the first two elements are dropped.
 */
export function drop<T>(itemsCount: number): (arr: readonly T[]) => T[];

export function drop<T>(arrOrItemsCount: readonly T[] | number, itemsCount?: number) {
  if (itemsCount == null) {
    return (arr: readonly T[]) => drop(arr, arrOrItemsCount as number);
  }

  const arr = arrOrItemsCount as readonly T[];
  return dropToolkit(arr, itemsCount);
}
