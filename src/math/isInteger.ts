/**
 * Checks if `value` is an integer.
 *
 * @param {any} value - The value to check
 * @returns {boolean} `true` if `value` is integer, otherwise `false`
 *
 * @example
 * isInteger(3); // Returns: true
 * isInteger(Infinity); // Returns: false
 * isInteger('3'); // Returns: false
 * isInteger([]); // Returns: false
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}
