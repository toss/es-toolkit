import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Joins elements of an array into a string.
 *
 * @param {ArrayLike<any> | null | undefined} array - The array to join.
 * @param {string} [separator=','] - The separator used to join the elements, default is common separator `,`.
 * @returns {string} - Returns a string containing all elements of the array joined by the specified separator.
 *
 * @example
 * const arr = ["a", "b", "c"];
 * const result = join(arr, "~");
 * console.log(result); // Output: "a~b~c"
 */
export function join(array: ArrayLike<any> | null | undefined, separator?: string): string {
  if (!isArrayLike(array)) {
    return '';
  }
  return Array.from(array).join(separator);
}
