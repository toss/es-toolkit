/**
 * Calculates the median of an array of `bigint`s.
 *
 * The median is the middle value of a sorted array. If the array has an odd
 * number of elements, the median is the middle value. If the array has an
 * even number of elements, it returns the truncated average of the two middle
 * values (`(a + b) / 2n`), since `bigint` has no fractional type. See issue
 * #1588.
 *
 * If the array is empty, this function throws a `RangeError` (a `bigint`
 * cannot represent `NaN`).
 *
 * @param nums - An array of `bigint`s to calculate the median.
 * @returns The median of all the values in the array.
 * @throws {RangeError} If `nums` is empty.
 *
 * @example
 * const arrayWithOddNumberOfElements = [1n, 2n, 3n, 4n, 5n];
 * const result = medianBigint(arrayWithOddNumberOfElements);
 * // result will be 3n
 *
 * @example
 * const arrayWithEvenNumberOfElements = [1n, 2n, 3n, 4n];
 * const result = medianBigint(arrayWithEvenNumberOfElements);
 * // result will be 2n (truncated average of 2n and 3n)
 *
 * @group math
 */
export function medianBigint(nums: readonly bigint[]): bigint {
  if (nums.length === 0) {
    throw new RangeError('Cannot compute median of an empty array');
  }

  const sorted = nums.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const middleIndex = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2n;
  } else {
    return sorted[middleIndex];
  }
}
