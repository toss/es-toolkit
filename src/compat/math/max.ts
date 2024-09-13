/**
 * Finds the element in an array that has the maximum value.
 *
 * @param {[T, ...T[]]} items - The array of elements to search.
 * @returns {T | undefined} - The element with the maximum value, or undefined if the array is empty.
 * @example
 * // Returns 9
 * max([3, 1, 4, 1, 5, 9]);
 *
 * @example
 * // Returns 8
 * max([0, -3, 2, 8, 7]);
 */
export function max<T>(items: readonly [T, ...T[]]): T;
/**
 * Finds the element in an array that has the maximum value.
 * Returns undefined when no arguments are provided.
 * @returns {undefined}
 */
export function max(): undefined;
/**
 * Finds the element in an array that has the maximum value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} [items] - The array of elements to search. Defaults to an empty array.
 * @returns {T | undefined} - The element with the maximum value, or undefined if the array is empty.
 */
export function max<T>(items?: readonly T[]): T | undefined;
/**
 * Finds the element in an array that has the maximum value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} [items] - The array of elements to search. Defaults to an empty array.
 * @returns {T | undefined} - The element with the maximum value, or undefined if the array is empty.
 */
export function max<T>(items: readonly T[] = []): T | undefined {
  let maxElement = items[0];
  let max: any = undefined;

  for (const element of items) {
    if (max == null || element > max) {
      max = element;
      maxElement = element;
    }
  }

  return maxElement;
}
