import { dropRight as dropRightToolkit } from '../../array/dropRight';

/**
 * Removes a specified number of elements from the end of an array and returns the rest.
 *
 * This function takes an array and a number, and returns a new array with the specified number
 * of elements removed from the end.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which to drop elements.
 * @param {number} itemsCount - The number of elements to drop from the end of the array.
 * @returns {T[]} A new array with the specified number of elements removed from the end.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = dropRight(array, 2);
 * // result will be [1, 2, 3] since the last two elements are dropped.
 */
export function dropRight<T>(arr: readonly T[], itemsCount: number): T[];

/**
 * Removes a specified number of elements from the end of an array and returns the rest.
 *
 * This function takes an array and a number, and returns a new array with the specified number
 * of elements removed from the end.
 *
 * @template T - The type of elements in the array.
 * @param {number} itemsCount - The number of elements to drop from the end of the array.
 * @returns {(arr: T[]) => T[]} A function that receive the array from which to drop elements as argument and returns a new array with the specified number of elements removed from the end.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = dropRight(2)(array);
 * // result will be [1, 2, 3] since the last two elements are dropped.
 */
export function dropRight<T>(itemsCount: number): (arr: readonly T[]) => T[];

export function dropRight<T>(arrOrItemsCount: readonly T[] | number, itemsCount?: number) {
  if (itemsCount == null) {
    return (arr: readonly T[]) => dropRight(arr, arrOrItemsCount as number);
  }

  const arr = arrOrItemsCount as readonly T[];
  return dropRightToolkit(arr, itemsCount);
}
