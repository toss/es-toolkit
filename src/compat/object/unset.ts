import { toKey } from '../_internal/toKey.ts';
import { toPath } from '../util/toPath.ts';
import { get } from './get.ts';

/**
 * Removes the property at the given path of the object.
 *
 * @param {unknown} obj - The object to modify.
 * @param {PropertyKey | readonly PropertyKey[]} path - The path of the property to unset.
 * @returns {boolean} - Returns true if the property is deleted, else false.
 *
 * @example
 * const obj = { a: { b: { c: 42 } } };
 * unset(obj, 'a.b.c'); // true
 * console.log(obj); // { a: { b: {} } }
 *
 * @example
 * const obj = { a: { b: { c: 42 } } };
 * unset(obj, ['a', 'b', 'c']); // true
 * console.log(obj); // { a: { b: {} } }
 */
export function unset(obj: unknown, path: PropertyKey | readonly PropertyKey[]): boolean {
  if (obj == null) {
    return true;
  }

  const resolvedPath = Array.isArray(path) ? path : typeof path === 'string' ? toPath(path) : [path];

  const parent = get(obj, resolvedPath.slice(0, -1), obj);
  const lastKey = toKey(resolvedPath[resolvedPath.length - 1]);

  if (typeof parent !== 'object' || parent == null || !Object.prototype.hasOwnProperty.call(parent, lastKey)) {
    return true;
  }

  const isDeletable = Object.getOwnPropertyDescriptor(parent, lastKey)?.configurable;

  if (!isDeletable) {
    return false;
  }

  delete parent[lastKey];

  return true;
}
