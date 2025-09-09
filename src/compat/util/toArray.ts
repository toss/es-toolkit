import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isMap } from '../predicate/isMap.ts';

/**
 * Converts a record or null/undefined to an array of its values.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | null | undefined} value - The record or null/undefined to convert.
 * @returns {T[]} Returns an array of the record's values or an empty array if null/undefined.
 *
 * @example
 * toArray({ 'a': 1, 'b': 2 }) // => returns [1, 2]
 * toArray(null) // => returns []
 */
export function toArray<T>(value: Record<string, T> | Record<number, T> | null | undefined): T[];

/**
 * Converts a value to an array of its values.
 *
 * @template T
 * @param {T} value - The value to convert.
 * @returns {Array<T[keyof T]>} Returns an array of the value's values.
 *
 * @example
 * toArray({ x: 10, y: 20 }) // => returns [10, 20]
 * toArray('abc') // => returns ['a', 'b', 'c']
 */
export function toArray<T>(value: T): Array<T[keyof T]>;

/**
 * Converts an undefined value to an empty array.
 *
 * @returns {any[]} Returns an empty array.
 *
 * @example
 * toArray() // => returns []
 */
export function toArray(): any[];

/**
 * Converts a value to an array.
 *
 * @param {unknown} value - The value to convert.
 * @returns {any[]} Returns the converted array.
 *
 * @example
 * toArray({ 'a': 1, 'b': 2 }) // => returns [1,2]
 * toArray('abc') // => returns ['a', 'b', 'c']
 * toArray(1) // => returns []
 * toArray(null) // => returns []
 */
export function toArray(value?: unknown): any[] {
  if (value == null) {
    return [];
  }

  if (isArrayLike(value) || isMap(value)) {
    return Array.from(value);
  }

  if (typeof value === 'object') {
    return Object.values(value);
  }

  return [];
}
