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
    const indicesSet = new Set(indicesToRemove.slice().sort((x, y) => y - x));

    // Use reduce to construct the array of removed elements while modifying the input array
    const removed = Array.from(indicesSet).reduce<Array<T | undefined>>((acc, index) => {
      if (index >= 0 && index < arr.length) {
        acc.push(arr[index]); // Push the element to the removed array
        arr.splice(index, 1); // Remove the element from the original array
      }
      return acc;
    }, []);

    return removed;
  }
