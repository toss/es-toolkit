/**
 * Returns an array of numbers from `end` (exclusive) to `0` (inclusive), decrementing by `1`.
 *
 * @param {number} end - The end number of the range (exclusive).
 * @returns {number[]} An array of numbers from `end` (exclusive) to `0` (inclusive) with a step of `1`.
 *
 * @example
 * // Returns [3, 2, 1, 0]
 * rangeRight(4);
 */
export function rangeRight(end: number): number[];

/**
 * Returns an array of numbers from `end` (exclusive) to `start` (inclusive), decrementing by `1`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @returns {number[]} An array of numbers from `end` (exclusive) to `start` (inclusive) with a step of `1`.
 *
 * @example
 * // Returns [3, 2, 1]
 * rangeRight(1, 4);
 */
export function rangeRight(start: number, end: number): number[];

/**
 * Returns an array of numbers from `end` (exclusive) to `start` (inclusive), decrementing by `step`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @param {number} step - The step value for the range.
 * @returns {number[]} An array of numbers from `end` (exclusive) to `start` (inclusive) with the specified `step`.
 *
 * @example
 * // Returns [15, 10, 5, 0]
 * rangeRight(0, 20, 5);
 */
export function rangeRight(start: number, end: number, step: number): number[];

/**
 * Returns an array of numbers from `end` (exclusive) to `start` (inclusive), decrementing by `step`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @param {number} step - The step value for the range.
 * @returns {number[]} An array of numbers from `end` (exclusive) to `start` (inclusive) with the specified `step`.
 * @throws {Error} Throws an error if the step value is not a non-zero integer.
 *
 * @example
 * // Returns [3, 2, 1, 0]
 * rangeRight(4);
 *
 * @example
 * // Returns [-3, -2, -1, 0]
 * rangeRight(0, -4, -1);
 */
export function rangeRight(start: number, end?: number, step = 1): number[] {
  if (end == null) {
    end = start;
    start = 0;
  }

  if (!Number.isInteger(step) || step === 0) {
    throw new Error(`The step value must be a non-zero integer.`);
  }

  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = start + (length - i - 1) * step;
  }

  return result;
}
