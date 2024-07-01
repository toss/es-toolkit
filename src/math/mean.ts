import { sum } from './sum.ts';

/**
 * Calculates the average of an array of numbers.
 *
 * If the array is empty, this function returns `NaN`.
 *
 * @param {number[]} nums - An array of numbers to calculate the average.
 * @returns {number} The average of all the numbers in the array.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const result = average(numbers);
 * // result will be 3
 */
export function mean(nums: readonly number[]): number {
  return sum(nums) / nums.length;
}
