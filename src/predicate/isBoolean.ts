import { getTag } from '../compat/_internal/getTag';

/**
 * Checks if the given value is boolean.
 *
 * This function tests whether the provided value is strictly `boolean`.
 * It returns `true` if the value is `boolean`, and `false` otherwise.
 *
 *  This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `boolean`.
 *
 * @param {unknown} x - The Value to test if it is boolean.
 * @returns {x is boolean} True if the value is booelan, false otherwise.
 *
 * @example
 *
 * const value1 = true;
 * const value2 = 0;
 * const value3 = 'abc';
 *
 * console.log(isBoolean(value1)); // true
 * console.log(isBoolean(value2)); // false
 * console.log(isBoolean(value3)); // false
 *
 */
export function isBoolean(x: unknown): x is boolean {
  return x === false || x === true || (x !== null && typeof x === 'object' && getTag(x) === '[object Boolean]');
}
