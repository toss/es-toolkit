/**
 * Calculates the median of an array of numbers.
 *
 * The median is the middle value of a sorted array.
 * If the array has an odd number of elements, the median is the middle value.
 * If the array has an even number of elements, it returns the average of the two middle values.
 *
 * If the array is empty, this function returns `NaN`.
 *
 * @param {number[]} nums - An array of numbers to calculate the median.
 * @returns {number} The median of all the numbers in the array.
 *
 * @example
 * const arrayWithOddNumberOfElements = [1, 2, 3, 4, 5];
 * const result = median(arrayWithOddNumberOfElements);
 * // result will be 3
 *
 * @example
 * const arrayWithEvenNumberOfElements = [1, 2, 3, 4];
 * const result = median(arrayWithEvenNumberOfElements);
 * // result will be 2.5
 */
export function median(nums: readonly number[]): number;

/**
 * Calculates the median of an array of bigints.
 *
 * The median is the middle value of a sorted array.
 * If the array has an odd number of elements, the median is the middle value.
 * If the array has an even number of elements, it returns the average of the two middle values
 * using integer division.
 *
 * If the array is empty, this function returns `0n`.
 *
 * @param {bigint[]} nums - An array of bigints to calculate the median.
 * @returns {bigint} The median of all the bigints in the array.
 *
 * @example
 * const arrayWithOddNumberOfElements = [1n, 2n, 3n, 4n, 5n];
 * const result = median(arrayWithOddNumberOfElements);
 * // result will be 3n
 *
 * @example
 * const arrayWithEvenNumberOfElements = [1n, 2n, 3n, 4n];
 * const result = median(arrayWithEvenNumberOfElements);
 * // result will be 2n (integer division)
 */
export function median(nums: readonly bigint[]): bigint;

export function median(nums: readonly number[] | readonly bigint[]): number | bigint {
  if (nums.length === 0) {
    return NaN;
  }

  if (typeof nums[0] === 'bigint') {
    const sorted = (nums as bigint[]).slice().sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    const middleIndex = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2n;
    }
    return sorted[middleIndex];
  }

  const sorted = (nums as number[]).slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
  }
  return sorted[middleIndex];
}
