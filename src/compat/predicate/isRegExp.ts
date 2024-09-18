import { getTag } from '../_internal/getTag.ts';

/**
 * Checks if `value` is a RegExp.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a RegExp, `false` otherwise.
 *
 * @example
 * const value1 = /abc/;
 * const value2 = '/abc/';
 *
 * console.log(isRegExp(value1)); // true
 * console.log(isRegExp(value2)); // false
 */
export function isRegExp(value?: unknown): value is RegExp {
  return getTag(value) === '[object RegExp]';
}
