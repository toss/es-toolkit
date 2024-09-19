import { getTag } from '../_internal/getTag';

/**
 * Checks if a given value is a number.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.
 *
 * @param {unknown} value The value to check if it is a number.
 * @returns {value is number} Returns `true` if `value` is a number, else `false`.
 *
 * @example
 * const value1 = 123;
 * const value2 = 'abc';
 * const value3 = true;
 *
 * console.log(isNumber(value1)); // true
 * console.log(isNumber(value2)); // false
 * console.log(isNumber(value3)); // false
 */
export function isNumber(value?: unknown): value is number {
  if (typeof value === 'object' && value != null && getTag(value) === '[object Number]') {
    return true;
  }

  return typeof value === 'number';
}
