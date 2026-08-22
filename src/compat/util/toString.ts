import { isSymbol } from '../predicate/isSymbol.ts';

/**
 * Converts `value` to a string.
 *
 * An empty string is returned for `null` and `undefined` values.
 * The sign of `-0` is preserved.
 *
 * @param value - The value to convert.
 * @returns Returns the converted string.
 *
 * @example
 * toString(null) // returns ''
 * toString(undefined) // returns ''
 * toString(-0) // returns '-0'
 * toString([1, 2, -0]) // returns '1,2,-0'
 * toString([Symbol('a'), Symbol('b')]) // returns 'Symbol(a),Symbol(b)'
 */
export function toString(value: any): string {
  if (value == null) {
    return '';
  }

  return baseToString(value);
}

function baseToString(value: any): string {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(baseToString).join(',');
  }

  if (isSymbol(value)) {
    return value.toString();
  }

  // Concatenation converts the value with the default hint, which reads `valueOf()` before
  // `toString()`. `String(value)` uses the string hint instead and never reads `valueOf()`.
  // eslint-disable-next-line no-implicit-coercion
  const result = value + '';

  if (result === '0' && Object.is(Number(value), -0)) {
    return '-0';
  }

  return result;
}
