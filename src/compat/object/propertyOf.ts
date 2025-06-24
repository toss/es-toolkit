import { get } from './get.ts';
import { PropertyPath } from '../_internal/PropertyPath.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function propertyOf<T extends {}>(object: T): (path: PropertyPath) => any;

/**
 * Creates a function that returns the value at a given path of an object.
 *
 * Unlike `property`, which creates a function bound to a specific path and allows you to query different objects,
 * `propertyOf` creates a function bound to a specific object and allows you to query different paths within that object.
 *
 * @template T - The type of object.
 * @param {T} object - The object to query.
 * @returns {(path: PropertyPath) => any} - Returns a new function that takes a path and retrieves the value from the object at the specified path.
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
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function propertyOf<T extends {}>(object: T): (path: PropertyPath) => any {
  return function (path: PropertyPath) {
    return get(object, path);
  };
}
