/**
 * Checks if the given value is an array.
 *
 * This function tests whether the provided value is an array or not.
 * It returns `true` if the value is an array, and `false` otherwise.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an array.
 *
 * @template T - The type of value.
 * @param {T} value - The value to test if it is an array.
 * @returns {value is Extract<T, unknown[]>} `true` if the value is an array, `false` otherwise.
 *
 * @example
 * const value1 = [1, 2, 3];
 * const value2 = 'abc';
 * const value3 = () => {};
 *
 * console.log(isArray(value1)); // true
 * console.log(isArray(value2)); // false
 * console.log(isArray(value3)); // false
 */
export function isArray<T>(value?: T): value is Extract<T, readonly unknown[]> {
  return Array.isArray(value);
}
