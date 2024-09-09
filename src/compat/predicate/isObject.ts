/**
 * Checks if the given value is the language type of Object.
 * https://262.ecma-international.org/7.0/#sec-ecmascript-language-types
 *
 * This function tests whether the provided value is an object or not.
 * It returns `true` if the value is an object, and `false` otherwise.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an object value.
 *
 * @param {unknown} value - The value to check if it is an object.
 * @returns {value is object | Function} `true` if the value is the language type of Object, `false` otherwise.
 *
 * @example
 * const value1 = {};
 * const value2 = [1, 2, 3];
 * const value3 = () => {};
 * const value4 = null;
 *
 * console.log(isArray(value1)); // true
 * console.log(isArray(value2)); // true
 * console.log(isArray(value3)); // true
 * console.log(isArray(value4)); // false
 */

export function isObject(value: unknown): value is object | ((...args: any[]) => unknown) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}
