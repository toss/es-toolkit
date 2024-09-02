/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param value The value to query.
 * @returns Returns the `Object.prototype.toString.call` result.
 */
export function getTag<T>(value: T) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}
