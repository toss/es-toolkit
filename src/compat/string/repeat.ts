import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER.ts';
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
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return '';
  }
  return toString(str).repeat(n);
}
