/**
 * Checks if a given value is a valid JSON string.
 *
 * A valid JSON string is of type `string` and can be successfully parsed using `JSON.parse()`.
 * It returns `true` if the value is a valid JSON string, and `false` otherwise.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the
 * argument to a valid JSON string (`string`).
 *
 * @param {unknown} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid JSON string, else `false`.
 *
 * @example
 * isJSON('{"name":"John","age":30}'); // true
 * isJSON('[1,2,3]'); // true
 * isJSON('true'); // true
 * isJSON('invalid json'); // false
 * isJSON({ name: 'John' }); // false (not a string)
 * isJSON(null); // false (not a string)
 */
export function isJSON(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
