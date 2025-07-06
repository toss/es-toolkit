/** Minimum valid RGB value */
export const MIN_RGB_VALUE = 0;

/** Maximum valid RGB value */
export const MAX_RGB_VALUE = 255;

/**
 * Validates if a value is a valid RGB component (0-255 integer).
 *
 * @param {number} value - The value to validate.
 * @returns {boolean} True if the value is a valid RGB component, false otherwise.
 *
 * @example
 * isValidRgbValue(255); // true
 * isValidRgbValue(0); // true
 * isValidRgbValue(128); // true
 * isValidRgbValue(-1); // false
 * isValidRgbValue(256); // false
 * isValidRgbValue(3.14); // false
 * isValidRgbValue(NaN); // false
 */
export function isValidRgbValue(value: number): boolean {
  return Number.isInteger(value) && value >= MIN_RGB_VALUE && value <= MAX_RGB_VALUE;
}
