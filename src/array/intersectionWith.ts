/**
 * Returns the intersection of two arrays based on a custom equality function.
 *
 * This function takes two arrays and a custom equality function. It returns a new array containing
 * the elements from the first array that have matching elements in the second array, as determined
 * by the custom equality function. It effectively filters out any elements from the first array that
 * do not have corresponding matches in the second array according to the equality function.
 *
 * @template F - The type of elements in the first array.
 * @template S - The type of elements in the second array.
 * @param {F[]} firstArr - The first array to compare.
 * @param {S[]} secondArr - The second array to compare.
 * @param {(x: F, y: S) => boolean} areItemsEqual - A custom function to determine if two elements are equal.
 * This function takes two arguments, one from each array, and returns `true` if the elements are considered equal, and `false` otherwise.
 * @returns {F[]} A new array containing the elements from the first array that have corresponding matches in the second array according to the custom equality function.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const areItemsEqual = (a, b) => a.id === b.id;
 * const result = intersectionWith(array1, array2, areItemsEqual);
 * // result will be [{ id: 2 }] since this element has a matching id in both arrays.
 */
export function intersectionWith<F, S>(
  firstArr: readonly F[],
  secondArr: readonly S[],
  areItemsEqual: (x: F, y: S) => boolean
): F[] {
  return firstArr.filter(firstItem => {
    return secondArr.some(secondItem => {
      return areItemsEqual(firstItem, secondItem);
    });
  });
}
