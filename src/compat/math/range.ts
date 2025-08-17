import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { toFinite } from '../util/toFinite.ts';

/**
 * Creates an array of numbers progressing from `start` up to, but not including, `end`.
 *
 * @param {number} start - The starting number of the range (inclusive)
 * @param {number} end - The end number of the range (exclusive)
 * @param {number} step - The value to increment or decrement by
 * @returns {number[]} An array of numbers from start to end
 * @example
 * range(4)
 * // => [0, 1, 2, 3]
 *
 * range(1, 5)
 * // => [1, 2, 3, 4]
 *
 * range(0, 20, 5)
 * // => [0, 5, 10, 15]
 */
export function range(start: number, end?: number, step?: number): number[];

/**
 * Creates an array of numbers progressing from 0 up to, but not including, `end`.
 * Used internally when range is called as an iteratee.
 *
 * @param {number} end - The end of the range (exclusive)
 * @param {string|number} index - The index argument passed to the iteratee
 * @param {object} guard - The guard object passed to the iteratee
 * @returns {number[]} An array of numbers from 0 to end
 * @example
 * [1, 2, 3].map(range)
 * // => [[0], [0, 1], [0, 1, 2]]
 */
export function range(end: number, index: string | number, guard: object): number[];

/**
 * Returns an array of numbers from `start` (inclusive) to `end` (exclusive), incrementing by `step`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @param {number} step - The step value for the range.
 * @returns {number[]} An array of numbers from `start` (inclusive) to `end` (exclusive) with the specified `step`.
 *
 * @example
 * // Returns [0, 1, 2, 3]
 * range(4);
 *
 * @example
 * // Returns [0, -1, -2, -3]
 * range(0, -4, -1);
 */
export function range(start: number, end?: PropertyKey, step?: any): number[] {
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

  if (step === 0) {
    throw new Error('The step value must be a non-zero integer.');
  }

  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);
  for (let index = 0; index < length; index++) {
    result[index] = start;
    start += step;
  }
  return result;
}
