import { isString } from '../predicate/isString.ts';

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

export function toKey(value: any) {
  if (isString(value) || typeof value === 'symbol') {
    return value;
  }
  if (Object.is(value.valueOf(), -0)) {
    return '-0';
  }
  return value.toString();
}
