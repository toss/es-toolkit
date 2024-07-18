/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items The array of elements to search.
 * @returns {T} The element with the minimum value.
 * @example
 * // Returns 1
 * min([3, 1, 4, 1, 5, 9])
 *
 * @example
 * // Returns -3
 * min([0, -3, 2, 8, 7])
 */
export function min<T>(items: readonly T[] = []): T {
  let minElement = items[0];
  let min = undefined;

  for (const element of items) {
    if (min == null || element < min) {
      min = element;
      minElement = element;
    }
  }

  return minElement;
}