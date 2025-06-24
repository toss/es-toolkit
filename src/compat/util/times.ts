import { toInteger } from './toInteger.ts';

/**
 * Invokes the iteratee function n times, returning an array of the results.
 *
 * @template T The return type of the iteratee function.
 * @param {number} n - The number of times to invoke iteratee.
 * @param {(num: number) => T} iteratee - The function to invoke for each index.
 * @returns {T[]} An array containing the results of invoking iteratee n times.
 * @example
 * times(3, (i) => i * 2); // => [0, 2, 4]
 * times(2, () => 'es-toolkit'); // => ['es-toolkit', 'es-toolkit']
 */
export function times<T>(n: number, iteratee: (num: number) => T): T[];

/**
 * Invokes the default iteratee function n times, returning an array of indices.
 *
 * @param {number} n - The number of times to invoke the default iteratee.
 * @returns {number[]} An array containing indices from 0 to n-1.
 * @example
 * times(3); // => [0, 1, 2]
 */
export function times(n: number): number[];

/**
 * Invokes the getValue function n times, returning an array of the results.
 *
 * @template R The return type of the getValue function.
 * @param {number} n - The number of times to invoke getValue.
 * @param {(index: number) => R} getValue - The function to invoke for each index.
 * @returns {R[]} An array containing the results of invoking getValue n times.
 * @example
 * times(3, (i) => i * 2); // => [0, 2, 4]
 * times(2, () => 'es-toolkit'); // => ['es-toolkit', 'es-toolkit']
 */
export function times<R = number>(n?: number, getValue?: (index: number) => R): R[] {
  n = toInteger(n);

  if (n < 1 || !Number.isSafeInteger(n)) {
    return [];
  }

  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    result[i] = typeof getValue === 'function' ? getValue(i) : i;
  }

  return result;
}
