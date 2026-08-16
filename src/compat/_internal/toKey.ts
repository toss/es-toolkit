/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {unknown} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
export function toKey(value: unknown): string | symbol {
  if (typeof value === 'string' || typeof value === 'symbol') {
    return value;
  }
  if (Object.is(value?.valueOf?.(), -0)) {
    return '-0';
  }
  return String(value);
}
