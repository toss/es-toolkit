import { keysIn as keysInToolkit } from './keysIn.ts';
import { mapToEntries } from '../_internal/mapToEntries.ts';
import { setToEntries } from '../_internal/setToEntries.ts';

/**
 * Creates an array of string keyed-value pairs from an object, including inherited properties.
 *
 * @param {Record<string | number, T>} object The object to query.
 * @returns {Array<[key: string, value: T]>} Returns the array of property pairs.
 * @example
 * const object = { a: 1, b: 2 };
 * toPairsIn(object); // [['a', 1], ['b', 2]]
 */
export function toPairsIn<T>(object: Record<string | number, T>): Array<[key: string, value: T]>;

/**
 * Creates an array of value pairs from a set.
 *
 * @param {Set<T>} set The set to query.
 * @returns {Array<[key: T, value: T]>} Returns the array of value pairs.
 * @example
 * const set = new Set([1, 2]);
 * toPairsIn(set); // [[1, 1], [2, 2]]
 */
export function toPairsIn<T>(set: Set<T>): Array<[key: T, value: T]>;

/**
 * Creates an array of key-value pairs from a map.
 *
 * @param {Map<K, V>} map The map to query.
 * @returns {Array<[key: K, value: V]>} Returns the array of key-value pairs.
 * @example
 * const map = new Map();
 * map.set('a', 1);
 * map.set('b', 2);
 * toPairsIn(map); // [['a', 1], ['b', 2]]
 */
export function toPairsIn<K, V>(map: Map<K, V>): Array<[key: K, value: V]>;

/**
 * Creates an array of key-value pairs from an object, set, or map, including inherited properties.
 *
 * @param {Record<any, any> | Set<any> | Map<any, any>} object The object, set, or map to query.
 * @returns {Array<[key: PropertyKey, value: any]>} Returns the array of key-value pairs.
 * @example
 * const object = { a: 1, b: 2 };
 * toPairsIn(object); // [['a', 1], ['b', 2]]
 *
 * const set = new Set([1, 2]);
 * toPairsIn(set); // [[1, 1], [2, 2]]
 *
 * const map = new Map();
 * map.set('a', 1);
 * map.set('b', 2);
 * toPairsIn(map); // [['a', 1], ['b', 2]]
 */
export function toPairsIn(object: Record<any, any> | Set<any> | Map<any, any>): Array<[key: PropertyKey, value: any]> {
  if (object instanceof Set) {
    return setToEntries(object);
  }

  if (object instanceof Map) {
    return mapToEntries(object);
  }

  const keys = keysInToolkit(object);
  const result: Array<[key: string, value: any]> = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];

    result[i] = [key, value];
  }

  return result;
}
