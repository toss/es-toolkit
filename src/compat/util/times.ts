import { toInteger } from './toInteger.ts';

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
