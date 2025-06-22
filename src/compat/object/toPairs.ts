import { keys as keysToolkit } from './keys.ts';
import { mapToEntries } from '../_internal/mapToEntries.ts';
import { setToEntries } from '../_internal/setToEntries.ts';

/**
 * Creates an array of key-value pairs from an object.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T>} object - The object to query.
 * @returns {Array<[string, T]>} Returns the array of key-value pairs.
 *
 * @example
 * const object = { a: 1, b: 2 };
 * toPairs(object); // [['a', 1], ['b', 2]]
 */
export function toPairs<T>(object?: Record<string, T> | Record<number, T>): Array<[string, T]>;

/**
 * Creates an array of key-value pairs from an object.
 *
 * @param {object} object - The object to query.
 * @returns {Array<[string, any]>} Returns the array of key-value pairs.
 *
 * @example
 * const object = { a: 1, b: 2 };
 * toPairs(object); // [['a', 1], ['b', 2]]
 */
export function toPairs(object?: object): Array<[string, any]>;

/**
 * Creates an array of key-value pairs from an object, set, or map.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | object} object - The object, set, or map to query.
 * @returns {Array<[string, T]> | Array<[string, any]>} Returns the array of key-value pairs.
 *
 * @example
 * const object = { a: 1, b: 2 };
 * toPairs(object); // [['a', 1], ['b', 2]]
 *
 * const set = new Set([1, 2]);
 * toPairs(set); // [[1, 1], [2, 2]]
 *
 * const map = new Map();
 * map.set('a', 1);
 * map.set('b', 2);
 * toPairs(map); // [['a', 1], ['b', 2]]
 */
export function toPairs<T>(
  object?: Record<string, T> | Record<number, T> | object
): Array<[string, T]> | Array<[string, any]> {
  if (object == null) {
    return [];
  }

  if (object instanceof Set) {
    return setToEntries(object);
  }

  if (object instanceof Map) {
    return mapToEntries(object);
  }

  const keys = keysToolkit(object);
  const result: Array<[key: string, value: any]> = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key as keyof typeof object];

    result[i] = [key, value];
  }

  return result;
}
