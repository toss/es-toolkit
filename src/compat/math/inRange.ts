import { toFinite } from '../util/toFinite.ts';
import { toNumber } from '../util/toNumber.ts';

/**
 * Checks if the value is within a specified range.
 *
 * If only `minimum` is provided, it is treated as the exclusive upper bound and the range starts at `0`.
 * When the resolved bounds are out of order they are swapped, so the lower one is always inclusive
 * and the higher one exclusive.
 *
 * @param value The value to check.
 * @param minimum The lower bound of the range (inclusive).
 * @param maximum The upper bound of the range (exclusive).
 * @returns `true` if the value is within the specified range, otherwise `false`.
 *
 * @example
 * const result1 = inRange(3, 5); // result1 will be true.
 * const result2 = inRange(1, 2, 5); // result2 will be false.
 * const result3 = inRange(-2, -4); // result3 will be true, the range is [-4, 0).
 */
export function inRange(value: number, minimum: number, maximum?: number): boolean {
  minimum = toFinite(minimum);

  if (maximum === undefined) {
    maximum = minimum;
    minimum = 0;
  } else {
    maximum = toFinite(maximum);
  }

  value = toNumber(value);

  return value >= Math.min(minimum, maximum) && value < Math.max(minimum, maximum);
}
