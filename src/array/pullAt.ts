import { at } from './at.ts';
import { uniq } from './uniq.ts';

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
export function pullAt<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined> {
  const removed = at(arr, indicesToRemove);
  const indices = new Set(indicesToRemove.slice().sort((x, y) => y - x));

  for (const index of indices) {
    arr.splice(index, 1);
  }

  return removed;
}
