import { toInteger } from '../util/toInteger.ts';

/**
 * Creates a function that retrieves the argument at the specified index `n`.
 *
 * If `n` is negative, the nth argument from the end is returned.
 *
 * @param {number} [n=0] - The index of the argument to retrieve.
 *   If negative, counts from the end of the arguments list.
 * @returns {(args: any[]) => unknown} A new function that returns the argument at the specified index.
 *
 * @example
 * const getSecondArg = nthArg(1);
 * const result = getSecondArg('a', 'b', 'c');
 * console.log(result); // => 'b'
 *
 * @example
 * const getLastArg = nthArg(-1);
 * const result = getLastArg('a', 'b', 'c');
 * console.log(result); // => 'c'
 */
export function nthArg(n = 0): (...args: any[]) => unknown {
  return function (...args: any[]) {
    return args.at(toInteger(n));
  };
}
