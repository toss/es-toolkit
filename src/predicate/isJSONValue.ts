import { isJSONArray } from './isJSONArray.ts';
import { isJSONObject } from './isJSONObject.ts';

/**
 * Checks if a given value is a valid JSON value.
 *
 * A valid JSON value can be:
 * - null
 * - a JSON object (an object with string keys and valid JSON values)
 * - a JSON array (an array of valid JSON values)
 * - a string
 * - a number
 * - a boolean
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a valid JSON value, otherwise false.
 *
 * @example
 * console.log(isJSONValue(null)); // true
 * console.log(isJSONValue({ key: "value" })); // true
 * console.log(isJSONValue([1, 2, 3])); // true
 * console.log(isJSONValue("Hello")); // true
 * console.log(isJSONValue(42)); // true
 * console.log(isJSONValue(true)); // true
 * console.log(isJSONValue(undefined)); // false
 * console.log(isJSONValue(() => {})); // false
 */
export function isJSONValue(value: unknown): value is Record<string, any> | any[] | string | number | boolean | null {
  switch (typeof value) {
    case 'object': {
      return value === null || isJSONArray(value) || isJSONObject(value);
    }
    case 'string':
    case 'number':
    case 'boolean': {
      return true;
    }
    default: {
      return false;
    }
  }
}
