/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {[T, ...T[]]} items - The array of elements to search.
 * @returns {T | undefined} - The element with the minimum value, or undefined if the array is empty.
 * @example
 * // Returns 1
 * min([3, 1, 4, 1, 5, 9]);
 *
 * @example
 * // Returns -3
 * min([0, -3, 2, 8, 7]);
 */
export function min<T>(items: readonly [T, ...T[]]): T;

/**
 * Finds the element in an array that has the minimum value.
 * Returns undefined when no arguments are provided.
 * @returns {undefined}
 */
export function min(): undefined;

/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} [items] - The array of elements to search. Defaults to an empty array.
 * @returns {T | undefined} - The element with the minimum value, or undefined if the array is empty.
 */
export function min<T>(items?: readonly T[]): T | undefined;

/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} [items] - The array of elements to search. Defaults to an empty array.
 * @returns {T} - The element with the minimum value.
 */
export function min<T>(items: readonly T[] = []): T {
  let minElement = items[0];
  let min: any = undefined;

  for (const element of items) {
    if (min == null || element < min) {
      min = element;
      minElement = element;
    }
  }

  return minElement;
}
