/**
 * Calculates the sum of an array of numbers.
 * 
 * This function takes an array of numbers and returns the sum of all the elements in the array.
 *
 * @param {number[]} nums - An array of numbers to be summed.
 * @returns {number} The sum of all the numbers in the array.
 *
 * @example
 *  * const numbers = [1, 2, 3, 4, 5];
 * const result = sum(numbers);
 * // result will be 15
 */
export function sum(nums: number[]): number {
  let result = 0;

  for (const num of nums) {
    result += num;
  }

  return result;
}
