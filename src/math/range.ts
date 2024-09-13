/**
 * Returns an array of numbers from `start` to `end`, incrementing by `step`.
 *
 * If `step` is not provided, it defaults to `1`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} [end] - The end number of the range (exclusive).
 * @param {number} [step] - The step value for the range. (default: 1)
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
 * // Throws an error: The step value must be a non-zero integer.
 * range(1, 4, 0);
 */
export function range(end: number): number[];

/**
 * Returns an array of numbers from `start` to `end`, incrementing by `step`.
 *
 * If `step` is not provided, it defaults to `1`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @returns {number[]} An array of numbers from `start` to `end` with the specified `step`.
 *
 * @example
 * // Returns [1, 2, 3]
 * range(1, 4);
 */
export function range(start: number, end: number): number[];

/**
 * Returns an array of numbers from `start` to `end`, incrementing by `step`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @param {number} step - The step value for the range.
 * @returns {number[]} An array of numbers from `start` to `end` with the specified `step`.
 *
 * @example
 * // Returns [0, 5, 10, 15]
 * range(0, 20, 5);
 */
export function range(start: number, end: number, step: number): number[];

/**
 * Returns an array of numbers from `start` to `end`, incrementing by `step`.
 *
 * If only one argument is provided, it returns an array from `0` to `start`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} [end] - The end number of the range (exclusive).
 * @param {number} [step] - The step value for the range. (default: 1)
 * @returns {number[]} An array of numbers from `start` to `end` with the specified `step`.
 * @throws {Error} Throws an error if the step value is not a non-zero integer.
 *
 * @example
 * // Returns [0, 1, 2, 3]
 * range(4);
 *
 * @example
 * // Returns [0, -1, -2, -3]
 * range(0, -4, -1);
 */
export function range(start: number, end?: number, step?: number): number[] {
  if (end == null) {
    end = start;
    start = 0;
  }

  if (step == null) {
    step = 1;
  }

  if (!Number.isInteger(step) || step === 0) {
    throw new Error(`The step value must be a non-zero integer.`);
  }

  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = start + i * step;
  }

  return result;
}
