/**
 * Checks if the value is NaN.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is typeof NaN} `true` if the value is NaN, `false` otherwise.
 *
 * @example
 * isNaN(NaN); // true
 * isNaN(0); // false
 * isNaN('NaN'); // false
 * isNaN(undefined); // false
 */
export function isNaN(value: unknown): value is typeof NaN {
  return Number.isNaN(value);
}
