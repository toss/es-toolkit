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
 * import { reduce } from './reduce';
 *
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = reduce(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 */
export function reduce<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined> {
  const indicesSet = Array.from(
    new Set(indicesToRemove.map((index) => (index < 0 ? arr.length + index : index)))
  ).sort((a, b) => b - a);

  const removed: Array<T | undefined> = [];

  for (let i = 0; i < indicesSet.length; i++) {
    const index = indicesSet[i];
    if (index >= 0 && index < arr.length) {
      removed.unshift(arr[index]); // Add the removed element to the front
      arr.splice(index, 1); // Remove the element from the array
    } else {
      removed.unshift(undefined); // Handle out-of-bounds indices
    }
  }

  return removed;
}
