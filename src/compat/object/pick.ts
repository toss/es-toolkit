import { get } from './get.ts';
import { has } from './has.ts';
import { set } from './set.ts';
import { Many } from '../_internal/Many.ts';
import { PropertyPath } from '../_internal/PropertyPath.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isNil } from '../predicate/isNil.ts';

/**
 * Creates a new object composed of the picked object properties.
 *
 * @template T - The type of object.
 * @template U - The type of keys to pick.
 * @param {T} object - The object to pick keys from.
 * @param {...Array<Many<U>>} props - An array of keys to be picked from the object.
 * @returns {Pick<T, U>} A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T extends object, U extends keyof T>(object: T, ...props: Array<Many<U>>): Pick<T, U>;

/**
 * Creates a new object composed of the picked object properties.
 *
 * @template T - The type of object.
 * @param {T | null | undefined} object - The object to pick keys from.
 * @param {...Array<Many<PropertyPath>>} props - An array of keys to be picked from the object.
 * @returns {Partial<T>} A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T>(object: T | null | undefined, ...props: Array<Many<PropertyPath>>): Partial<T>;

/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @template U - The type of keys to pick.
 * @param {T | any | null | undefined} object - The object to pick keys from.
 * @param {...Array<Many<U>> | Array<Many<PropertyPath>>} props - An array of keys to be picked from the object. received keys goes through a flattening process before being used.
 * @returns {Pick<T, U> | Partial<T>} A new object with the specified keys picked.
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
export function pick<T extends object, U extends keyof T>(
  obj: T | any | null | undefined,
  ...keysArr: Array<Many<U>> | Array<Many<PropertyPath>>
): Pick<T, U> | Partial<T> {
  if (isNil(obj)) {
    return {};
  }

  const result: any = {};

  for (let i = 0; i < keysArr.length; i++) {
    let keys = keysArr[i];
    switch (typeof keys) {
      case 'object': {
        if (!Array.isArray(keys)) {
          if (isArrayLike(keys)) {
            // eslint-disable-next-line
            // @ts-ignore
            keys = Array.from(keys) as PropertyKey[];
          } else {
            keys = [keys];
          }
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

      if (value === undefined && !has(obj, key)) {
        continue;
      }

      if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = value;
      } else {
        set(result, key, value);
      }
    }
  }

  return result;
}
