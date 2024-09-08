/**
 * Casts value as an array if it's not one.
 *
 * @template T The type of elements in the array.
 * @param {unknown} value The value to be cast to an array.
 * @returns {T[]} An array containing the input value if it wasn't an array, or the original array if it was.
 *
 * @example
 * const arr = castArray(1); // [1]
 * // Returns: [1]
 *
 * const arr = castArray([1]);
 * // Returns: [1]
 *
 * const arr = castArray({'a': 1});
 * // Returns: [{'a': 1}]
 *
 * const arr =  castArray(null);
 * // Returns: [null]
 *
 * const arr = castArray(undefined); // [undefined]
 * // Returns: [undefined]
 *
 * const arr = castArray();
 * // Returns: []
 */

export function castArray<T>(value?: unknown): T[] {
  if (typeof value === 'undefined') {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}
