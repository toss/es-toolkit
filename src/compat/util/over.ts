import { iteratee } from '../util/iteratee.ts';

/**
 * Creates a function that invokes the provided function iteratees with the arguments it receives
 * and returns an array of the results.
 *
 * @template T - The type of arguments the created function will receive
 * @template R - The return type of the iteratee functions
 * @param {Array<((...args: T) => R)>} iteratees - The functions to invoke
 * @returns {Function} Returns the new function.
 *
 * @example
 * const func = over([Math.max, Math.min]);
 * func(1, 2, 3, 4);
 * // => [4, 1]
 */
export function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];

/**
 * Creates a function that checks if an object's properties match the given key-value pairs.
 *
 * @template T - The type of arguments the created function will receive
 * @param {Array<[PropertyKey, unknown]>} iteratees - The key-value pairs to match
 * @returns {Function} Returns the new function.
 *
 * @example
 * const func = over([['a', 1], ['b', 2]]);
 * func({ a: 1, b: 2 });
 * // => [true, true]
 */
export function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];

/**
 * Creates a function that checks if an object matches the given source objects.
 *
 * @template T - The type of arguments the created function will receive
 * @param {Array<object>} iteratees - The source objects to match
 * @returns {Function} Returns the new function.
 *
 * @example
 * const func = over([{ a: 1 }, { b: 2 }]);
 * func({ a: 1, b: 2 });
 * // => [true, false]
 */
export function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];

/**
 * Creates a function that returns property values at the given paths for an object.
 *
 * @template T - The type of arguments the created function will receive
 * @param {PropertyKey[]} iteratees - The property paths to get
 * @returns {Function} Returns the new function.
 *
 * @example
 * const func = over(['a', 'b']);
 * func({ a: 1, b: 2 });
 * // => [1, 2]
 */
export function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];

/**
 * Creates a function that invokes iteratees with the arguments provided to the created function and returns
 * their results.
 *
 * @template R - The return type of the iteratee functions
 * @param {...Array<((...args: any[]) => R) | PropertyKey | object | null | undefined>} iteratees - The iteratees to invoke.
 * @returns {Function} Returns the new function.
 *
 * @example
 * const func = over([Math.max, Math.min]);
 * func(1, 2, 3, 4);
 * // => [4, 1]
 *
 * const func = over(['a', 'b']);
 * func({ a: 1, b: 2 });
 * // => [1, 2]
 *
 * const func = over([{ a: 1 }, { b: 2 }]);
 * func({ a: 1, b: 2 });
 * // => [true, false]
 *
 * const func = over([['a', 1], ['b', 2]]);
 * func({ a: 1, b: 2 });
 * // => [true, true]
 *
 * // It handles nullish values at runtime, but will cause TypeScript type errors
 * // Note: This behavior is deliberately implemented to match lodash's functionality exactly
 * const func = over([null, undefined]);
 * func('a', 'b', 'c');
 * // => ['a', 'a']
 *
 * // If no iteratees are provided, it returns an empty array
 * const emptyFunc = over([]);
 * emptyFunc(1, 2, 3);
 * // => []
 */
export function over<R = unknown>(iteratees: any[]): (...args: any[]) => R[] {
  const funcs = iteratees.map(item => iteratee(item));

  return function (this: any, ...args: any[]): R[] {
    return funcs.map(func => func.apply(this, args));
  };
}
