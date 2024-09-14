import { isInteger } from './isInteger';

/**
 * Checks if `value` is a safe integer (between -(253 – 1) and (253 – 1) ).
 *
 * @param {any} value - The value to check
 * @returns {boolean} `true` if `value` is an integer and between the safe values, otherwise `false`
 *
 * @example
 * isInteger(3); // Returns: true
 * isInteger(Number.MIN_SAFE_INTEGER - 1); // Returns: false
 * isInteger(1n); // Returns: false
 * isInteger('1'); // Returns: false
 */
export function isSafeInteger(value: any): boolean {
  return isInteger(value) && value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER;
}
