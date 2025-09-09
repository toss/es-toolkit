import { isKey } from '../_internal/isKey.ts';
import { PropertyPath } from '../_internal/PropertyPath.ts';
import { toKey } from '../_internal/toKey.ts';
import { toPath } from '../util/toPath.ts';
import { toString } from '../util/toString.ts';

/**
 * Retrieves the value at a given path of an object.
 * If the resolved value is a function, it is invoked with the object as its `this` context.
 * If the value is `undefined`, the `defaultValue` is returned.
 *
 * @template T - The type of object.
 * @template R - The type of the value to return.
 * @param {T} object - The object to query.
 * @param {PropertyPath} path - The path of the property to get.
 * @param {R | ((...args: any[]) => R)} [defaultValue] - The value returned if the resolved value is `undefined`.
 * @returns {R} - Returns the resolved value.
 *
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * result(obj, 'a.b.c');
 * // => 3
 *
 * @example
 * const obj = { a: () => 5 };
 * result(obj, 'a');
 * // => 5 (calls the function `a` and returns its result)
 *
 * @example
 * const obj = { a: { b: null } };
 * result(obj, 'a.b.c', 'default');
 * // => 'default'
 *
 * @example
 * const obj = { a: { b: { c: 3 } } };
 * result(obj, 'a.b.d', () => 'default');
 * // => 'default'
 */
export function result<R>(object: any, path: PropertyPath, defaultValue?: R | ((...args: any[]) => R)): R {
  if (isKey(path, object)) {
    path = [path];
  } else if (!Array.isArray(path)) {
    path = toPath(toString(path));
  }

  const pathLength = Math.max(path.length, 1);

  for (let index = 0; index < pathLength; index++) {
    const value = object == null ? undefined : object[toKey(path[index])];

    if (value === undefined) {
      return typeof defaultValue === 'function' ? (defaultValue as any).call(object) : (defaultValue as R);
    }

    object = typeof value === 'function' ? value.call(object) : value;
  }

  return object;
}
