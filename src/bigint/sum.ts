/**
 * Calculates the sum of an array of bigints.
 *
 * This function takes an array of bigints and returns the sum of all the elements in the array.
 * An empty array returns `0n`, so `sum(a) + sum(b)` always equals `sum([...a, ...b])`.
 *
 * @param nums - An array of bigints to be summed.
 * @returns The sum of all the bigints in the array. Returns `0n` for an empty array.
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
