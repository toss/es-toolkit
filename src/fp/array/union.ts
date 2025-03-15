import { union as unionToolkit } from '../../array/union';

/**
 * Creates an array of unique values from all given arrays.
 *
 * This function takes two arrays, merges them into a single array, and returns a new array
 * containing only the unique values from the merged array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr1 - The first array to merge and filter for unique values.
 * @param {T[]} arr2 - The second array to merge and filter for unique values.
 * @returns {T[]} A new array of unique values.
 *
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [3, 4, 5];
 * const result = union(array1, array2);
 * // result will be [1, 2, 3, 4, 5]
 */
export function union<T>(arr1: readonly T[], arr2: readonly T[]): T[];

/**
 * Creates an array of unique values from all given arrays.
 *
 * This function takes two arrays, merges them into a single array, and returns a new array
 * containing only the unique values from the merged array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr2 - The second array to merge and filter for unique values.
 * @returns {(arr1: T[]) => T[]} A function that receive the first array to merge and filter for unique values as argument and returns a new array of unique values.
 *
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [3, 4, 5];
 * const result = union(array2)(array1);
 * // result will be [1, 2, 3, 4, 5]
 */
export function union<T>(arr2: readonly T[]): (arr1: readonly T[]) => T[];

export function union<T>(arr1OrArr2: readonly T[] | readonly T[], arr2?: readonly T[]) {
  if (arr2 == null) {
    return (arr1: readonly T[]) => union(arr1, arr1OrArr2 as readonly T[]);
  }

  const arr1 = arr1OrArr2 as readonly T[];
  return unionToolkit(arr1, arr2);
}
