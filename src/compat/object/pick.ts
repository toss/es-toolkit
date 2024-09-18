import { isNil } from '../predicate/isNil.ts';
import { get } from './get.ts';
import { set } from './set.ts';

/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param {T} obj - The object to pick keys from.
 * @param {K[]} keys - An array of keys to be picked from the object.
 * @returns {Pick<T, K>} A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>;

/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @param {T | null | undefined} obj - The object to pick keys from.
 * @param {...any} keys
 * @param {PropertyKey | PropertyKey[] | ProperyKey[][]}} keys - An array of keys to be picked from the object. received keysgoes through a flattening process before being used.
 * @returns {Partial<T, K>} A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 *
 * // each path can be passed individually as an argument
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, 'a', 'c');
 *
 * // pick a key over a path
 * const obj = { 'a.b': 1, a: { b: 2 } };
 * const result = pick(obj, 'a.b');
 * // result will be { 'a.b': 1 }
 */
export function pick<
  // eslint-disable-next-line
  T extends {},
>(
  obj: T | null | undefined,
  ...keys: Array<PropertyKey | readonly PropertyKey[] | ReadonlyArray<readonly PropertyKey[]>>
): Partial<T>;

/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @param {T | null | undefined} obj - The object to pick keys from.
 * @param {...any} keysArr - An array of keys to be picked from the object. received keysgoes through a flattening process before being used.
 * @param {PropertyKey | PropertyKey[] | ProperyKey[][]}} keys - An array of keys to be picked from the object. received keysgoes through a flattening process before being used.
 * @returns {Partial<T, K>} A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 *
 * // each path can be passed individually as an argument
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, 'a', 'c');
 *
 * // pick a key over a path
 * const obj = { 'a.b': 1, a: { b: 2 } };
 * const result = pick(obj, 'a.b');
 * // result will be { 'a.b': 1 }
 */
export function pick<
  // eslint-disable-next-line
  T extends {},
>(
  obj: T | null | undefined,
  ...keysArr: Array<PropertyKey | readonly PropertyKey[] | ReadonlyArray<readonly PropertyKey[]>>
): Partial<T> {
  if (isNil(obj)) {
    return {};
  }

  const result: any = {};

  for (let keys of keysArr) {
    switch (typeof keys) {
      case 'object': {
        if (!Array.isArray(keys)) {
          // eslint-disable-next-line
          // @ts-ignore
          keys = Array.from(keys) as PropertyKey[];
        }
        break;
      }
      case 'string':
      case 'symbol':
      case 'number': {
        keys = [keys];
        break;
      }
    }

    for (const key of keys) {
      const value = get(obj, key);

      if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = value;
      } else {
        set(result, key, value);
      }
    }
  }

  return result;
}
