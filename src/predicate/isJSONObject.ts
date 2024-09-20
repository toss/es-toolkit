import { isString } from './isString.ts';
import { isBoolean } from './isBoolean.ts';
import { isNull } from './isNull.ts';
import { isArray } from '../compat/predicate/isArray.ts';
import { isPlainObject } from './isPlainObject.ts';

/**
 * Checks if a value is a JSON object.
 *
 * @param {T} obj The value to check.
 * @returns {boolean} True if `obj` is a JSON object, false otherwise.
 *
 * @example
 * isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } }); // true
 * isJSONObject({ regexp: /test/ }); // false
 * isJSONObject(123); // false
 */

export function isJSONObject(obj: unknown): boolean {
  if (!isPlainObject(obj as Record<string, any>)) {
    return false;
  }

  const entries = Object.entries(obj as Record<string, any>);

  for (const [key, value] of entries) {
    if (!isString(key)) {
      return false;
    }

    if (isPlainObject(value)) {
      if (!isJSONObject(value)) {
        return false;
      }
    } else {
      if (typeof value !== 'number' && !isString(value) && !isBoolean(value) && !isNull(value) && !isArray(value)) {
        return false;
      }
    }
  }

  return true;
}
