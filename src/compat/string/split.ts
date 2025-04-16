import { toString } from '../util/toString.ts';

/**
 * Splits the input string by the specified `separator`
 * and returns a new array containing the split segments.
 *
 * @param {string | null | undefined} [string=''] The string to split.
 * @param {RegExp|string} [separator] The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 *
 * @example
 * split('a-b-c', '-');
 * // => ['a', 'b', 'c']
 *
 * split('a-b-c', '-', 2);
 * // => ['a', 'b']
 */
export function split(string: string | null | undefined = '', separator?: RegExp | string, limit?: number): string[] {
  return toString(string).split(separator as string, limit);
}
