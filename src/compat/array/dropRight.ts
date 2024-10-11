import { dropRight as dropRightToolkit } from '../../array/dropRight.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Removes a specified number of elements from the end of an array and returns the rest.
 *
 * This function takes an array and a number, and returns a new array with the specified number
 * of elements removed from the end.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} collection - The array from which to drop elements.
 * @param {number} itemsCount - The number of elements to drop from the end of the array.
 * @returns {T[]} A new array with the specified number of elements removed from the end.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = dropRight(array, 2);
 * // result will be [1, 2, 3] since the last two elements are dropped.
 */
export function dropRight<T>(collection: ArrayLike<T> | null | undefined, itemsCount: number): T[] {
  if (!isArrayLike(collection)) {
    return [];
  }

  return dropRightToolkit(Array.from(collection), itemsCount);
}
