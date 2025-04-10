import { isString } from '../predicate/isString.ts';
import { toNumber } from '../util/toNumber.ts';
import { toString } from '../util/toString.ts';

/**
 * Subtracts one number from another.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param {number} value The first number. (minuend)
 * @param {number} other The second number.(subtrahend)
 * @returns {number} The difference of the two numbers, or `NaN` if any input is `NaN`.
 *
 * @example
 * subtract(6, 3); // => 3
 * subtract(6, NaN); // => NaN
 * subtract(NaN, 3); // => NaN
 */
export function subtract(value: number, other: number): number {
  if (value === undefined && other === undefined) {
    return 0;
  }
  if (value === undefined || other === undefined) {
    return value ?? other;
  }
  if (isString(value) || isString(other)) {
    value = toString(value) as any;
    other = toString(other) as any;
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value - other;
}
