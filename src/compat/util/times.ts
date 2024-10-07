import { toInteger } from "./toInteger";

/**
 * Invokes the iteratee n times, returning an array of the results of each invocation.
 *
 * The iteratee is invoked with one argument; (index).
 *
 * @template F The type of the iteratee function.
 * @param {number} n - The number of times to invoke iteratee.
 * @param {F extends (n: number) => any} [iteratee] - The function invoked per iteration. Default is identity.
 * @returns {Array<ReturnType<F>>} - Returns the array of results.
 *
 * @example
 * times(3, doubled); // => [0, 2, 4]
 * times(4); // => [0, 1, 2, 3]
 * times(2, () => 'es-toolkit') // => ['es-toolkit', 'es-toolkit']
 */
export function times<R>(n?: number, getValue?: (index: number) => R): R[] {
  n = toInteger(n);

  if (n < 1 || !Number.isSafeInteger(n)) {
    return [];
  }

  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    result[i] = typeof getValue === "function" ? getValue(i) : i;
  }

  return result;
}
