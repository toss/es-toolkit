/**
 * Finds the index of the first occurrence of a value in an array.
 *
 * This method is similar to `Array.prototype.indexOf`, but it also finds `NaN` values.
 * It uses strict equality (`===`) to compare elements.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of the value to search for.
 * @param {T[] | null | undefined} array - The array to search.
 * @param {T} searchElement - The value to search for.
 * @param {number} [fromIndex] - The index to start the search at.
 * @returns {number} The index (zero-based) of the first occurrence of the value in the array, or `-1` if the value is not found.
 *
 * @example
 * const array = [1, 2, 3, NaN];
 * indexOf(array, 3); // => 2
 * indexOf(array, NaN); // => 3
 */
export function indexOf<T>(array: readonly T[] | null | undefined, searchElement: T, fromIndex?: number): number {
  if (array == null) {
    return -1;
  }

  // `Array.prototype.indexOf` doesn't find `NaN` values, so we need to handle that case separately.
  if (Number.isNaN(searchElement)) {
    fromIndex = fromIndex ?? 0;

    if (fromIndex < 0) {
      fromIndex = Math.max(0, array.length + fromIndex);
    }

    for (let i = fromIndex; i < array.length; i++) {
      if (Number.isNaN(array[i])) {
        return i;
      }
    }

    return -1;
  }

  // Array.prototype.indexOf already handles `fromIndex < -array.length`, `fromIndex >= array.length` and converts `fromIndex` to an integer, so we don't need to handle those cases here.
  // And it uses strict equality (===) to compare elements like `lodash/indexOf` does.
  return array.indexOf(searchElement as T, fromIndex);
}
