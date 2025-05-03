import { isKey } from '../_internal/isKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { toPath } from '../util/toPath.ts';

/**
 * Retrieves the value at a given path of an object.
 * If the resolved value is a function, it is invoked with the object as its `this` context.
 * If the value is `undefined`, the `defaultValue` is returned.
 *
 * @template T - The expected return type.
 * @param {unknown} object - The object to query.
 * @param {string | number | symbol | ReadonlyArray<string | number | symbol>} path - The path of the property to get.
 * @param {T | ((...args: unknown[]) => T)} [defaultValue] - The value returned if the resolved value is `undefined`.
 * @returns {T} - Returns the resolved value.
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
export function result<T>(
  object: unknown,
  path: string | number | symbol | ReadonlyArray<string | number | symbol>,
  defaultValue?: T | ((...args: unknown[]) => T)
): T {
  const resolvedPath = Array.isArray(path) ? path : isKey(path, object) ? [path] : toPath(String(path));
  const length = resolvedPath.length;

  for (let index = 0; index < (length || 1); index++) {
    const key = toKey(resolvedPath[index]);
    const value = object == null ? undefined : (object as Record<string | number | symbol, unknown>)[key];
    if (value === undefined) {
      object =
        typeof defaultValue === 'function' ? (defaultValue as (...args: unknown[]) => T).call(object) : defaultValue;
      break;
    }
    object = typeof value === 'function' ? value.call(object) : value;
  }
  return object as T;
}
