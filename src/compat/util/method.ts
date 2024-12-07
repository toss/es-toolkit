import { invoke } from './invoke.ts';
import { flatten } from '../array/flatten.ts';

/**
 * Creates a function that invokes the method at `path` of a given object with the provided arguments.
 *
 * @param {PropertyKey | PropertyKey[]} path - The path of the method to invoke.
 * @param {...any} args - The arguments to invoke the method with.
 * @returns {(object?: unknown) => any} - Returns a new function that takes an object and invokes the method at `path` with `args`.
 *
 * @example
 * const object = {
 *   a: {
 *     b: function (x, y) {
 *       return x + y;
 *     }
 *   }
 * };
 *
 * const add = method('a.b', 1, 2);
 * console.log(add(object)); // => 3
 */
export function method(path: PropertyKey | PropertyKey[], ...args: any[]): (object?: unknown) => any {
  return function (object?: unknown) {
    return invoke(object, path, args);
  };
}
