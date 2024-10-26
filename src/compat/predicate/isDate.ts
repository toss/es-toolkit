import { isDate as isDateToolkit } from '../../predicate/isDate.ts';

/**
 * Checks if `value` is a Date object.
 *
 * @param {unknown} value The value to check.
 * @returns {value is Date} Returns `true` if `value` is a Date object, `false` otherwise.
 *
 * @example
 * const value1 = new Date();
 * const value2 = '2024-01-01';
 *
 * console.log(isDate(value1)); // true
 * console.log(isDate(value2)); // false
 */
export function isDate(value?: unknown): value is Date {
  return isDateToolkit(value);
}
