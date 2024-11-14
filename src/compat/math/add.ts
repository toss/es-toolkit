import { add as addToolkit } from '../../math/add';

/**
 * Adds two numbers while safely handling invalid or `NaN` values.
 *
 * This function takes two numbers and returns their sum. If either of the numbers is `NaN`,
 * it will be treated as `0`. If either value is not a valid number, it is also treated as `0`.
 *
 * @param {number} value - The first number to add.
 * @param {number} other - The second number to add.
 * @returns {number} The sum of the two numbers, with `NaN` or invalid values treated as `0`.
 *
 * @example
 * const result1 = add(2, 3);   // result1 will be 5, as both values are valid numbers.
 * const result2 = add(5, 'a'); // result2 will be 5, as 'a' is not a number and is treated as 0.
 * const result3 = add(NaN, 10); // result3 will be 10, as NaN is treated as 0.
 * const result4 = add(2, NaN);  // result4 will be 2, as NaN is treated as 0.
 */

export function add(value: number, other: number): number {
  return addToolkit(value, other);
}
