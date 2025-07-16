import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { toFinite } from '../util/toFinite.ts';

/**
 * Creates an array of numbers from `start` to `end` with optional `step`.
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} [end] - The end number of the range (exclusive).
 * @param {number} [step] - The step value for the range.
 * @returns {number[]} An array of numbers from `start` to `end` with the specified `step`.
 * @example
 * // Returns [0, 1, 2, 3]
 * rangeRight(4);
 * @example
 * // Returns [0, 2, 4, 6]
 * rangeRight(0, 8, 2);
 * @example
 * // Returns [5, 4, 3, 2, 1]
 * rangeRight(1, 6);
 */
export function rangeRight(start: number, end?: number, step?: number): number[];

/**
 * Creates an array of numbers from 0 to `end` with step 1.
 * Used when called as an iteratee for methods like `_.map`.
 * @param {number} end - The end number of the range (exclusive).
 * @param {string | number} index - The index parameter (used for iteratee calls).
 * @param {object} guard - The guard parameter (used for iteratee calls).
 * @returns {number[]} An array of numbers from 0 to `end` with step 1.
 * @example
 * // Returns [0, 1, 2, 3]
 * rangeRight(4, 'index', {});
 */
export function rangeRight(end: number, index: string | number, guard: object): number[];

/**
 * Returns an array of numbers from `end` (exclusive) to `start` (inclusive), decrementing by `step`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {string | number} end - The end number of the range (exclusive).
 * @param {number | object} step - The step value for the range.
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
export function rangeRight(start: number, end?: string | number, step?: number | object): number[] {
  // Enables use as an iteratee for methods like `_.map`.
  if (step && typeof step !== 'number' && isIterateeCall(start, end, step)) {
    end = step = undefined;
  }
  start = toFinite(start);
  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }
  step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);

  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);
  for (let index = length - 1; index >= 0; index--) {
    result[index] = start;
    start += step;
  }
  return result;
}
