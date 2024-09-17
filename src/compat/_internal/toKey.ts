/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
export function toKey(value: number) {
  if (Object.is(value, -0)) {
    return '-0';
  }
  return value.toString();
}
