import { isString } from '../predicate/isString.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Checks if an item is included in an array.
 *
 * @param {T[]} arr - The array to search in.
 * @param {T} item - The item to search for.
 * @param {number} [fromIndex=0] - The index to start searching from. If negative, it is treated as an offset from the end of the array.
 * @returns {boolean} `true` if the item is found in the array, `false` otherwise.
 *
 * @example
 * includes([1, 2, 3], 2); // true
 * includes([1, 2, 3], 4); // false
 * includes([1, 2, 3], 3, -1); // true
 */
export function includes<T>(arr: readonly T[], item: T, fromIndex?: number): boolean;

/**
 * Checks if a value is included in an object.
 *
 * @param {T} obj - The object to search in.
 * @param {T[keyof T]} value - The value to search for.
 * @param {number} [fromIndex=0] - The index to start searching from. If negative, it is treated as an offset from the end of the array.
 * @returns {boolean} `true` if the value is found in the object, `false` otherwise.
 *
 * @example
 * includes({ a: 1, b: 'a', c: NaN }, 1); // true
 * includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
 * includes({ a: 1, b: 'a', c: NaN }, NaN); // true
 * includes({ [Symbol('sym1')]: 1 }, 1); // false
 */
export function includes<T extends Record<string, any>>(obj: T, value: T[keyof T], fromIndex?: number): boolean;

/**
 * Checks if a substring is included in a string.
 *
 * @param {string} str - The string to search in.
 * @param {string} substr - The substring to search for.
 * @param {number} [fromIndex=0] - The index to start searching from. If negative, it is treated as an offset from the end of the string.
 * @returns {boolean} `true` if the substring is found in the string, `false` otherwise.
 *
 * @example
 * includes('hello world', 'world'); // true
 * includes('hello world', 'test'); // false
 * includes('hello world', 'o', 5); // true
 */
export function includes(str: string, substr: string, fromIndex?: number): boolean;

/**
 * Checks if a specified value exists within a given source, which can be an array, an object, or a string.
 *
 * The comparison uses SameValueZero to check for inclusion.
 *
 * @param {T[] | Record<string, any> | string} source - The source to search in. It can be an array, an object, or a string.
 * @param {T} [target] - The value to search for in the source.
 * @param {number} [fromIndex=0] - The index to start searching from. If negative, it is treated as an offset from the end of the source.
 * @returns {boolean} `true` if the value is found in the source, `false` otherwise.
 *
 * @example
 * includes([1, 2, 3], 2); // true
 * includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
 * includes('hello world', 'world'); // true
 * includes('hello world', 'test'); // false
 */
export function includes<T>(
  source: readonly T[] | Record<string, any> | string,
  target?: T,
  fromIndex?: number
): boolean;

/**
 * Checks if a specified value exists within a given source, which can be an array, an object, or a string.
 *
 * The comparison uses SameValueZero to check for inclusion.
 *
 * @param {T[] | Record<string, any> | string} source - The source to search in. It can be an array, an object, or a string.
 * @param {T} [target] - The value to search for in the source.
 * @param {number} [fromIndex=0] - The index to start searching from. If negative, it is treated as an offset from the end of the source.
 * @returns {boolean} `true` if the value is found in the source, `false` otherwise.
 *
 * @example
 * includes([1, 2, 3], 2); // true
 * includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
 * includes('hello world', 'world'); // true
 * includes('hello world', 'test'); // false
 */
export function includes(
  source: readonly unknown[] | Record<string, any> | string,
  target?: unknown,
  fromIndex?: number,
  guard?: unknown
): boolean {
  if (source == null) {
    return false;
  }

  if (guard || !fromIndex) {
    fromIndex = 0;
  } else {
    fromIndex = toInteger(fromIndex);
  }

  if (isString(source)) {
    if (fromIndex > source.length || target instanceof RegExp) {
      return false;
    }

    if (fromIndex < 0) {
      fromIndex = Math.max(0, source.length + fromIndex);
    }

    return source.includes(target as any, fromIndex);
  }

  if (Array.isArray(source)) {
    return source.includes(target, fromIndex);
  }

  const keys = Object.keys(source);

  if (fromIndex < 0) {
    fromIndex = Math.max(0, keys.length + fromIndex);
  }

  for (let i = fromIndex; i < keys.length; i++) {
    const value = Reflect.get(source, keys[i]);

    // This condition is the SameValueZero comparison.
    if (value === target || (Number.isNaN(value) && Number.isNaN(target))) {
      return true;
    }
  }

  return false;
}
