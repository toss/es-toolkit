/**
 * Calculates the value at the given percentile of an array of numbers.
 *
 * Sorts the array in ascending order and returns the element at the nearest rank.
 * See {@link https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method | Nearest rank method}.
 *
 * `NaN` values are sorted as the smallest values. Returns `NaN` if the array is empty.
 *
 * @param {readonly number[]} arr - An array of numbers to calculate the percentile.
 * @param {number} percentile - The percentile to compute, in the range `[0, 100]`.
 * @returns {number} The value at the given percentile.
 * @throws {Error} Throws an error if `percentile` is not a number, less than `0`, or greater than `100`.
 *
 * @example
 * percentile([1, 2, 3, 4, 5], 50);
 * // Returns 3
 *
 * @example
 * percentile([1, 2, 3, 4, 5], 75);
 * // Returns 4
 *
 * @example
 * percentile([5, 1, 4, 2, 3], 0);
 * // Returns 1
 */
export function percentile(arr: readonly number[], percentile: number): number {
  if (Number.isNaN(Number(percentile))) {
    throw new Error(`Expected percentile to be a number but got "${percentile}".`);
  }

  if (percentile < 0) {
    throw new Error(`Expected percentile to be >= 0 but got "${percentile}".`);
  }

  if (percentile > 100) {
    throw new Error(`Expected percentile to be <= 100 but got "${percentile}".`);
  }

  if (arr.length === 0) {
    return NaN;
  }

  const sorted = arr.slice().sort((a, b) => {
    const x = Number.isNaN(a) ? Number.NEGATIVE_INFINITY : a;
    const y = Number.isNaN(b) ? Number.NEGATIVE_INFINITY : b;
    return x - y;
  });

  // Nearest rank method: https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method
  if (percentile === 0) {
    return sorted[0];
  }

  const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
  return sorted[index];
}
