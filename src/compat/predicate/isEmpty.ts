import { isArguments } from './isArguments.ts';
import { isArrayLike } from './isArrayLike.ts';
import { isTypedArray } from './isTypedArray.ts';
import { getSymbols } from '../_internal/getSymbols.ts';
import { isPrototype } from '../_internal/isPrototype.ts';

declare let Buffer:
  | {
      isBuffer: (a: any) => boolean;
    }
  | undefined;

/**
 * Checks if a given value is empty.
 *
 * @returns {true} Always returns true when no arguments are provided.
 *
 * @example
 * isEmpty(); // true
 */
export function isEmpty(): true;

/**
 * Checks if a given string is empty.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} `true` if the string is empty, `false` otherwise.
 *
 * @example
 * isEmpty(""); // true
 * isEmpty("hello"); // false
 */
export function isEmpty(value: string): value is '';

/**
 * Checks if a given Map is empty.
 *
 * @param {Map<any, any>} value - The Map to check.
 * @returns {boolean} `true` if the Map is empty, `false` otherwise.
 *
 * @example
 * isEmpty(new Map()); // true
 * isEmpty(new Map([["key", "value"]])); // false
 */
export function isEmpty(value: Map<any, any>): boolean;

/**
 * Checks if a given Set is empty.
 *
 * @param {Set<any>} value - The Set to check.
 * @returns {boolean} `true` if the Set is empty, `false` otherwise.
 *
 * @example
 * isEmpty(new Set()); // true
 * isEmpty(new Set([1, 2, 3])); // false
 */
export function isEmpty(value: Set<any>): boolean;

/**
 * Checks if a given array is empty.
 *
 * @param {Array<any>} value - The array to check.
 * @returns {boolean} `true` if the array is empty, `false` otherwise.
 *
 * @example
 * isEmpty([]); // true
 * isEmpty([1, 2, 3]); // false
 */
export function isEmpty(value: Array<any>): value is [];

/**
 * Checks if a given object is empty.
 *
 * @param {T | null | undefined} value - The object to check.
 * @returns {boolean} `true` if the object is empty, `false` otherwise.
 *
 * @example
 * isEmpty({}); // true
 * isEmpty({ a: 1 }); // false
 */
export function isEmpty<T extends Record<any, any>>(
  value: T | null | undefined
): value is Record<keyof T, never> | null | undefined;

/**
 * Checks if a given value is empty.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is empty, `false` otherwise.
 *
 * @example
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(42); // true
 */
export function isEmpty(value: unknown): boolean;

/**
 * Checks if a given value is empty.
 *
 * - If the given value is a string, checks if it is an empty string.
 * - If the given value is an array, `Map`, or `Set`, checks if its size is 0.
 * - If the given value is an [array-like object](../compat/predicate/isArrayLike.md), checks if its length is 0.
 * - If the given value is an object, checks if it is an empty object with no properties.
 * - Primitive values (strings, booleans, numbers, or bigints) are considered empty.
 *
 * @param {unknown} [value] - The value to check.
 * @returns {boolean} `true` if the value is empty, `false` otherwise.
 *
 * @example
 * isEmpty(); // true
 * isEmpty(null); // true
 * isEmpty(""); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty(new Map()); // true
 * isEmpty(new Set()); // true
 * isEmpty("hello"); // false
 * isEmpty([1, 2, 3]); // false
 * isEmpty({ a: 1 }); // false
 * isEmpty(new Map([["key", "value"]])); // false
 * isEmpty(new Set([1, 2, 3])); // false
 */
export function isEmpty(value?: unknown): boolean {
  if (value == null) {
    return true;
  }

  // Objects like { "length": 0 } are not empty in lodash
  if (isArrayLike(value)) {
    if (
      typeof (value as any).splice !== 'function' &&
      typeof value !== 'string' &&
      (typeof Buffer === 'undefined' || !Buffer.isBuffer(value)) &&
      !isTypedArray(value) &&
      !isArguments(value)
    ) {
      return false;
    }

    return value.length === 0;
  }

  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }

    const keys = Object.keys(value);
    const symbols = getSymbols(value);

    if (isPrototype(value)) {
      return keys.filter(x => x !== 'constructor').length === 0 && symbols.length === 0;
    }

    return keys.length === 0 && symbols.length === 0;
  }

  return true;
}
