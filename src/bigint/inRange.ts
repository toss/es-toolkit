/**
 * Checks whether a bigint is within a range.
 *
 * The lower bound is inclusive and the upper bound is exclusive, so `inRange(5n, 0n, 5n)` is `false`.
 *
 * @param value - The bigint to check.
 * @param maximum - The exclusive upper bound. The lower bound defaults to `0n`.
 * @returns `true` if the bigint is within the range, `false` otherwise.
 * @throws {Error} If the minimum is greater than or equal to the maximum.
 *
 * @example
 * const result = inRange(3n, 5n);
 * // result will be true, because 3n is within [0n, 5n)
 */
export function inRange(value: bigint, maximum: bigint): boolean;

/**
 * Checks whether a bigint is within a range.
 *
 * The lower bound is inclusive and the upper bound is exclusive, so `inRange(5n, 0n, 5n)` is `false`.
 *
 * @param value - The bigint to check.
 * @param minimum - The inclusive lower bound.
 * @param maximum - The exclusive upper bound.
 * @returns `true` if the bigint is within the range, `false` otherwise.
 * @throws {Error} If the minimum is greater than or equal to the maximum.
 *
 * @example
 * const result = inRange(5n, 0n, 10n);
 * // result will be true
 *
 * const result2 = inRange(10n, 0n, 10n);
 * // result2 will be false, because the upper bound is exclusive
 */
export function inRange(value: bigint, minimum: bigint, maximum: bigint): boolean;

/**
 * Checks whether a bigint is within a range.
 *
 * @param value - The bigint to check.
 * @param minimum - The exclusive upper bound when called with two arguments, otherwise the inclusive lower bound.
 * @param maximum - The exclusive upper bound when called with three arguments.
 * @returns `true` if the bigint is within the range, `false` otherwise.
 * @throws {Error} If the minimum is greater than or equal to the maximum.
 */
export function inRange(value: bigint, minimum: bigint, maximum?: bigint): boolean {
  if (maximum == null) {
    maximum = minimum;
    minimum = 0n;
  }

  if (minimum >= maximum) {
    throw new Error('The maximum value must be greater than the minimum value.');
  }

  return minimum <= value && value < maximum;
}
