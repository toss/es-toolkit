import { isDeepKey } from '../_internal/isDeepKey.ts';
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
export function unset(obj: any, path: PropertyKey | readonly PropertyKey[]): boolean {
  if (obj == null) {
    return true;
  }

  switch (typeof path) {
    case 'symbol':
    case 'number':
    case 'object': {
      if (Array.isArray(path)) {
        return unsetWithPath(obj, path);
      }

      if (typeof path === 'number') {
        path = toKey(path);
      } else if (typeof path === 'object') {
        if (Object.is(path?.valueOf(), -0)) {
          path = '-0';
        } else {
          path = String(path);
        }
      }

      if (obj?.[path] === undefined) {
        return true;
      }

      try {
        delete obj[path];
        return true;
      } catch {
        return false;
      }
    }
    case 'string': {
      if (obj?.[path] === undefined && isDeepKey(path)) {
        return unsetWithPath(obj, toPath(path));
      }

      try {
        delete obj[path];
        return true;
      } catch {
        return false;
      }
    }
  }
}

function unsetWithPath(obj: unknown, path: readonly PropertyKey[]): boolean {
  const parent = get(obj, path.slice(0, -1), obj);
  const lastKey = path[path.length - 1];

  if (parent?.[lastKey] === undefined) {
    return true;
  }

  try {
    delete parent[lastKey];
    return true;
  } catch {
    return false;
  }
}
