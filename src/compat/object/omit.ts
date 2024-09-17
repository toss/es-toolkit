import { cloneDeep } from '../../object/cloneDeep.ts';
import { unset } from './unset.ts';

/**
 * Creates a new object with specified keys omitted.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param {T} obj - The object to omit keys from.
 * @param {K[]} keys - An array of keys to be omitted from the object.
 * @returns {Omit<T, K>} A new object with the specified keys omitted.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(obj, ['b', 'c']);
 * // result will be { a: 1 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K>;

/**
 * Creates a new object with specified keys omitted.
 *
 * This function takes an object and a variable number of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys.
 *
 * Deep keys can be specified for keys.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to omit keys from.
 * @param {...(PropertyKey | PropertyKey[] | PropertyKey[][]} keys - A variable number of keys to be omitted from the object.
 * @returns {Partial<T>} A new object with the specified keys omitted.
 */
export function omit<
  // eslint-disable-next-line
  T extends {},
>(
  obj: T | null | undefined,
  ...keys: Array<PropertyKey | readonly PropertyKey[] | ReadonlyArray<readonly PropertyKey[]>>
): Partial<T>;

/**
 * Creates a new object with specified keys omitted.
 *
 * This function takes an object and a variable number of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys. Note that keys can be deep.
 *
 * Deep keys can be specified for keys.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to omit keys from.
 * @param {...(PropertyKey | PropertyKey[] | PropertyKey[][])} keysArr - A variable number of keys to be omitted from the object.
 * @returns {Partial<T>} A new object with the specified keys omitted.
 */
export function omit<
  // eslint-disable-next-line
  T extends {},
>(
  obj: T | null | undefined,
  ...keysArr: Array<PropertyKey | readonly PropertyKey[] | ReadonlyArray<readonly PropertyKey[]>>
): Partial<T> {
  if (obj == null) {
    return {};
  }

  const result = cloneDeep(obj);

  for (let i = 0; i < keysArr.length; i++) {
    let keys = keysArr[i];

    switch (typeof keys) {
      case 'object': {
        if (!Array.isArray(keys)) {
          // eslint-disable-next-line
          // @ts-ignore
          keys = Array.from(keys) as PropertyKey[];
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
