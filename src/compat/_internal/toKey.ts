import { isSymbol } from '../predicate/isSymbol';

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
export function toKey(value: unknown) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }

  if (Object.is(value?.valueOf(), -0)) {
    return '-0';
  }

  return `${value}`;
}
