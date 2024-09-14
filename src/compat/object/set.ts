import { isIndex } from '../_internal/isIndex.ts';
import { toPath } from '../util/toPath.ts';

/**
 * Sets the value at the specified path of the given object. If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | PropertyKey[]} path - The path of the property to set.
 * @param {any} value - The value to set.
 * @returns {T} - The modified object.
 *
 * @example
 * // Set a value in a nested object
 * const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * console.log(obj.a.b.c); // 4
 *
 * @example
 * // Set a value in an array
 * const arr = [1, 2, 3];
 * set(arr, 1, 4);
 * console.log(arr[1]); // 4
 *
 * @example
 * // Create non-existent path and set value
 * const obj = {};
 * set(obj, 'a.b.c', 4);
 * console.log(obj); // { a: { b: { c: 4 } } }
 */
export function set<T>(obj: object, path: PropertyKey | readonly PropertyKey[], value: unknown): T;
/**
 * Sets the value at the specified path of the given object. If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | PropertyKey[]} path - The path of the property to set.
 * @param {any} value - The value to set.
 * @returns {T} - The modified object.
 *
 * @example
 * // Set a value in a nested object
 * const obj = { a: { b: { c: 3 } } };
 * set(obj, 'a.b.c', 4);
 * console.log(obj.a.b.c); // 4
 *
 * @example
 * // Set a value in an array
 * const arr = [1, 2, 3];
 * set(arr, 1, 4);
 * console.log(arr[1]); // 4
 *
 * @example
 * // Create non-existent path and set value
 * const obj = {};
 * set(obj, 'a.b.c', 4);
 * console.log(obj); // { a: { b: { c: 4 } } }
 */
export function set<T extends object>(obj: T, path: PropertyKey | readonly PropertyKey[], value: unknown): T {
  const resolvedPath = Array.isArray(path) ? path : typeof path === 'string' ? toPath(path) : [path];

  let current: any = obj;

  for (let i = 0; i < resolvedPath.length - 1; i++) {
    const key = resolvedPath[i];
    const nextKey = resolvedPath[i + 1];

    if (current[key] == null) {
      current[key] = isIndex(nextKey) ? [] : {};
    }

    current = current[key];
  }

  const lastKey = resolvedPath[resolvedPath.length - 1];
  current[lastKey] = value;

  return obj;
}
