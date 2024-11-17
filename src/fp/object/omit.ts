import { omit as omitToolkit } from '../../object/omit';

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
 * This function takes an object and an array of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param {K[]} keys - An array of keys to be omitted from the object.
 * @returns {(obj: T) => Omit<T, K>} A function that receive the object to omit keys from as argument and returns a new object with the specified keys omitted.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(obj, ['b', 'c']);
 * // result will be { a: 1 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(keys: readonly K[]): (obj: T) => Omit<T, K>;

export function omit<T extends Record<string, any>, K extends keyof T>(
  objOrKeys: T | readonly K[],
  keys?: readonly K[]
) {
  if (keys == null) {
    return (obj: T) => omit(obj, objOrKeys as readonly K[]);
  }

  const obj = objOrKeys as T;
  return omitToolkit(obj, keys);
}
