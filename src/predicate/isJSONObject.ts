import { isJSONValue } from './isJSONValue.ts';
import { isPlainObject } from './isPlainObject.ts';

/**
 * Checks if a value is a JSON object.
 *
 * A valid JSON object is defined as an object with string keys and valid JSON values.
 *
 * @param {unknown} obj The value to check.
 * @returns {obj is Record<string, any>} True if `obj` is a JSON object, false otherwise.
 *
 * @example
 * isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } }); // true
 * isJSONObject({ regexp: /test/ }); // false
 * isJSONObject(123); // false
 */
export function isJSONObject(obj: unknown): obj is Record<string, any> {
  if (!isPlainObject(obj)) {
    return false;
  }

  const keys = Reflect.ownKeys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    if (typeof key !== 'string') {
      return false;
    }

    if (!isJSONValue(value)) {
      return false;
    }
  }

  return true;
}
