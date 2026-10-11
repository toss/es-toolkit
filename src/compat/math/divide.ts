import { baseToString } from '../_internal/baseToString.ts';
import { toNumber } from '../util/toNumber.ts';

/**
 * Divide two numbers.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param value The first number in a division.
 * @param other The second number in a division.
 * @returns The quotient of value and other.
 *
 * @example
 * divide(6, 3); // => 2
 * divide(2, NaN); // => NaN
 * divide(NaN, 3); // => NaN
 * divide(NaN, NaN); // => NaN
 */
export function divide(value: number, other: number): number {
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

  return value / other;
}
