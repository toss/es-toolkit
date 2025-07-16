import { get } from './get.ts';
import { PropertyPath } from '../_internal/PropertyPath.ts';

export function property<T, R>(path: PropertyPath): (obj: T) => R;

/**
 * Creates a function that returns the value at a given path of an object.
 *
 * @template T - The type of object.
 * @template R - The type of the value to return.
 * @param {PropertyPath} path - The path of the property to get.
 * @returns {(object: T) => R} - Returns a new function that takes an object and returns the value at the specified path.
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
export function property<T, R>(path: PropertyPath): (object: T) => R {
  return function (object: T) {
    return get(object, path);
  };
}
