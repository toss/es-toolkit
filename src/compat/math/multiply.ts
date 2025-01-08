/**
 * Multiplies two numbers.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param {number} value The first number
 * @param {number} other The second number
 * @returns {number} The product of the two numbers
 *
 * @example
 * multiply(2, 3); // => 6
 * multiply(2, NaN); // => NaN
 * multiply(NaN, 3); // => NaN
 * multiply(NaN, NaN); // => NaN
 */

export function multiply(value: number, other: number): number {
  return value * other;
}
