import { chunk as chunkToolkit } from '../../array/chunk';

/**
 * Splits an array into smaller arrays of a specified length.
 *
 * This function takes an input array and divides it into multiple smaller arrays,
 * each of a specified length. If the input array cannot be evenly divided,
 * the final sub-array will contain the remaining elements.
 *
 * @template T The type of elements in the array.
 * @param {T[]} arr - The array to be chunked into smaller arrays.
 * @param {number} size - The size of each smaller array. Must be a positive integer.
 * @returns {T[][]} A two-dimensional array where each sub-array has a maximum length of `size`.
 * @throws {Error} Throws an error if `size` is not a positive integer.
 *
 * @example
 * // Splits an array of numbers into sub-arrays of length 2
 * chunk([1, 2, 3, 4, 5], 2);
 * // Returns: [[1, 2], [3, 4], [5]]
 *
 * @example
 * // Splits an array of strings into sub-arrays of length 3
 * chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
 * // Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
 */
export function chunk<T>(arr: readonly T[], size: number): T[][];

/**
 * Splits an array into smaller arrays of a specified length.
 *
 * This function takes an input array and divides it into multiple smaller arrays,
 * each of a specified length. If the input array cannot be evenly divided,
 * the final sub-array will contain the remaining elements.
 *
 * @template T The type of elements in the array.
 * @param {number} size - The size of each smaller array. Must be a positive integer.
 * @returns {(arr: T[]) => T[][]} A function that receive the array to be chunked into smaller arrays as argument and returns a two-dimensional array where each sub-array has a maximum length of `size`.
 * @throws {Error} Throws an error if `size` is not a positive integer.
 *
 * @example
 * // Splits an array of numbers into sub-arrays of length 2
 * chunk(2, 3, 4, 5], 2)([1);
 * // Returns: [[1, 2], [3, 4], [5]]
 *
 * @example
 * // Splits an array of strings into sub-arrays of length 3
 * chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
 * // Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
 */
export function chunk(size: number): <T>(arr: readonly T[]) => T[][];

export function chunk<T>(arrOrSize: readonly T[] | number, size?: number) {
  if (size == null) {
    return (arr: readonly T[]) => chunk(arr, arrOrSize as number);
  }

  const arr = arrOrSize as readonly T[];
  return chunkToolkit(arr, size);
}
