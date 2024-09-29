/**
 * Checks if a given value is a plain object.
 *
 * @param {object} value - The value to check.
 * @returns {value is Record<PropertyKey, any>} - True if the value is a plain object, otherwise false.
 *
 * @example
 * console.log(isPlainObject({})); // true
 * console.log(isPlainObject([])); // false
 * console.log(isPlainObject(null)); // false
 * console.log(isPlainObject(Object.create(null))); // true
 * console.log(Buffer.from('hello, world')); // false
 */
export function isPlainObject(value: unknown): value is Record<PropertyKey, any> {
  if (typeof value !== 'object') {
    return false;
  }

  if (value == null) {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  if (value.toString() !== '[object Object]') {
    return false;
  }

  let proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
