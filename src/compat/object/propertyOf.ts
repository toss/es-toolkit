import { get } from './get.ts';

/**
 * Creates a function that returns the value at a given path of an object.
 *
 * Unlike `property`, which creates a function bound to a specific path and allows you to query different objects,
 * `propertyOf` creates a function bound to a specific object and allows you to query different paths within that object.
 *
 * @param {unknown} object - The object to query.
 * @returns {(path: PropertyKey | PropertyKey[]) => unknown} - Returns a new function that takes a path and retrieves the value from the object at the specified path.
 *
 * @example
 * const getValue = propertyOf({ a: { b: { c: 3 } } });
 * const result = getValue('a.b.c');
 * console.log(result); // => 3
 *
 * @example
 * const getValue = propertyOf({ a: { b: { c: 3 } } });
 * const result = getValue(['a', 'b', 'c']);
 * console.log(result); // => 3
 */
export function propertyOf(object: unknown): (path: PropertyKey | readonly PropertyKey[]) => unknown {
  return function (path: PropertyKey | readonly PropertyKey[]) {
    return get(object, path);
  };
}
