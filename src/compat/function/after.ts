import { toInteger } from '../util/toInteger.ts';

/**
 * The opposite of `_.before`; this method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @template TFunc - The type of the function to be invoked.
 * @param {number} n - The number of calls before `func` is invoked.
 * @param {TFunc} func - The function to restrict.
 * @returns {TFunc} Returns the new restricted function.
 * @throws {TypeError} - If `func` is not a function.
 *
 * @example
 * const saves = ['profile', 'settings'];
 * const done = after(saves.length, () => {
 *   console.log('done saving!');
 * });
 *
 * saves.forEach(type => {
 *   asyncSave({ 'type': type, 'complete': done });
 * });
 * // => Logs 'done saving!' after the two async saves have completed.
 */
export function after<TFunc extends (...args: any[]) => any>(n: number, func: TFunc): TFunc {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  n = toInteger(n);
  return function (this: any, ...args: Parameters<TFunc>) {
    if (--n < 1) {
      return func.apply(this, args);
    }
  } as TFunc;
}
