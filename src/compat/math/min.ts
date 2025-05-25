/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {[T, ...T[]]} items - The array of elements to search.
 * @returns {T} - The element with the minimum value.
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
 *
 * @returns {undefined} - Returns `undefined` when the function is called with no arguments.
 */
export function min(): undefined;

/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} [items] - The array of elements to search.
 * @returns {T | undefined} - The element with the minimum value, or `undefined` if the array is empty, `null`, or `undefined`.
 */
export function min<T>(items?: ArrayLike<T> | null | undefined): T | undefined;

/**
 * Finds the element in an array that has the minimum value.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} [items] - The array of elements to search. Defaults to an empty array.
 * @returns {T | undefined} - The element with the minimum value, or undefined if the array is empty.
 */
export function min<T>(items?: ArrayLike<T> | null | undefined): T | undefined {
  if (!items || items.length === 0) {
    return undefined;
  }

  let minResult: T | undefined = undefined;

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    if (current == null || Number.isNaN(current) || typeof current === 'symbol') {
      continue;
    }

    if (minResult === undefined || current < (minResult as T)) {
      minResult = current;
    }
  }

  return minResult;
}
