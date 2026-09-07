import { toNumber } from '../util/toNumber.ts';
import { toString } from '../util/toString.ts';

/**
 * Adds two numbers while safely handling `NaN` values.
 *
 * This function takes two numbers and returns their sum. If either of the numbers is `NaN`,
 * the function returns `NaN`.
 *
 * @param value - The first number to add.
 * @param other - The second number to add.
 * @returns The sum of the two numbers, or `NaN` if any input is `NaN`.
 *
 * @example
 * const result1 = add(2, 3);    // result1 will be 5
 * const result2 = add(5, NaN);  // result2 will be NaN
 * const result3 = add(NaN, 10); // result3 will be NaN
 */
export function add(value: number, other: number): number {
  if (value === undefined && other === undefined) {
    return 0;
  }
  if (value === undefined || other === undefined) {
    // Only `undefined` is treated as a missing argument. A `null` operand is a
    // real value and must be returned as-is (matches Lodash).
    return (value === undefined ? other : value) as number;
  }
  if (typeof value === 'string' || typeof other === 'string') {
    // Lodash concatenates using `baseToString`, which stringifies `null` as
    // `'null'` (unlike `toString`, which returns `''` for nullish values).
    value = (value === null ? 'null' : toString(value)) as any;
    other = (other === null ? 'null' : toString(other)) as any;
  } else {
    value = toNumber(value);
    other = toNumber(other);
  }
  return value + other;
}
