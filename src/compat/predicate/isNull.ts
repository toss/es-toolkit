/**
 * Checks if `value` is `null`.
 *
 * @param value - The value to check.
 * @returns Returns `true` if `value` is `null`, else `false`.
 *
 * @example
 * isNull(null); // true
 * isNull(undefined); // false
 * isNull(0); // false
 */
export function isNull(value: any): value is null {
  return value === null;
}
