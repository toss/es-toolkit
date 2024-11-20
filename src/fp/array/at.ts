import { at as atToolkit } from '../../array/at';

/**
 * Retrieves elements from an array at the specified indices.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T
 * @param {readonly T[]} arr - The array to retrieve elements from.
 * @param {number[]} indices - An array of indices specifying the positions of elements to retrieve.
 * @returns {Array<T | undefined>} A new array containing the elements at the specified indices.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const result = at(numbers, [1, 3, 4]);
 * console.log(result); // [20, 40, 50]
 */
export function at<T>(arr: readonly T[], indices: number[]): Array<T | undefined>;

/**
 * Retrieves elements from an array at the specified indices.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T
 * @param {number[]} indices - An array of indices specifying the positions of elements to retrieve.
 * @returns {(arr: readonly T[]) => Array<T | undefined>} A function that receive the array to retrieve elements from as argument and returns a new array containing the elements at the specified indices.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const result = at([1, 3, 4])(numbers);
 * console.log(result); // [20, 40, 50]
 */
export function at<T>(indices: number[]): (arr: readonly T[]) => Array<T | undefined>;

export function at<T>(arrOrIndices: readonly T[] | number[], indices?: number[]) {
  if (indices == null) {
    return (arr: readonly T[]) => at(arr, arrOrIndices as number[]);
  }

  const arr = arrOrIndices as readonly T[];
  return atToolkit(arr, indices);
}
