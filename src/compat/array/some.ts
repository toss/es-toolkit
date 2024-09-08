import { identity } from '../_internal/identity.ts';
import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Checks if there is an element in an array that is truthy.
 *
 * @param {T[]} arr The array to iterate over.
 * @returns {boolean} Returns `true` if any element is truthy, else `false`.
 *
 * @example
 * some([1, 2, 3, 4]);
 * // => true
 */
export function some<T>(arr: readonly T[]): boolean;

/**
 * Checks if there is an element in an array that matches the given predicate function.
 *
 * @param {T[]} arr The array to iterate over.
 * @param {(item: T, index: number, arr: any) => unknown} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some([1, 2, 3, 4], n => n % 2 === 0);
 * // => true
 */
export function some<T>(arr: readonly T[], predicate: (item: T, index: number, arr: any) => unknown): boolean;

/**
 * Checks if there is an element in an array that matches the given key-value pair.
 *
 * @param {T[]} arr The array to iterate over.
 * @param {[keyof T, unknown]} predicate The key-value pair to match.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => true
 */
export function some<T>(arr: readonly T[], predicate: [keyof T, unknown]): boolean;

/**
 * Checks if there is an element in an array that has a truthy value for the given property name.
 *
 * @param {T[]} arr The array to iterate over.
 * @param {string} propertyToCheck The property name to check.
 * @returns {boolean} Returns `true` if any element has a truthy value for the property, else `false`.
 *
 * @example
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
 * // => true
 */
export function some<T>(arr: readonly T[], propertyToCheck: string): boolean;

/**
 * Checks if there is an element in an array that matches the given partial object.
 *
 * @param {T[]} arr The array to iterate over.
 * @param {Partial<T>} doesMatch The partial object to match.
 * @returns {boolean} Returns `true` if any element matches the partial object, else `false`.
 *
 * @example
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
 * // => true
 */
export function some<T>(arr: readonly T[], doesMatch: Partial<T>): boolean;

/**
 * Checks if there is an element in an array that matches the given predicate.
 *
 * Iteration is stopped once there is an element that matches `predicate`.
 *
 * @param {T[]} arr The array to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string} [predicate=identity] The function invoked per iteration.
 * If a property name or an object is provided it will be used to create a predicate function.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some([1, 2, 3, 4], n => n % 2 === 0);
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
 * // => true
 */
export function some<T>(
  arr: readonly T[] | null | undefined,
  predicate?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string,
  guard?: unknown
): boolean;

/**
 * Checks if there is an element in an array that matches the given predicate.
 *
 * Iteration is stopped once there is an element that matches `predicate`.
 *
 * @param {T[]} arr The array to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string} [predicate=identity] The function invoked per iteration.
 * If a property name or an object is provided it will be used to create a predicate function.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some([1, 2, 3, 4], n => n % 2 === 0);
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
 * // => true
 */
export function some<T>(
  arr: readonly T[] | null | undefined,
  predicate?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string,
  guard?: unknown
): boolean {
  if (guard != null) {
    predicate = undefined;
  }

  if (!predicate) {
    predicate = identity;
  }

  if (!Array.isArray(arr)) {
    return false;
  }

  switch (typeof predicate) {
    case 'function': {
      return arr.some(predicate);
    }
    case 'object': {
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];

        return arr.some(matchesProperty(key, value));
      } else {
        return arr.some(matches(predicate));
      }
    }
    case 'string': {
      return arr.some(property(predicate));
    }
  }
}
