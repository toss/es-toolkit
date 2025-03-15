import { at } from './at.ts';
import { pullAt as pullAtToolkit } from '../../array/pullAt';

/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T
 * @param {T[]} arr - The array from which elements will be removed.
 * @param {number[]} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {Array<T | undefined>} An array containing the elements that were removed from the original array.
 *
 * @example
 * import { pullAt } from './pullAt';
 *
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = pullAt(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 */
export function pullAt<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined>;

/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T
 * @param {number[]} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {(arr: T[]) => Array<T | undefined>} A function that receive the array from which elements will be removed as argument and returns an array containing the elements that were removed from the original array.
 *
 * @example
 * import { pullAt } from './pullAt';
 *
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = pullAt(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 */
export function pullAt<T>(indicesToRemove: number[]): (arr: T[]) => Array<T | undefined>;

export function pullAt<T>(arrOrIndicesToRemove: T[] | number[], indicesToRemove?: number[]) {
  if (indicesToRemove == null) {
    return (arr: T[]) => pullAt(arr, arrOrIndicesToRemove as number[]);
  }

  const arr = arrOrIndicesToRemove as T[];
  return pullAtToolkit(arr, indicesToRemove);
}
