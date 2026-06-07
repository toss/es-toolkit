import { isRegExp as isRegExpToolkit } from '../../predicate/isRegExp.ts';

/**
 * Checks if `value` is a RegExp.
 *
 * @param value The value to check.
 * @returns Returns `true` if `value` is a RegExp, `false` otherwise.
 *
 * @example
 * const value1 = /abc/;
 * const value2 = '/abc/';
 *
 * console.log(isRegExp(value1)); // true
 * console.log(isRegExp(value2)); // false
 */
export function isRegExp(value?: any): value is RegExp {
  return isRegExpToolkit(value);
}
