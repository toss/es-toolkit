/**
 * Calculates the sum of an array of bigints.
 *
 * This function takes an array of bigints and returns the sum of all the elements in the array.
 *
 * @param {bigint[]} nums - An array of bigints to be summed.
 * @returns {bigint} The sum of all the bigints in the array.
 *
 * @example
 * const numbers = [1n, 2n, 3n, 4n, 5n];
 * const result = sum(numbers);
 * // result will be 15n
 */
export function sum(nums: readonly bigint[]): bigint {
  let result = 0n;

  for (let i = 0; i < nums.length; i++) {
    result += nums[i];
  }

  return result;
}
