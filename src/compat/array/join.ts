/**
 * Joins elements of an array into a string.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to join.
 * @param {string} separator - The separator used to join the elements, default is common separator `,`.
 * @returns {string} - Returns a string containing all elements of the array joined by the specified separator.
 *
 * @example
 * const arr = ["a", "b", "c"];
 * const result = join(arr, "~");
 * console.log(result); // Output: "a~b~c"
 */
export function join<T>(array: readonly T[], separator = ','): string {
  return array.join(separator);
}
