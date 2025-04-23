/**
 * Checks if a given value is a native function.
 *
 * This function tests whether the provided value is a native function implemented by the JavaScript engine.
 * It returns `true` if the value is a native function, and `false` otherwise.
 *
 * @param {unknown} value - The value to test for native function.
 * @returns {boolean} `true` if the value is a native function, `false` otherwise.
 *
 * @example
 * const value1 = Array.prototype.push;
 * const value2 = () => {};
 * const result1 = isNative(value1); // true
 * const result2 = isNative(value2); // false
 */
export function isNative(value: unknown): boolean {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'function') {
    return false;
  }

  return /\[native code\]/.test(Function.prototype.toString.call(value));
}
