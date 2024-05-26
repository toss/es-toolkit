import { uniq } from "./uniq";

/**
 * Creates an array of unique values from all given arrays.
 * 
 * This function takes multiple arrays, merges them into a single array, and returns a new array 
 * containing only the unique values from the merged array.
 *
 * @param {...T[][]} arrays - The arrays to merge and filter for unique values.
 * @returns {T[]} A new array of unique values.
 *
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [3, 4, 5];
 * const result = union(array1, array2);
 * // result will be [1, 2, 3, 4, 5]
 */
export function union<T>(...arrays: T[][]): T[] {
  return uniq(arrays.flat());
}
