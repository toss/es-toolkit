/**
 * Safely parses a JSON string.
 *
 * This is a safe wrapper around `JSON.parse()`. If `value` is a string that
 * contains valid JSON, the parsed result is returned. Otherwise, this function
 * returns `null` instead of throwing an error.
 *
 * A valid JSON string is one that can be successfully parsed using `JSON.parse()`.
 * According to the JSON specification, valid JSON can represent:
 * - Objects (with string keys and valid JSON values)
 * - Arrays (containing valid JSON values)
 * - Strings
 * - Numbers
 * - Booleans
 * - null
 *
 * String values like `"null"`, `"true"`, `"false"`, and numeric strings
 * (e.g., `"42"`) are considered valid JSON and will be parsed to their
 * corresponding JavaScript values.
 *
 * Unlike `isJSON`, this function is not a type guard. Instead, it allows you to
 * provide an expected JSON shape via the generic type parameter `T` and returns
 * `T | null` depending on whether parsing succeeds.
 *
 * In other words:
 * - Use `isJSON(value)` when you only need to validate a JSON string.
 * - Use `safeJSONParse(value)` when you also want to transform it into a value
 *   without risking a thrown error.
 *
 *
 * @template T The expected JSON value type.
 * @param {unknown} value The value to parse as JSON.
 * @returns {T | null} The parsed JSON value if `value` is a valid JSON string, otherwise `null`.
 *
 * @example
 * safeJSONParse('{"name":"John","age":30}');
 * // { name: "John", age: 30 }
 *
 * @example
 * safeJSONParse<{ name: string }>('{"name":"John"}');
 * // { name: "John" }
 *
 * @example
 * safeJSONParse('invalid json');
 * // null
 *
 * @example
 * safeJSONParse(42);
 * // null
 */
export function safeJSONParse<T = unknown>(value: unknown): T | null {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
