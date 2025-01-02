import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { toFinite } from '../util/toFinite.ts';

/**
 * Returns an array of numbers from `0` (inclusive) to `end` (exclusive), incrementing by `1`.
 *
 * @param {number} end - The end number of the range (exclusive).
 * @returns {number[]} An array of numbers from `0` (inclusive) to `end` (exclusive) with a step of `1`.
 *
 * @example
 * // Returns [0, 1, 2, 3]
 * range(4);
 */
export function range(end: number): number[];

/**
 * Returns an array of numbers from `start` (inclusive) to `end` (exclusive), incrementing by `1`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @returns {number[]} An array of numbers from `start` (inclusive) to `end` (exclusive) with a step of `1`.
 *
 * @example
 * // Returns [1, 2, 3]
 * range(1, 4);
 */
export function range(start: number, end: number): number[];

/**
 * Returns an array of numbers from `start` (inclusive) to `end` (exclusive), incrementing by `step`.
 *
 * @param {number} start - The starting number of the range (inclusive).
 * @param {number} end - The end number of the range (exclusive).
 * @param {number} step - The step value for the range.
 * @returns {number[]} An array of numbers from `start` (inclusive) to `end` (exclusive) with the specified `step`.
 *
 * @example
 * // Returns [0, 5, 10, 15]
 * range(0, 20, 5);
 */
export function range(start: number, end: number, step: number): number[];

/**
 * Enables use as an iteratee for methods like `_.map`.
 *
 * @param {number} end - The current iteratee value.
 * @param {PropertyKey} index - The iteration index.
 * @param {object} guard - The iteratee object.
 * @returns {number[]} An array of numbers from `start` (inclusive) to `end` (exclusive) with the specified `step`.
 */
export function range(end: number, index: PropertyKey, guard: object): number[];

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

  const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);
  for (let index = 0; index < length; index++) {
    result[index] = start;
    start += step;
  }
  return result;
}
