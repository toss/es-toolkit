import { isFunction, isNil } from '../../predicate/index.ts';
import { get } from '../object/get.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Invokes the method at path of each element in collection.
 *
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {string} methodName - The name of the method to invoke.
 * @param {...any[]} args - The arguments to invoke each method with.
 * @returns {any[]} Returns the array of results.
 *
 * @example
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * invokeMap([123, 456], 'toString', 2);
 * // => ['1111011', '111001000']
 */
export function invokeMap(collection: object | null | undefined, methodName: string, ...args: any[]): any[];

/**
 * Invokes the method at path of each element in collection.
 *
 * @template R
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {(...args: any[]) => R} method - The method to invoke.
 * @param {...any[]} args - The arguments to invoke each method with.
 * @returns {R[]} Returns the array of results.
 *
 * @example
 * invokeMap([5, 1, 7], Array.prototype.slice, 1);
 * // => [[], [], []]
 */
export function invokeMap<R>(collection: object | null | undefined, method: (...args: any[]) => R, ...args: any[]): R[];

/**
 * Invokes the method at path of each element in collection.
 *
 * @template T, R
 * @param {ArrayLike<T> | Record<string, T> | null | undefined} collection - The collection to iterate over.
 * @param {string | ((...args: any[]) => R)} path - The path of the method to invoke or the method to invoke.
 * @param {...any[]} args - The arguments to invoke each method with.
 * @returns {Array<R | undefined>} Returns the array of results.
 *
 * @example
 * invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 */
export function invokeMap<T, R>(
  collection: ArrayLike<T> | Record<string, T> | null | undefined,
  path: string | ((...args: any[]) => R),
  ...args: any[]
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
