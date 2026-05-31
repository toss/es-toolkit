/**
 * Calculates the median of an array of bigints.
 *
 * The median is the middle value of a sorted array.
 * If the array has an odd number of elements, the median is the middle value.
 * If the array has an even number of elements, it returns the average of the two middle values,
 * truncated toward zero because bigints are integers.
 *
 * If the array is empty, this function returns `undefined`.
 *
 * @param {bigint[]} nums - An array of bigints to calculate the median.
 * @returns {bigint | undefined} The median of all the bigints, or `undefined` if the array is empty.
 *
 * @example
 * median([1n, 2n, 3n, 4n, 5n]); // Returns: 3n
 * median([1n, 2n, 3n, 4n]); // Returns: 2n ((2n + 3n) / 2n is truncated toward zero)
 * median([]); // Returns: undefined
 */
export function median(nums: readonly bigint[]): bigint | undefined {
  if (nums.length === 0) {
    return undefined;
  }

  const sorted = nums.slice().sort((a, b) => {
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
  } else {
    return sorted[middleIndex];
  }
}
