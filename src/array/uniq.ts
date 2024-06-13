/**
 * Creates a duplicate-free version of an array.
 *
 * This function takes an array and returns a new array containing only the unique values
 * from the original array, preserving the order of first occurrence.
 *
 * @param {T[]} arr - The array to process.
 * @returns {T[]} A new array with only unique values from the original array.
 *
 * @example
 * const array = [1, 2, 2, 3, 4, 4, 5];
 * const result = uniq(array);
 * // result will be [1, 2, 3, 4, 5]
 */
export function uniq<T>(arr: readonly T[]): T[] {
  return Array.from(new Set(arr));
}
