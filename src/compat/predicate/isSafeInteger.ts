/**
 * Checks if `value` is a safe integer (between -(2^53 – 1) and (2^53 – 1), inclusive).
 *
 * A safe integer is an integer that can be precisely represented as a `number` in JavaScript,
 * without any other integer being rounded to it.
 *
 * This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.
 *
 * @param {unknown} value - The value to check
 * @returns {boolean} `true` if `value` is an integer and between the safe values, otherwise `false`
 *
 * @example
 * isSafeInteger(3); // Returns: true
 * isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // Returns: false
 * isSafeInteger(1n); // Returns: false
 * isSafeInteger('1'); // Returns: false
 */
export function isSafeInteger(value?: unknown): value is number {
  return Number.isSafeInteger(value);
}
