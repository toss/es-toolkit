import { toNumber } from '../util/toNumber.ts';
import { baseToString } from '../util/toString.ts';

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
    // Only `undefined` is treated as a missing argument. A `null` operand is a
    // real value and must be returned as-is (matches Lodash).
    return (value === undefined ? other : value) as number;
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
