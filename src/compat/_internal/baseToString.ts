import { isSymbol } from '../predicate/isSymbol.ts';

/**
 * Converts `value` to a string like Lodash's `baseToString`.
 *
 * Unlike `toString`, `null` and `undefined` are not special-cased, so `null` becomes `'null'`.
 *
 * @param value - The value to convert.
 * @returns The converted string.
 */
export function baseToString(value: any): string {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    // `Array.prototype.map` skips holes in a sparse array, but lodash reads
    // each index, so a hole is rendered as `undefined` rather than dropped.
    let result = '';

    for (let i = 0; i < value.length; i++) {
      if (i > 0) {
        result += ',';
      }

      result += baseToString(value[i]);
    }

    return result;
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
