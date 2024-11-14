/**
 * Adds two numbers while safely handling invalid or `NaN` values.
 *
 * This function takes two numbers and returns their sum. If either of the numbers is `NaN`,
 * it will be treated as `0`. If either value is not a valid number (including strings that cannot be converted to numbers),
 * it will return `NaN`.
 * This implementation mimics Lodash's `add` behavior.
 *
 * @param {number} value - The first number to add.
 * @param {number} other - The second number to add.
 * @returns {number} The sum of the two numbers, with `NaN` or invalid values returned as `NaN`.
 *
 * @example
 * const result1 = add(2, 3);   // result1 will be 5, as both values are valid numbers.
 * const result2 = add(5, 'a'); // result2 will be NaN, as 'a' is not a valid number.
 * const result3 = add(NaN, 10); // result3 will be NaN, as NaN is treated as NaN.
 * const result4 = add(2, NaN);  // result4 will be NaN, as NaN is treated as NaN.
 */
export function add(value: number, other: number): number {
  // Ensure both values are numbers and return NaN if either is invalid
  if (typeof value !== 'number' || isNaN(value)) {
    return NaN;
  }

  if (typeof other !== 'number' || isNaN(other)) {
    return NaN;
  }

  // Return the sum of the two values
  return value + other;
}
