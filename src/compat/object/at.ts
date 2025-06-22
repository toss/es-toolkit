import { get } from './get.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isString } from '../predicate/isString.ts';

export function at<T>(object: Dictionary<T> | NumericDictionary<T> | null | undefined, ...props: PropertyPath[]): T[];
export function at<T extends object>(object: T | null | undefined, ...props: Array<Many<keyof T>>): Array<T[keyof T]>;

/**
 * Returns an array of values corresponding to `paths` of `object`.
 *
 * @template T - The type of the object.
 * @param {T} object - The object to iterate over.
 * @param {...(PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>)} [paths] - The property paths to pick.
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
export function at<T>(object: T, ...paths: Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>): unknown[] {
  if (paths.length === 0) {
    return [];
  }

  const allPaths: PropertyKey[] = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (!isArrayLike(path) || isString(path)) {
      allPaths.push(path as PropertyKey);
      continue;
    }

    for (let j = 0; j < path.length; j++) {
      allPaths.push(path[j]);
    }
  }

  const result: unknown[] = [];

  for (let i = 0; i < allPaths.length; i++) {
    result.push(get(object, allPaths[i]));
  }

  return result;
}
