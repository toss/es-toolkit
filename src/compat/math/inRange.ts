import { inRange as inRangeToolkit } from '../../math/inRange.ts';

/**
 * Checks if the value is less than the maximum.
 *
 * @param {number} value The value to check.
 * @param {number} maximum The upper bound of the range (exclusive).
 * @returns {boolean} `true` if the value is less than the maximum, otherwise `false`.
 *
 * @example
 * const result = inRange(3, 5); // result will be true.
 * const result2 = inRange(5, 5); // result2 will be false.
 */
export function inRange(value: number, maximum: number): boolean;

/**
 * Checks if the value is within the range defined by minimum (inclusive) and maximum (exclusive).
 *
 * @param {number} value The value to check.
 * @param {number} minimum The lower bound of the range (inclusive).
 * @param {number} maximum The upper bound of the range (exclusive).
 * @returns {boolean} `true` if the value is within the specified range, otherwise `false`.
 *
 * @example
 * const result = inRange(3, 2, 5); // result will be true.
 * const result2 = inRange(1, 2, 5); // result2 will be false.
 */
export function inRange(value: number, minimum: number, maximum: number): boolean;

/**
 * Checks if the value is within a specified range.
 *
 * @param {number} value The value to check.
 * @param {number} minimum The lower bound of the range (inclusive).
 * @param {number} maximum The upper bound of the range (exclusive).
 * @returns {boolean} `true` if the value is within the specified range, otherwise `false`.
 * @throws {Error} Throws an error if the `minimum` is greater or equal than the `maximum`.
 *
 * @example
 * const result1 = inRange(3, 5); // result1 will be true.
 * const result2 = inRange(1, 2, 5); // result2 will be false.
 * const result3 = inRange(1, 5, 2); // If the minimum is greater or equal than the maximum, an error is thrown.
 */
export function inRange(value: number, minimum: number, maximum?: number): boolean {
  if (!minimum) {
    minimum = 0;
  }

  if (maximum != null && !maximum) {
    maximum = 0;
  }

  if (minimum != null && typeof minimum !== 'number') {
    minimum = Number(minimum);
  }

  if (maximum == null && minimum === 0) {
    return false;
  }

  if (maximum != null && typeof maximum !== 'number') {
    maximum = Number(maximum);
  }

  if (maximum != null && minimum > maximum) {
    [minimum, maximum] = [maximum, minimum];
  }

  if (minimum === maximum) {
    return false;
  }

  return inRangeToolkit(value, minimum, maximum!);
}
