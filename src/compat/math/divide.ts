import { toNumber } from '../util/toNumber.ts';
import { toString } from '../util/toString.ts';

/**
 * Divide two numbers.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param {number} value The first number in a division.
 * @param {number} other The second number in a division.
 * @returns {number} The quotient of value and other.
 *
 * @example
 * divide(6, 3); // => 2
 * divide(2, NaN); // => NaN
 * divide(NaN, 3); // => NaN
 * divide(NaN, NaN); // => NaN
 */
export function divide(value: number, other: number): number {
  console.log(value, other);

  if (value === undefined && other === undefined) {
    return 1;
  }

  if (value === undefined || other === undefined) {
    return value ?? other;
  }

  if (typeof value === 'string' || typeof other === 'string') {
    value = toString(value) as any;
    other = toString(other) as any;
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }

  return value / other;
}
