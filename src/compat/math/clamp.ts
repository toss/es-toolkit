import { clamp as clampToolkit } from '../../math/clamp.ts';

/**
 * Clamps a number within the specified bounds.
 *
 * @param {number} number The number to clamp
 * @param {number} lower The lower bound
 * @param {number} upper The upper bound
 * @returns {number} Returns the clamped number
 * @example
 * clamp(3, 2, 4) // => 3
 * clamp(0, 5, 10) // => 5
 * clamp(15, 5, 10) // => 10
 */
export function clamp(number: number, lower: number, upper: number): number;

/**
 * Clamps a number to an upper bound.
 *
 * @param {number} number The number to clamp
 * @param {number} upper The upper bound
 * @returns {number} Returns the clamped number
 * @example
 * clamp(5, 3) // => 3
 * clamp(2, 3) // => 2
 */
export function clamp(number: number, upper: number): number;

/**
 * Clamps a number within the specified bounds.
 *
 * This function takes a number and one or two bounds, and returns the number clamped within the specified bounds.
 * If only one bound is provided, it returns the minimum of the value and the bound.
 *
 * @param {number} value - The number to clamp.
 * @param {number} bound1 - The minimum bound to clamp the number, or the maximum bound if bound2 is not provided.
 * @param {number} [bound2] - The maximum bound to clamp the number. If not provided, the function will only consider bound1 as the upper limit.
 * @returns {number} The clamped number within the specified bounds.
 *
 * @example
 * const result1 = clamp(10, 5); // result1 will be 5, as 10 is clamped to the bound 5
 * const result2 = clamp(10, 5, 15); // result2 will be 10, as it is within the bounds 5 and 15
 * const result3 = clamp(2, 5, 15); // result3 will be 5, as 2 is clamped to the lower bound 5
 * const result4 = clamp(20, 5, 15); // result4 will be 15, as 20 is clamped to the upper bound 15
 */
export function clamp(value: number, bound1: number, bound2?: number): number {
  if (Number.isNaN(bound1)) {
    bound1 = 0;
  }

  if (Number.isNaN(bound2)) {
    bound2 = 0;
  }

  return clampToolkit(value, bound1, bound2!);
}
