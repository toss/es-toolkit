import { get } from './get.ts';

/**
 * Creates a function that returns the value at a given path of an object.
 *
 * @param path - The path of the property to get.
 * @returns - Returns a new function that takes an object and returns the value at the specified path.
 *
 * @example
 * const getObjectValue = property('a.b.c');
 * const result = getObjectValue({ a: { b: { c: 3 } } });
 * console.log(result); // => 3
 *
 * @example
 * const getObjectValue = property(['a', 'b', 'c']);
 * const result = getObjectValue({ a: { b: { c: 3 } } });
 * console.log(result); // => 3
 */
export function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any {
  return function (object: unknown) {
    return get(object, path);
  };
}
