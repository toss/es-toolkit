import { isArguments } from './isArguments.ts';
import { isArrayLike } from './isArrayLike.ts';
import { isTypedArray } from './isTypedArray.ts';
import type { EmptyObjectOf } from '../_internal/EmptyObjectOf.ts';
import { isPrototype } from '../_internal/isPrototype.ts';

declare let Buffer:
  | {
      isBuffer: (a: any) => boolean;
    }
  | undefined;

export function isEmpty<T extends { __trapAny: any }>(value?: T): boolean;
export function isEmpty(value: string): value is '';
export function isEmpty(value: Map<any, any> | Set<any> | ArrayLike<any> | null | undefined): boolean;
export function isEmpty(value: object): boolean;
export function isEmpty<T extends object>(value: T | null | undefined): value is EmptyObjectOf<T> | null | undefined;
export function isEmpty(value?: any): boolean;

/**
 * Checks if a given value is empty.
 *
 * - If the given value is a string, checks if it is an empty string.
 * - If the given value is an array, `Map`, or `Set`, checks if its size is 0.
 * - If the given value is an [array-like object](../predicate/isArrayLike.md), checks if its length is 0.
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

    if (isPrototype(value)) {
      return keys.filter(x => x !== 'constructor').length === 0;
    }

    return keys.length === 0;
  }

  return true;
}
