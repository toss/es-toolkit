import { set } from './set';
import { flattenDeep } from '../../array';
import { get } from './get';
import { isNil } from '../index';

/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to pick keys from.
 * @param {keyof T | string | Array<keyof T | string> | Array<Array<keyof T | string>>} keys - An array of keys to be picked from the object. received keysgoes through a flattening process before being used.
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
export function pick<T>(
  obj: T,
  ...keys: Array<
    | keyof T
    | (NonNullable<unknown> & string)
    | Array<keyof T | (NonNullable<unknown> & string)>
    | Array<Array<NonNullable<unknown> & string>>
  >
): Partial<T> {
  if (isNil(obj)) {
    return {};
  }

  const typedObject = obj as Record<string | number, any>;

  const result: Record<string | number | symbol, any> = {};
  const flattenArgs = flattenDeep(keys.map(arg => (typeof arg === 'object' ? Array.from(arg as any) : arg))) as Array<
    keyof typeof typedObject
  >;

  for (const arg of flattenArgs) {
    if (String(arg).includes('.') && arg in typedObject) {
      result[arg] = get(typedObject, arg);
      continue;
    }

    set(result, arg, get(typedObject, arg));
  }

  return result;
}
