/**
 * Clamps a bigint within the inclusive upper bound.
 *
 * This function takes a bigint and a maximum bound, and returns the bigint clamped within the specified upper bound.
 * If only one bound is provided, it returns the minimum of the value and the bound.
 *
 * @param {bigint} value - The bigint to clamp.
 * @param {bigint} maximum - The maximum bound to clamp the bigint.
 * @returns {bigint} The clamped bigint within the specified upper bound.
 *
 * @example
 * const result = clamp(10n, 5n); // result will be 5n, as 10n is clamped to the bound 5n
 */
export function clamp(value: bigint, maximum: bigint): bigint;

/**
 * Clamps a bigint within the inclusive lower and upper bounds.
 *
 * This function takes a bigint and two bounds, and returns the bigint clamped within the specified bounds.
 *
 * @param {bigint} value - The bigint to clamp.
 * @param {bigint} minimum - The minimum bound to clamp the bigint.
 * @param {bigint} maximum - The maximum bound to clamp the bigint.
 * @returns {bigint} The clamped bigint within the specified bounds.
 *
 * @example
 * const result1 = clamp(10n, 5n, 15n); // result1 will be 10n, as it is within the bounds 5n and 15n
 * const result2 = clamp(2n, 5n, 15n); // result2 will be 5n, as 2n is clamped to the lower bound 5n
 * const result3 = clamp(20n, 5n, 15n); // result3 will be 15n, as 20n is clamped to the upper bound 15n
 */
export function clamp(value: bigint, minimum: bigint, maximum: bigint): bigint;

/**
 * Clamps a bigint within the specified bounds.
 *
 * This function takes a bigint and one or two bounds, and returns the bigint clamped within the specified bounds.
 * If only one bound is provided, it returns the minimum of the value and the bound.
 *
 * @param {bigint} value - The bigint to clamp.
 * @param {bigint} bound1 - The minimum bound to clamp the bigint, or the maximum bound if bound2 is not provided.
 * @param {bigint} [bound2] - The maximum bound to clamp the bigint. If not provided, the function will only consider bound1 as the upper limit.
 * @returns {bigint} The clamped bigint within the specified bounds.
 *
 * @example
 * const result1 = clamp(10n, 5n); // result1 will be 5n, as 10n is clamped to the bound 5n
 * const result2 = clamp(10n, 5n, 15n); // result2 will be 10n, as it is within the bounds 5n and 15n
 * const result3 = clamp(2n, 5n, 15n); // result3 will be 5n, as 2n is clamped to the lower bound 5n
 * const result4 = clamp(20n, 5n, 15n); // result4 will be 15n, as 20n is clamped to the upper bound 15n
 */
export function clamp(value: bigint, bound1: bigint, bound2?: bigint): bigint {
  if (bound2 == null) {
    return value < bound1 ? value : bound1;
  }

  let result = value;

  if (result < bound1) {
    result = bound1;
  }

  if (result > bound2) {
    result = bound2;
  }

  return result;
}
