import { intersection as intersectionToolkit } from '../../array/intersection.ts';
import { uniq } from '../../array/uniq.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * Returns the intersection of multiple arrays.
 *
 * This function takes multiple arrays and returns a new array containing the elements that are
 * present in all provided arrays. It effectively filters out any elements that are not found
 * in every array.
 *
 * @template T - The type of elements in the arrays.
 * @param {...(ArrayLike<T> | null | undefined)} arrays - The arrays to compare.
 * @returns {T[]} A new array containing the elements that are present in all arrays.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [3, 4, 5, 6, 7];
 * const result = intersection(array1, array2);
 * // result will be [3, 4, 5] since these elements are in both arrays.
 */
export function intersection<T>(...arrays: Array<ArrayLike<T> | null | undefined>): T[] {
  if (arrays.length === 0) {
    return [];
  }

  if (!isArrayLikeObject(arrays[0])) {
    return [];
  }

  let result: T[] = uniq(Array.from(arrays[0]));

  for (let i = 1; i < arrays.length; i++) {
    const array = arrays[i];

    if (!isArrayLikeObject(array)) {
      return [];
    }

    result = intersectionToolkit(result, Array.from(array));
  }

  return result;
}
