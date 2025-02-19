import { difference as differenceToolkit } from '../../array/difference';

/**
 * Computes the difference between two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements
 * that are present in the first array but not in the second array. It effectively
 * filters out any elements from the first array that also appear in the second array.
 *
 * @template T
 * @param {T[]} firstArr - The array from which to derive the difference. This is the primary array
 * from which elements will be compared and filtered.
 * @param {T[]} secondArr - The array containing elements to be excluded from the first array.
 * Each element in this array will be checked against the first array, and if a match is found,
 * that element will be excluded from the result.
 * @returns {T[]} A new array containing the elements that are present in the first array but not
 * in the second array.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4];
 * const result = difference(array1, array2);
 * // result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
 */
export function difference<T>(firstArr: readonly T[], secondArr: readonly T[]): T[];

/**
 * Computes the difference between two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements
 * that are present in the first array but not in the second array. It effectively
 * filters out any elements from the first array that also appear in the second array.
 *
 * @template T
 * @param {T[]} secondArr - The array containing elements to be excluded from the first array.
 * Each element in this array will be checked against the first array, and if a match is found,
 * that element will be excluded from the result.
 * @returns {(firstArr: T[]) => T[]} A function that receive the array from which to derive the difference. This is the primary array as argument and returns a new array containing the elements that are present in the first array but not.
 * in the second array.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4];
 * const result = difference(array2)(array1);
 * // result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
 */
export function difference<T>(secondArr: readonly T[]): (firstArr: readonly T[]) => T[];

export function difference<T>(firstArrOrSecondArr: readonly T[] | readonly T[], secondArr?: readonly T[]) {
  if (secondArr == null) {
    return (firstArr: readonly T[]) => difference(firstArr, firstArrOrSecondArr as readonly T[]);
  }

  const firstArr = firstArrOrSecondArr as readonly T[];
  return differenceToolkit(firstArr, secondArr);
}
