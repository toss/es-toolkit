/**
 * Finds the largest bigint in an array.
 *
 * This function iterates through the array and returns the largest element. Unlike `Math.max`,
 * which cannot accept bigints, it compares values directly so arbitrarily large integers stay exact.
 *
 * @param nums - An array of bigints to search.
 * @returns The largest bigint in the array.
 * @throws {RangeError} If the array is empty, since there is no bigint that represents "no maximum".
 *
 * @example
 * const result = max([1n, 5n, 3n]);
 * // result will be 5n
 *
 * const huge = max([9007199254740993n, 9007199254740992n]);
 * // huge will be 9007199254740993n, a value `Math.max` cannot distinguish
 */
export function max(nums: readonly bigint[]): bigint {
  if (nums.length === 0) {
    throw new RangeError('Cannot find the maximum of an empty array.');
  }

  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > result) {
      result = nums[i];
    }
  }

  return result;
}
