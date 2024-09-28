/**
 * Converts `value` to a string.
 *
 * An empty string is returned for `null` and `undefined` values.
 * The sign of `-0` is preserved.
 *
 * @param {unknown} value - The value to convert.
 * @returns {string} Returns the converted string.
 *
 * @example
 * toString(null) // returns ''
 * toString(undefined) // returns ''
 * toString(-0) // returns '-0'
 * toString([1, 2, -0]) // returns '1,2,-0'
 * toString([Symbol('a'), Symbol('b')]) // returns 'Symbol(a),Symbol(b)'
 */
export function toString(value?: unknown): string {
  if (value == null) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(toString).join(',');
  }

  const result = String(value);

  if (result === '0' && Object.is(Number(value), -0)) {
    return '-0';
  }

  return result;
}
