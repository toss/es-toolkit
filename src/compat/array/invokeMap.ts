import { isFunction, isNil } from '../../predicate/index.ts';
import { get } from '../object/get.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @template T The type of the elements in the collection.
 * @template R The type of the resolved values from the invoked methods.
 * @param {T[] | Record<string, T> | null | undefined} collection The collection to iterate over.
 * @param {PropertyKey | PropertyKey[] | ((this: T, ...args: unknown[]) => R)} path The path of the method to invoke (string, number, symbol, or an array of these) or the function to invoke.
 * @param {...unknown} [args] The arguments to invoke each method with.
 * @returns {Array<R | undefined>} Returns the array of results. Elements are `undefined` if the path is not found or the method invocation results in `undefined`.
 *
 * @example
 * // Invoke a method on each element
 * invokeMap(['a', 'b', 'c'], 'toUpperCase');
 * // => ['A', 'B', 'C']
 *
 * // Invoke a method with arguments
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * // Invoke a method on each value in an object
 * invokeMap({ a: 1, b: 2, c: 3 }, 'toFixed', 1);
 * // => ['1.0', '2.0', '3.0']
 *
 * // Use a function instead of a method name
 * invokeMap(
 *   ['a', 'b', 'c'],
 *   function(this: string, prefix: string, suffix: string) {
 *     return prefix + this.toUpperCase() + suffix;
 *   },
 *   '(',
 *   ')'
 * );
 * // => ['(A)', '(B)', '(C)']
 *
 * invokeMap([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
export function invokeMap<T, R>(
  collection: T[] | Record<string, T> | null | undefined,
  path: PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R),
  ...args: unknown[]
): Array<R | undefined> {
  if (isNil(collection)) {
    return [];
  }

  const values = isArrayLike(collection) ? (Array.from(collection) as T[]) : (Object.values(collection) as T[]);
  const result: Array<R | undefined> = [];

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    if (isFunction(path)) {
      result.push(path.apply(value, args));
      continue;
    }

    const method = get(value, path);

    let thisContext = value;

    if (Array.isArray(path)) {
      const pathExceptLast = path.slice(0, -1);
      if (pathExceptLast.length > 0) {
        thisContext = get(value, pathExceptLast);
      }
    } else if (typeof path === 'string' && path.includes('.')) {
      const parts = path.split('.');
      const pathExceptLast = parts.slice(0, -1).join('.');
      thisContext = get(value, pathExceptLast);
    }

    result.push(method == null ? undefined : method.apply(thisContext, args));
  }

  return result;
}
