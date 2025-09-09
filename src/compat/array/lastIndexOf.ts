import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Gets the index at which the last occurrence of value is found in array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to inspect.
 * @param {T} value - The value to search for.
 * @param {true | number} [fromIndex] - The index to search from or true to search from the end.
 * @returns {number} Returns the index of the matched value, else -1.
 *
 * @example
 * lastIndexOf([1, 2, 1, 2], 2);
 * // => 3
 *
 * lastIndexOf([1, 2, 1, 2], 2, 2);
 * // => 1
 *
 * lastIndexOf([1, 2, 1, 2], 2, true);
 * // => 3
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

  let index = (fromIndex as number) ?? length - 1;
  if (fromIndex != null) {
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
