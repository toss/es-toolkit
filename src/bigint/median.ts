/**
 * Calculates the median of an array of bigints.
 *
 * The median is the middle value of a sorted array. When the array has an even number of elements,
 * the two middle values are averaged. Because bigints have no fractional part, that average is
 * truncated toward zero: `median([1n, 2n])` is `1n` and `median([-3n, -2n])` is `-2n`.
 *
 * @param nums - An array of bigints to calculate the median of.
 * @returns The median of the array.
 * @throws {RangeError} If the array is empty, since there is no bigint that represents "no median".
 *
 * @example
 * const result = median([1n, 2n, 3n, 4n, 5n]);
 * // result will be 3n
 *
 * const truncated = median([1n, 2n, 3n, 4n]);
 * // truncated will be 2n, because (2n + 3n) / 2n truncates toward zero
 */
export function median(nums: readonly bigint[]): bigint {
  if (nums.length === 0) {
    throw new RangeError('Cannot compute the median of an empty array.');
  }

  const sorted = nums.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const middleIndex = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2n;
  }

  return sorted[middleIndex];
}
