/**
 * Returns an array of numbers from `start` to `end` with the specified `step` value.
 *
 * This function generates a range of numbers, starting from `start`, ending before `end`,
 * and incrementing by `step`. If `step` is not provided, it defaults to `1` for an
 * ascending range and `-1` for a descending range.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} [end] - The end number of the range.
 * @param {number} [step] - The step value for the range.
 * @returns {number[]} An array of numbers from `start` to `end` with the specified `step`.
 *
 * @example
 * // Returns [0, 1, 2, 3]
 * range(4);
 *
 * @example
 * // Returns [0, 5, 10, 15]
 * range(0, 20, 5);
 *
 * @example
 * // Returns [0, -1, -2, -3]
 * range(0, -4, -1);
 *
 * @example
 * // Returns [1, 1, 1]
 * range(1, 4, 0);
 */

export function range(start: number, end?: number, step?: number): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (step === undefined) {
    step = start <= end ? 1 : -1;
  }

  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = start + i * step;
  }

  return result;
}
