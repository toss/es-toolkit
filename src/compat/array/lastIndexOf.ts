import { isArrayLike } from '../predicate/isArrayLike.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Gets the index at which the last occurrence of value is found in array.
 *
 * @template T
 * @param array - The array to inspect.
 * @param value - The value to search for.
 * @param [fromIndex] - The index to search from or true to search from the end.
 * @returns Returns the index of the matched value, else -1.
 *
 * @example
 * lastIndexOf([1, 2, 1, 2], 2);
 * // => 3
 *
 * lastIndexOf([1, 2, 1, 2], 2, 2);
 * // => 1
 *
 * lastIndexOf([1, 2, 1, 2], 2, true);
 * // => 1
 */
export function lastIndexOf<T>(
  array: ArrayLike<T> | null | undefined,
  searchElement: T,
  fromIndex?: true | number
): number;

export function lastIndexOf<T>(
  array: ArrayLike<T> | null | undefined,
  searchElement: T,
  fromIndex?: true | number
): number {
  if (!isArrayLike(array) || array.length === 0) {
    return -1;
  }

  const length = array.length;

  let index = fromIndex === undefined ? length - 1 : toInteger(fromIndex);
  if (fromIndex !== undefined) {
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1);
  }

  // `Array.prototype.lastIndexOf` doesn't find `NaN` values, so we need to handle that case separately.
  if (Number.isNaN(searchElement)) {
    for (let i = index; i >= 0; i--) {
      if (Number.isNaN(array[i])) {
        return i;
      }
    }
  }

  return Array.from(array).lastIndexOf(searchElement, index);
}
