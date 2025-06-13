import { at } from './at.ts';

/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * This function retrieves elements at the specified indices using the `at` function (which supports
 * negative indices), but only removes elements at valid positive indices (0 <= index < array.length)
 * from the original array.
 *
 * @template T
 * @param {T[]} arr - The array from which elements will be removed.
 * @param {number[]} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {Array<T | undefined>} An array containing the elements that were retrieved at the specified indices.
 *   Returns `undefined` for indices that are out of bounds.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = pullAt(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 *
 * @example
 * // Handling negative indices and out-of-bounds indices
 * const numbers = [10, 20, 30, 40];
 * const removed = pullAt(numbers, [1, -1, 5]);
 * console.log(removed); // [20, 40, undefined]
 * console.log(numbers); // [10, 30] (only valid indices affect the array)
 */
export function pullAt<T>(arr: T[], indicesToRemove: number[]): T[] {
  const removed = at(arr, indicesToRemove);

  const validIndices = indicesToRemove.filter(index => index >= 0 && index < arr.length).sort((x, y) => y - x);

  for (const index of new Set(validIndices)) {
    arr.splice(index, 1);
  }

  return removed;
}
