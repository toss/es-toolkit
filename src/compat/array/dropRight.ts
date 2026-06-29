import { dropRight as dropRightToolkit } from '../../array/dropRight.ts';
import { toArray } from '../_internal/toArray.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Removes a specified number of elements from the end of an array and returns the rest.
 *
 * This function takes an array and a number, and returns a new array with the specified number
 * of elements removed from the end.
 *
 * @template T - The type of elements in the array.
 * @param array - The array from which to drop elements.
 * @param itemsCount - The number of elements to drop from the end of the array.
 * @returns A new array with the specified number of elements removed from the end.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = dropRight(array, 2);
 * // result will be [1, 2, 3] since the last two elements are dropped.
 */
export function dropRight<T>(array: ArrayLike<T> | null | undefined, itemsCount?: number): T[];

export function dropRight<T>(array: ArrayLike<T> | null | undefined, itemsCount = 1, guard?: unknown): T[] {
  if (!isArrayLike(array)) {
    return [];
  }
  itemsCount = guard ? 1 : toInteger(itemsCount);

  return dropRightToolkit(toArray(array), itemsCount);
}
