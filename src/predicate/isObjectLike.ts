/**
 * Checks if the given value is an Object-like.
 *
 * This function tests whether the provided value is an object-like or not.
 * It returns `true` if the value is an object-like, and `false` otherwise.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an object-like.
 *
 * @template T - The type of value.
 * @param {T} value - The value to test if it is an object-like.
 * @returns {value is Extract<T, object>} `true` if the value is an object-like, `false` otherwise.
 *
 * @example
 * const value1 = { a: 1 };
 * const value2 = [1, 2, 3];
 * const value3 = 'abc';
 * const value4 = () => {};
 * const value5 = null;
 *
 * console.log(isObjectLike(value1)); // true
 * console.log(isObjectLike(value2)); // true
 * console.log(isObjectLike(value3)); // false
 * console.log(isObjectLike(value4)); // false
 */

export function isObjectLike<T>(value: T): value is Extract<T, object> {
  return typeof value === 'object' && value !== null;
}
