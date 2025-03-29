import { get } from './get.ts';
import { isArray } from '../predicate/isArray.ts';

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @template T - The type of the object.
 * @param {T} object - The object to iterate over.
 * @param {...(PropertyKey | PropertyKey[])} [paths] - The property paths to pick.
 * @returns {Array<unknown>} - Returns the picked values.
 *
 * @example
 * ```js
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 *
 * at(object, ['a[0].b.c', 'a[1]']);
 * // => [3, 4]
 * ```
 */
export function at<T>(object: T, ...paths: Array<PropertyKey | PropertyKey[]>): unknown[] {
  if (paths.length === 0) {
    return [];
  }

  const allPaths: PropertyKey[] = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (isArray(path)) {
      for (let j = 0; j < path.length; j++) {
        allPaths.push(path[j]);
      }
    } else {
      allPaths.push(path);
    }
  }

  const result: unknown[] = [];

  for (let i = 0; i < allPaths.length; i++) {
    result.push(get(object, allPaths[i]));
  }

  return result;
}
