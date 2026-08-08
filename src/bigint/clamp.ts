/**
 * Clamps a bigint within the inclusive lower and upper bounds.
 *
 * This function takes a bigint and returns it constrained to the given range. Unlike `Math.min` and
 * `Math.max`, which cannot accept bigints, it compares values directly so large integers stay exact.
 *
 * @param value - The bigint to clamp.
 * @param maximum - The upper bound to clamp to.
 * @returns The clamped bigint.
 *
 * @example
 * const result = clamp(10n, 5n);
 * // result will be 5n, because 10n is greater than the maximum
 */
export function clamp(value: bigint, maximum: bigint): bigint;

/**
 * Clamps a bigint within the inclusive lower and upper bounds.
 *
 * This function takes a bigint and returns it constrained to the given range. Unlike `Math.min` and
 * `Math.max`, which cannot accept bigints, it compares values directly so large integers stay exact.
 *
 * @param value - The bigint to clamp.
 * @param minimum - The lower bound to clamp to.
 * @param maximum - The upper bound to clamp to.
 * @returns The clamped bigint.
 *
 * @example
 * const result = clamp(10n, 0n, 5n);
 * // result will be 5n, because 10n is greater than the maximum
 *
 * const result2 = clamp(-10n, 0n, 5n);
 * // result2 will be 0n, because -10n is less than the minimum
 */
export function clamp(value: bigint, minimum: bigint, maximum: bigint): bigint;

/**
 * Clamps a bigint within the inclusive lower and upper bounds.
 *
 * @param value - The bigint to clamp.
 * @param bound1 - The upper bound when called with two arguments, otherwise the lower bound.
 * @param bound2 - The upper bound when called with three arguments.
 * @returns The clamped bigint.
 */
export function clamp(value: bigint, bound1: bigint, bound2?: bigint): bigint {
  if (bound2 == null) {
    return value < bound1 ? value : bound1;
  }

  const lowerClamped = value > bound1 ? value : bound1;

  return lowerClamped < bound2 ? lowerClamped : bound2;
}
