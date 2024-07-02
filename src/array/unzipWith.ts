import { isNil } from '../predicate';

/**
 * Unzips a nested array into separate arrays, optionally transforming the unzipped elements.
 *
 * This function takes a nested array (an array of arrays) and returns an array where each
 * element is a tuple containing the corresponding elements from the input arrays. If the input
 * nested array is null or undefined, or if it is empty, the function returns an empty array.
 * An optional iteratee function can be provided to transform the unzipped elements.
 *
 * @template T, R
 * @param {T[][] | null | undefined} target - The nested array to unzip. This is an array of arrays,
 * where each inner array contains elements to be unzipped.
 * @param {(...args: T[]) => R} iteratee - An optional function to transform the unzipped elements.
 * If provided, the iteratee is called with the corresponding elements from the inner arrays, and its
 * return value is included in the result instead of the group of elements.
 * @returns {R[] | T[][]} A new array containing the unzipped elements. If an iteratee function is
 * provided, the result will be an array of the transformed values returned by the iteratee. Otherwise,
 * the result will be an array of arrays containing the corresponding elements from the input nested array.
 *
 * @example
 * const nestedArray = [[1, 2], [3, 4], [5, 6]];
 * const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
 * // result will be [9, 12]
 */
export function unzipWith<T, R>(target: readonly T[][] | null | undefined, iteratee: (...args: T[]) => R): R[];
export function unzipWith<T>(target: readonly T[][] | null | undefined): T[][];
export function unzipWith<T, R>(
  target: readonly T[][] | null | undefined,
  iteratee?: (...args: T[]) => R
): R[] | T[][] {
  if (isNil(target) || target.length === 0) {
    return [];
  }

  const maxLength = Math.max(...target.map(innerArray => innerArray.length));

  const result = Array.from({ length: maxLength }) as R[] | T[][];

  for (let i = 0; i < maxLength; i++) {
    const group = target.map(innerArray => innerArray[i]);

    result[i] = iteratee ? iteratee(...group) : group;
  }

  return result;
}
