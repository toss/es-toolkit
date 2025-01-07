/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which elements will be removed.
 * @param {number[]} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {Array<T | undefined>} An array containing the elements that were removed from the original array.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const removed = reduce(array, [0, -1]);
 * // removed will be [1, 5]
 * // array will be [2, 3, 4]
 */
export function reduce<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined> {
  const normalizedIndices = Array.from(
    new Set(indicesToRemove.map(index => (index < 0 ? arr.length + index : index)))
  ).sort((a, b) => b - a);

  const removed: Array<T | undefined> = [];

  for (let i = 0; i < normalizedIndices.length; i++) {
    const index = normalizedIndices[i];
    if (index >= 0 && index < arr.length) {
      removed.unshift(arr[index]);
      arr.splice(index, 1);
    } else {
      removed.unshift(undefined);
    }
  }

  return removed;
}
