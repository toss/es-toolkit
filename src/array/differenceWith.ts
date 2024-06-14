/**
 * Computes the difference between two arrays based on a custom equality function.
 *
 * This function takes two arrays and a custom comparison function. It returns a new array containing
 * the elements that are present in the first array but not in the second array. The comparison to determine
 * if elements are equal is made using the provided custom function.
 *
 * @template T
 * @param {T[]} firstArr - The array from which to get the difference.
 * @param {T[]} secondArr - The array containing elements to exclude from the first array.
 * @param {(x: T, y: T) => boolean} areItemsEqual - A function to determine if two items are equal.
 * @returns {T[]} A new array containing the elements from the first array that do not match any elements in the second array
 * according to the custom equality function.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const areItemsEqual = (a, b) => a.id === b.id;
 * const result = differenceWith(array1, array2, areItemsEqual);
 * // result will be [{ id: 1 }, { id: 3 }] since the elements with id 2 are considered equal and are excluded from the result.
 */
export function differenceWith<T>(firstArr: readonly T[], secondArr: readonly T[], areItemsEqual: (x: T, y: T) => boolean): T[] {
  return firstArr.filter(firstItem => {
    return secondArr.every(secondItem => {
      return !areItemsEqual(firstItem, secondItem);
    });
  });
}
