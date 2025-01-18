import { toString } from '../util/toString.ts';

/**
 * Multiply two numbers.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param {number} value The first number in a multiplication
 * @param {number} other The second number in a multiplication
 * @returns {number} The product of value and other
 *
 * @example
 * multiply(2, 3); // => 6
 * multiply(2, NaN); // => NaN
 * multiply(NaN, 3); // => NaN
 * multiply(NaN, NaN); // => NaN
 */

export function multiply(value: number, other: number): number {
  if (value === undefined && other === undefined) {
    return 1;
  }

  if (value === undefined || other === undefined) {
    return value || other;
  }

  if (typeof value === 'string' || typeof other === 'string') {
    value = toString(value) as any;
    other = toString(other) as any;
  } else {
    value = Number(value);
    other = Number(other);
  }

  return value * other;
}
