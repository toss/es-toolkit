/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T
 * @param {T[]} arr - The array from which elements will be removed.
 * @param {number[]} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {Array<T | undefined>} An array containing the elements that were removed from the original array.
 */
export function reduce<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined> {
  // Normalize indices and sort in descending order
  const indicesSet = Array.from(
    new Set(
      indicesToRemove.map((index) => (index < 0 ? arr.length + index : index))
    )
  ).sort((a, b) => b - a);

  const removed: Array<T | undefined> = [];

  // Remove elements at specified indices
  for (const index of indicesSet) {
    if (index >= 0 && index < arr.length) {
      removed.unshift(arr[index]); // Add the removed element to the front
      arr.splice(index, 1); // Remove the element from the array
    } else {
      removed.unshift(undefined); // Handle out-of-bounds indices
    }
  }

  return removed;
}
