import { pick as pickToolkit } from '../../object/pick';

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
 * @template K - The type of keys in object.
 * @param {K[]} keys - An array of keys to be picked from the object.
 * @returns {(obj: T) => Pick<T, K>} A function that receive the object to pick keys from as argument and returns a new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(['a', 'c'])(obj);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(keys: readonly K[]): (obj: T) => Pick<T, K>;

export function pick<T extends Record<string, any>, K extends keyof T>(
  objOrKeys: T | readonly K[],
  keys?: readonly K[]
) {
  if (keys == null) {
    return (obj: T) => pick(obj, objOrKeys as readonly K[]);
  }

  const obj = objOrKeys as T;
  return pickToolkit(obj, keys);
}
