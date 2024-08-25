/**
 * Checks if `value` is a RegExp.
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a RegExp, `false` otherwise.
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}
