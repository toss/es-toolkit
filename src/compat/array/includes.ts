import { isString } from '../predicate/isString.ts';
import { eq } from '../util/eq.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Checks if a specified value exists within a given array-like collection.
 *
 * The comparison uses SameValueZero to check for inclusion.
 *
 * @template T The type of elements in the collection
 * @param collection The array-like collection to search in
 * @param target The value to search for in the collection
 * @param [fromIndex=0] The index to start searching from. If negative, it is treated as an offset from the end
 * @returns `true` if the value is found in the collection, `false` otherwise
 *
 * @example
 * includes([1, 2, 3], 2); // true
 * includes([1, 2, 3], 4); // false
 * includes('hello', 'e'); // true
 * includes(null, 1); // false
 * includes([1, 2, 3], 2, 2); // false
 * includes([1, 2, 3], 2, -2); // true
 */
export function includes<T>(
  collection: Record<string, T> | Record<number, T> | null | undefined,
  target: T,
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
  source: readonly unknown[] | Record<string, any> | string | null | undefined,
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

    if (eq(value, target)) {
      return true;
    }
  }

  return false;
}
