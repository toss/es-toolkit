import { isDeepKey } from '../_internal/isDeepKey.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { toPath } from '../util/toPath.ts';
import { isArguments } from '../predicate/isArguments.ts';

/**
 * Checks if a given path exists within an object.
 *
 * You can provide the path as a single property key, an array of property keys,
 * or a string representing a deep path.
 *
 * If the path is an index and the object is an array or an arguments object, the function will verify
 * if the index is valid and within the bounds of the array or arguments object, even if the array or
 * arguments object is sparse (i.e., not all indexes are defined).
 *
 * @param {object} object - The object to query.
 * @param {PropertyKey | PropertyKey[]} path - The path to check. This can be a single property key,
 *        an array of property keys, or a string representing a deep path.
 * @returns {boolean} Returns `true` if the path exists in the object, `false` otherwise.
 *
 * @example
 *
 * const obj = { a: { b: { c: 3 } } };
 *
 * has(obj, 'a'); // true
 * has(obj, ['a', 'b']); // true
 * has(obj, ['a', 'b', 'c']); // true
 * has(obj, 'a.b.c'); // true
 * has(obj, 'a.b.d'); // false
 * has(obj, ['a', 'b', 'c', 'd']); // false
 * has([], 0); // false
 * has([1, 2, 3], 2); // true
 * has([1, 2, 3], 5); // false
 */
export function has(object: unknown, path: PropertyKey | readonly PropertyKey[]): boolean;

/**
 * Checks if a given path exists within an object.
 *
 * You can provide the path as a single property key, an array of property keys,
 * or a string representing a deep path.
 *
 * If the path is an index and the object is an array or an arguments object, the function will verify
 * if the index is valid and within the bounds of the array or arguments object, even if the array or
 * arguments object is sparse (i.e., not all indexes are defined).
 *
 * @param {object} object - The object to query.
 * @param {PropertyKey | PropertyKey[]} path - The path to check. This can be a single property key,
 *        an array of property keys, or a string representing a deep path.
 * @returns {boolean} Returns `true` if the path exists in the object, `false` otherwise.
 *
 * @example
 *
 * const obj = { a: { b: { c: 3 } } };
 *
 * has(obj, 'a'); // true
 * has(obj, ['a', 'b']); // true
 * has(obj, ['a', 'b', 'c']); // true
 * has(obj, 'a.b.c'); // true
 * has(obj, 'a.b.d'); // false
 * has(obj, ['a', 'b', 'c', 'd']); // false
 * has([], 0); // false
 * has([1, 2, 3], 2); // true
 * has([1, 2, 3], 5); // false
 */
export function has(object: any, path: PropertyKey | readonly PropertyKey[]): boolean {
  let resolvedPath;

  if (Array.isArray(path)) {
    resolvedPath = path;
  } else if (typeof path === 'string' && isDeepKey(path) && object?.[path] == null) {
    resolvedPath = toPath(path);
  } else {
    resolvedPath = [path];
  }

  if (resolvedPath.length === 0) {
    return false;
  }

  let current = object;

  for (let i = 0; i < resolvedPath.length; i++) {
    const key = resolvedPath[i];

    // Check if the current key is a direct property of the current object
    if (current == null || !Object.prototype.hasOwnProperty.call(current, key)) {
      const isSparseIndex = (Array.isArray(current) || isArguments(current)) && isIndex(key) && key < current.length;

      if (!isSparseIndex) {
        return false;
      }
    }

    current = current[key];
  }

  return true;
}
