import { sum } from './sum.ts';

/**
 * Calculates the average of an array of bigints.
 *
 * Because bigints are integers, the result is truncated toward zero, following the behavior of BigInt division.
 *
 * If the array is empty, this function returns `undefined`.
 *
 * @param {bigint[]} nums - An array of bigints to calculate the average.
 * @returns {bigint | undefined} The average of all the bigints, or `undefined` if the array is empty.
 *
 * @example
 * mean([1n, 2n, 3n, 4n, 5n]); // Returns: 3n
 * mean([1n, 2n]); // Returns: 1n (3n / 2n is truncated toward zero)
 * mean([]); // Returns: undefined
 */
export function mean(nums: readonly bigint[]): bigint | undefined {
  if (nums.length === 0) {
    return undefined;
  }

  return sum(nums) / BigInt(nums.length);
}
