import { fill as fillToolkit } from '../../array/fill.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isString } from '../predicate/isString.ts';

/**
 * Fills the whole array with a specified value.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T
 * @param {unknown[] | null | undefined} array - The array to fill.
 * @param {T} value - The value to fill the array with.
 * @returns {T[]} The array with the filled values.
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
export function fill<T>(array: unknown[] | null | undefined, value?: T): T[];
/**
 * Fills the whole array with a specified value.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T
 * @param {ArrayLike<unknown> | null | undefined} array - The array to fill.
 * @param {T} value - The value to fill the array with.
 * @returns {ArrayLike<T>} The array with the filled values.
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
export function fill<T>(array: ArrayLike<unknown> | null | undefined, value?: T): ArrayLike<T>;
/**
 * Fills elements of an array with a specified value from the start position up to, but not including, the end position.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {Array<T | U> | null | undefined} array - The array to fill.
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
export function fill<T, U>(
  array: Array<T | U> | null | undefined,
  value: U,
  start?: number,
  end?: number
): Array<T | U>;
/**
 * Fills elements of an array with a specified value from the start position up to, but not including, the end position.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {ArrayLike<T | U> | null | undefined} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @param {number} [start=0] - The start position. Defaults to 0.
 * @param {number} [end=arr.length] - The end position. Defaults to the array's length.
 * @returns {ArrayLike<T | U>} The array with the filled values.
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
export function fill<T, U>(
  array: ArrayLike<T | U> | null | undefined,
  value: U,
  start?: number,
  end?: number
): ArrayLike<T | U>;
/**
 * Fills elements of an array with a specified value from the start position up to, but not including, the end position.
 *
 * This function mutates the original array and replaces its elements with the provided value, starting from the specified
 * start index up to the end index (non-inclusive). If the start or end indices are not provided, it defaults to filling the
 * entire array.
 *
 * @template T, U
 * @param {ArrayLike<T | U> | null | undefined} array - The array to fill.
 * @param {U} value - The value to fill the array with.
 * @param {number} [start=0] - The start position. Defaults to 0.
 * @param {number} [end=arr.length] - The end position. Defaults to the array's length.
 * @returns {ArrayLike<T | U>} The array with the filled values.
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
export function fill<T, U>(
  array: ArrayLike<T | U> | null | undefined,
  value: U,
  start = 0,
  end = array ? array.length : 0
): ArrayLike<T | U> {
  if (!isArrayLike(array)) {
    return [];
  }
  if (isString(array)) {
    // prevent TypeError: Cannot assign to read only property of string
    return array;
  }
  start = Math.floor(start);
  end = Math.floor(end);

  if (!start) {
    start = 0;
  }
  if (!end) {
    end = 0;
  }

  return fillToolkit(array as any, value, start, end);
}
