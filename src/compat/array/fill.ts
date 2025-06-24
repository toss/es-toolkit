import { fill as fillToolkit } from '../../array/fill.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isString } from '../predicate/isString.ts';

/**
 * Fills an array with a value.
 * @template T
 * @param {any[] | null | undefined} array - The array to fill
 * @param {T} value - The value to fill array with
 * @returns {T[]} Returns the filled array
 * @example
 * fill([1, 2, 3], 'a')
 * // => ['a', 'a', 'a']
 */
export function fill<T>(array: any[] | null | undefined, value: T): T[];

/**
 * Fills an array-like object with a value.
 * @template T, U
 * @param {U extends readonly any[] ? never : U | null | undefined} array - The array-like object to fill
 * @param {T} value - The value to fill array with
 * @returns {ArrayLike<T>} Returns the filled array-like object
 * @example
 * fill({ length: 3 }, 2)
 * // => { 0: 2, 1: 2, 2: 2, length: 3 }
 */
export function fill<T, U extends ArrayLike<any>>(
  array: U extends readonly any[] ? never : U | null | undefined,
  value: T
): ArrayLike<T>;

/**
 * Fills an array with a value from start up to end.
 * @template T, U
 * @param {U[] | null | undefined} array - The array to fill
 * @param {T} value - The value to fill array with
 * @param {number} [start=0] - The start position
 * @param {number} [end=array.length] - The end position
 * @returns {Array<T | U>} Returns the filled array
 * @example
 * fill([1, 2, 3], 'a', 1, 2)
 * // => [1, 'a', 3]
 */
export function fill<T, U>(array: U[] | null | undefined, value: T, start?: number, end?: number): Array<T | U>;

/**
 * Fills an array-like object with a value from start up to end.
 * @template T, U
 * @param {U extends readonly any[] ? never : U | null | undefined} array - The array-like object to fill
 * @param {T} value - The value to fill array with
 * @param {number} [start=0] - The start position
 * @param {number} [end=array.length] - The end position
 * @returns {ArrayLike<T | U[0]>} Returns the filled array-like object
 * @example
 * fill({ 0: 1, 1: 2, 2: 3, length: 3 }, 'a', 1, 2)
 * // => { 0: 1, 1: 'a', 2: 3, length: 3 }
 */
export function fill<T, U extends ArrayLike<any>>(
  array: U extends readonly any[] ? never : U | null | undefined,
  value: T,
  start?: number,
  end?: number
): ArrayLike<T | U[0]>;

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
