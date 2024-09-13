/**
 * Fills the whole array with a specified value.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {Array<T | U>} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @returns {Array<T | U>} The array with the filled values.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = fill(array, 'a');
 * // => ['a', 'a', 'a']
 *
 * const result = fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * const result = fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 *
 * const result = fill(array, '*', -2, -1);
 * // => [1, '*', 3]
 */
export function fill<T>(array: unknown[], value: T): T[];
/**
 * Fills elements of an array with a specified value from the start position up to the end of the array.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {Array<T | U>} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @param {number} [start=0] - The start position. Defaults to 0.
 * @returns {Array<T | U>} The array with the filled values.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = fill(array, 'a');
 * // => ['a', 'a', 'a']
 *
 * const result = fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * const result = fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 *
 * const result = fill(array, '*', -2, -1);
 * // => [1, '*', 3]
 */
export function fill<T, U>(array: Array<T | U>, value: U, start: number): Array<T | U>;
/**
 * Fills elements of an array with a specified value from the start position up to, but not including, the end position.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {Array<T | U>} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @param {number} [start=0] - The start position. Defaults to 0.
 * @param {number} [end=arr.length] - The end position. Defaults to the array's length.
 * @returns {Array<T | U>} The array with the filled values.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = fill(array, 'a');
 * // => ['a', 'a', 'a']
 *
 * const result = fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * const result = fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 *
 * const result = fill(array, '*', -2, -1);
 * // => [1, '*', 3]
 */
export function fill<T, U>(array: Array<T | U>, value: U, start: number, end: number): Array<T | U>;
/**
 * Fills elements of an array with a specified value from the start position up to, but not including, the end position.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {Array<T | U>} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @param {number} [start=0] - The start position. Defaults to 0.
 * @param {number} [end=arr.length] - The end position. Defaults to the array's length.
 * @returns {Array<T | U>} The array with the filled values.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = fill(array, 'a');
 * // => ['a', 'a', 'a']
 *
 * const result = fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * const result = fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 *
 * const result = fill(array, '*', -2, -1);
 * // => [1, '*', 3]
 */
export function fill<T, U>(array: Array<T | U>, value: U, start = 0, end = array.length): Array<T | U> {
  const length = array.length;
  const finalStart = Math.max(start >= 0 ? start : length + start, 0);
  const finalEnd = Math.min(end >= 0 ? end : length + end, length);

  for (let i = finalStart; i < finalEnd; i++) {
    array[i] = value;
  }

  return array;
}
