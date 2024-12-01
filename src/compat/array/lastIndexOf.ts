import { isArrayLike } from '../predicate/isArrayLike';

/**
 * Finds the index of the last occurrence of a value in an array.
 *
 * This method is similar to `Array.prototype.lastIndexOf`, but it also finds `NaN` values.
 * It uses strict equality (`===`) to compare elements.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} array - The array to search.
 * @param {T} searchElement - The value to search for.
 * @param {number} [fromIndex] - The index to start the search at.
 * @returns {number} The index (zero-based) of the last occurrence of the value in the array, or `-1` if the value is not found.
 *
 * @example
 * const array = [1, 2, 3, NaN, 1];
 * lastIndexOf(array, 3); // => 4
 * lastIndexOf(array, NaN); // => 3
 */
export function lastIndexOf<T>(array: ArrayLike<T> | null | undefined, searchElement: T, fromIndex?: number): number {
  if (!isArrayLike(array) || array.length === 0) {
    return -1;
  }

  const length = array.length;

  let index = fromIndex ?? length - 1;
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
