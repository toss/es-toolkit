import { isString } from './isString';
import { isObject } from '../compat/predicate/isObject';

/**
 * Checks if a value is a JSON string.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a JSON string (either an object or an array), false otherwise.
 *
 * @example
 * isJSONString('{"name": "John", "age": 30}') // true
 * isJSONString('[1, 2, 3]') // true
 * isJSONString({ name: 'John', age: 30 }) // false
 * isJSONString(null) // false
 * isJSONString('123') // false
 */
export function isJSONString(value: unknown): boolean {
  if (!isString(value)) {
    return false;
  }

  try {
    const result = JSON.parse(value);
    return isObject(result);
  } catch (e) {
    return false;
  }
}
