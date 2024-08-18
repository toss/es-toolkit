/**
 * Concatenates the elements of the array into a string separated by a specified separator string.
 * If no separator is specified, a comma (',') is used as the default separator.
 *
 * This function takes an array of elements and concatenates them into a single string,
 * separated by the specified separator. If the array is empty, it returns an empty string.
 *
 * @template T - The type of elements in the array. Each element should be able to convert to a string.
 * @param {T[]} array - The array of elements to join into a string.
 * @param {string} [separator=','] - The string to use as a separator between each element in the resulting string.
 * If not specified, ',' is used as the default separator.
 * @returns {string} A string containing all the elements of the array separated by the separator.
 *
 * @example
 * const words = ['Hello', 'world'];
 * const greeting = join(words); // Uses default separator
 * // greeting will be 'Hello,world'
 *
 * const numbers = [1, 2, 3];
 * const numberString = join(numbers); // Uses default separator
 * // numberString will be '1,2,3'
 *
 * const emptyArray = [];
 * const emptyResult = join(emptyArray); // Uses default separator
 * // emptyResult will be ''
 *
 * const customSeparatorArray = ['apple', 'banana', 'cherry'];
 * const text = join(customSeparatorArray, ' - ');
 * // text will be 'apple - banana - cherry'
 */
export function join<T>(array: readonly T[], separator = ','): string {
  return array.join(separator);
}
