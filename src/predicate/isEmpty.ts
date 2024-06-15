/**
 * Checks if a value is empty.
 *
 * The following values are considered empty:
 * - `null`
 * - `undefined`
 * - `false`
 * - `0`
 * - `NaN`
 * - `""` (empty string)
 * - empty arrays
 * - empty objects (objects with no enumerable own-properties)
 * - empty `Map` and `Set`
 * - objects with a valid length property that is 0 or negative
 *
 * @template T The type of the value.
 * @param {T} value The value to check.
 * @returns {boolean} Returns `true` if the value is empty, else `false`.
 *
 * @example
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(false); // true
 * isEmpty(0); // true
 * isEmpty(NaN); // true
 * isEmpty(''); // true
 * isEmpty([]); // true
 * isEmpty([1]); // false
 * isEmpty('a'); // false
 */
export function isEmpty<T>(value: T): boolean {
  if (value == null) {
    return true;
  }

  if (value === false || value === 0 || value === '' || (typeof value === 'number' && isNaN(value))) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'object') {
    if (
      'length' in value &&
      typeof value.length === 'number' &&
      (value.length > Number.MAX_SAFE_INTEGER || value.length < 0)
    ) {
      return true;
    }

    return Object.keys(value).length === 0;
  }

  return false;
}
