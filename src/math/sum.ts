/**
 * Calculates the sum of an array of numbers.
 *
 * This function takes an array of numbers and returns the sum of all the elements in the array.
 * If the array is empty, this function returns `0`.
 *
 * @param {number[]} nums - An array of numbers to be summed.
 * @returns {number} The sum of all the numbers in the array.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const result = sum(numbers);
 * // `result` will be 15
 * sum([1, 2, 3]); // => 6
 * sum([]); // => 0
 */
export function sum(nums: readonly number[]): number;

/**
 * Calculates the sum of an array of bigints.
 *
 * This function takes an array of bigints and returns the sum of all the elements in the array.
 *
 * @param {bigint[]} nums - An array of bigints to be summed.
 * @returns {bigint} The sum of all the bigints in the array.
 *
 * @example
 * const bigints = [1n, 2n, 3n, 4n, 5n];
 * const result = sum(bigints);
 * // `result` will be 15n
 */
export function sum(nums: readonly bigint[]): bigint;

export function sum(nums: readonly number[] | readonly bigint[]): number | bigint {
  if (!nums || nums.length === 0) {
    return 0;
  }

  let result: any = nums[0];

  for (let i = 1; i < nums.length; i++) {
    result += nums[i];
  }

  return result;
}
