import { cloneDeepWith } from './cloneDeepWith.ts';
import { keysIn } from './keysIn.ts';
import { unset } from './unset.ts';
import { getSymbolsIn } from '../_internal/getSymbolsIn.ts';
import { isDeepKey } from '../_internal/isDeepKey.ts';
import { Many } from '../_internal/Many.ts';
import { flatten } from '../array/flatten.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';

/**
 * Creates a new object with specified keys omitted.
 *
 * @template T - The type of object.
 * @template K - The type of keys to omit.
 * @param {T | null | undefined} object - The object to omit keys from.
 * @param {...K} paths - The keys to be omitted from the object.
 * @returns {Pick<T, Exclude<keyof T, K[number]>>} A new object with the specified keys omitted.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, 'a', 'c');
 * // => { b: 2 }
 */
export function omit<T extends object, K extends PropertyKey[]>(
  object: T | null | undefined,
  ...paths: K
): Pick<T, Exclude<keyof T, K[number]>>;

/**
 * Creates a new object with specified keys omitted.
 *
 * @template T - The type of object.
 * @template K - The type of keys to omit.
 * @param {T | null | undefined} object - The object to omit keys from.
 * @param {...Array<Many<K>>} paths - The keys to be omitted from the object.
 * @returns {Omit<T, K>} A new object with the specified keys omitted.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, 'a', ['b', 'c']);
 * // => {}
 */
export function omit<T extends object, K extends keyof T>(
  object: T | null | undefined,
  ...paths: Array<Many<K>>
): Omit<T, K>;

/**
 * Creates a new object with specified keys omitted.
 *
 * @template T - The type of object.
 * @param {T | null | undefined} object - The object to omit keys from.
 * @param {...Array<Many<PropertyKey>>} paths - The keys to be omitted from the object.
 * @returns {Partial<T>} A new object with the specified keys omitted.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, 'a', 'b');
 * // => { c: 3 }
 */
export function omit<T extends object>(object: T | null | undefined, ...paths: Array<Many<PropertyKey>>): Partial<T>;

/**
 * Creates a new object with specified keys omitted.
 *
 * This function takes an object and a variable number of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys. Note that keys can be deep.
 *
 * Deep keys can be specified for keys.
 *
 * @template T - The type of object.
 * @param {T | null | undefined} obj - The object to omit keys from.
 * @param {...Array<Many<PropertyKey>> | Array<Many<PropertyKey[]>>} keysArr - A variable number of keys to be omitted from the object.
 * @returns {Partial<T>} A new object with the specified keys omitted.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, 'a', 'b');
 * // => { c: 3 }
 *
 * omit({ a: { b: 1, c: 2 }, d: 3 }, 'a.b', 'd');
 * // => { a: { c: 2 } }
 */
export function omit<T extends object>(obj: T | null | undefined, ...keysArr: Array<Many<PropertyKey>>): Partial<T> {
  if (obj == null) {
    return {};
  }

  keysArr = flatten(keysArr);
  const isDeep = keysArr.some(key => Array.isArray(key) || isDeepKey(key as PropertyKey));
  const copyKeys = [...keysIn(obj), ...getSymbolsIn(obj)] as Array<keyof T>;
  const result = {} as Partial<T>;
  for (let i = 0; i < copyKeys.length; i++) {
    const key = copyKeys[i];
    if (isDeep) {
      result[key] = cloneDeepWith(obj[key], i => (isPlainObject(i) ? undefined : i));
    } else {
      result[key] = obj[key];
    }
  }

  for (let i = 0; i < keysArr.length; i++) {
    let keys = keysArr[i];

    switch (typeof keys) {
      case 'object': {
        if (!Array.isArray(keys)) {
          keys = Array.from(keys as PropertyKey[]);
        }

        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];

          unset(result, key);
        }

        break;
      }
      case 'string':
      case 'symbol':
      case 'number': {
        unset(result, keys);
        break;
      }
    }
  }

  return result;
}
