import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { toInteger } from '../util/toInteger.ts';
import { toString } from '../util/toString.ts';

/**
 * Repeats the given string n times.
 *
 * If n is less than 1, an empty string is returned, or if the string is an empty string,
 * the original string is returned unchanged.
 *
 * @param {string} str - The string to repeat.
 * @param {number} n - The number of times to repeat the string.
 * @returns {string} - The repeated string, or an empty string if n is less than 1.
 *
 * @example
 * repeat('abc', 0); // ''
 * repeat('abc', 2); // 'abcabc'
 */
export function repeat(str?: string, n?: number): string;

/**
 * Repeats the given string n times.
 *
 * If n is less than 1, an empty string is returned, or if the string is an empty string,
 * the original string is returned unchanged.
 *
 * @param {string} str - The string to repeat.
 * @param {number} n - The number of times to repeat the string.
 * @returns {string} - The repeated string, or an empty string if n is less than 1.
 *
 * @example
 * repeat('abc', 0); // ''
 * repeat('abc', 2); // 'abcabc'
 */
export function repeat(str: any, n?: any, guard?: any): string {
  if (guard ? isIterateeCall(str, n, guard) : n === undefined) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  return repeatImpl(toString(str), n);
}

function repeatImpl(str: string, n: number): string {
  if (n < 0 || n === Infinity) {
    throw new RangeError('Wrong number of repetitions');
  }

  n = Math.floor(n);
  let result = '';

  for (let i = 0; i < n; i++) {
    console.log(i, n);
    result += str;
  }

  return result;
}
