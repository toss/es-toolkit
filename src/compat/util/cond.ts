import { iteratee } from './iteratee.ts';
import { isFunction } from '../../predicate/isFunction';

/**
 * Returns a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function pairs
 * are invoked with the `this` binding and arguments of the created function.
 *
 * @param {Array} pairs - The predicate-function pairs.
 * @returns {(...args: any[]) => unknown} Returns the new composite function.
 * @example
 *
 * var func = cond([
 *   [matches({ 'a': 1 }),           constant('matches A')],
 *   [conforms({ 'b': isNumber }), constant('matches B')],
 *   [stubTrue,                      constant('no match')]
 * ]);
 *
 * func({ 'a': 1, 'b': 2 });
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 });
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' });
 * // => 'no match'
 */
export function cond(pairs: any[][]): (...args: any[]) => unknown {
  const length = pairs.length;

  const processedPairs = pairs.map(pair => {
    const predicate = pair[0];
    const func = pair[1];

    if (!isFunction(func)) {
      throw new TypeError('Expected a function');
    }

    return [iteratee(predicate), func] as const;
  });

  return function (this: unknown, ...args: any[]): unknown {
    for (let i = 0; i < length; i++) {
      const pair = processedPairs[i];
      const predicate = pair[0] as (this: unknown, ...args: any[]) => boolean;
      const func = pair[1] as (this: unknown, ...args: any[]) => unknown;

      if (predicate.apply(this, args)) {
        return func.apply(this, args);
      }
    }
  };
}
