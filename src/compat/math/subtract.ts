import { toNumber } from '../util/toNumber.ts';
import { toString } from '../util/toString.ts';

/**
 * Subtracts one number from another.
 *
 * If either of the numbers is `NaN`, the function returns `NaN`.
 *
 * @param value The first number. (minuend)
 * @param other The second number.(subtrahend)
 * @returns The difference of the two numbers, or `NaN` if any input is `NaN`.
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
    // Only `undefined` is treated as a missing argument. A `null` operand is a
    // real value and must be returned as-is (matches Lodash).
    return (value === undefined ? other : value) as number;
  }
  if (typeof value === 'string' || typeof other === 'string') {
    // Lodash coerces using `baseToString`, which stringifies `null` as `'null'`
    // (unlike `toString`, which returns `''` for nullish values).
    value = (value === null ? 'null' : toString(value)) as any;
    other = (other === null ? 'null' : toString(other)) as any;
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value - other;
}
