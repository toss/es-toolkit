import { baseToString } from '../_internal/baseToString.ts';
import { toNumber } from '../util/toNumber.ts';

/**
 * Multiply two numbers.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param value The first number in a multiplication
 * @param other The second number in a multiplication
 * @returns The product of value and other
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
    return value === undefined ? other : value;
  }

  if (typeof value === 'string' || typeof other === 'string') {
    value = baseToString(value) as any;
    other = baseToString(other) as any;
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }

  return value * other;
}
