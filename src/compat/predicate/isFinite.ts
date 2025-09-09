/**
 * Checks if `value` is a finite number.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, `false` otherwise.
 *
 * @example
 * ```typescript
 * const value1 = 100;
 * const value2 = Infinity;
 * const value3 = '100';
 *
 * console.log(isFinite(value1)); // true
 * console.log(isFinite(value2)); // false
 * console.log(isFinite(value3)); // false
 * ```
 */
export function isFinite(value?: any): boolean {
  return Number.isFinite(value);
}
