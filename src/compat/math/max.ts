/**
 * Finds the element in an array that has the maximum value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @returns {T} The element with the maximum value.
 * @example
 * // Returns 9
 * max([3, 1, 4, 1, 5, 9])
 *
 * @example
 * // Returns 8
 * max([0, -3, 2, 8, 7])
 */
export function max<T>(items: readonly T[] = []): T {
  let maxElement = items[0];
  let max = undefined;

  for (const element of items) {
    if (max == null || element > max) {
      max = element;
      maxElement = element;
    }
  }

  return maxElement;
}
