/**
 * Checks if a given value is a plain object.
 *
 * @param object - The value to check.
 * @returns - True if the value is a plain object, otherwise false.
 *
 * @example
 * console.log(isPlainObject({})); // true
 * console.log(isPlainObject([])); // false
 * console.log(isPlainObject(null)); // false
 * console.log(isPlainObject(Object.create(null))); // true
 * console.log(Buffer.from('hello, world')); // false
 */
export function isPlainObject(object: object): boolean {
  if (typeof object !== 'object') {
    return false;
  }

  if (object == null) {
    return false;
  }

  if (Object.getPrototypeOf(object) === null) {
    return true;
  }

  if (object.toString() !== '[object Object]') {
    return false;
  }

  let proto = object;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(object) === proto;
}
