/**
 * Normalizes a number from a given `[min, max]` range to the `[0, 1]` range.
 *
 * The result is `(value - min) / (max - min)`. Values outside `[min, max]` are
 * mapped outside `[0, 1]` (no clamping is performed); use {@link clamp} first
 * if you need the output bounded. See issue #550.
 *
 * @param value - The number to normalize.
 * @param min - The lower bound of the source range.
 * @param max - The upper bound of the source range.
 * @returns The value normalised to the `[0, 1]` range.
 * @throws {RangeError} `max` must not be less than `min`.
 *
 * @example
 * normalize(5, 0, 10); // 0.5
 * normalize(0, 0, 10); // 0
 * normalize(10, 0, 10); // 1
 * normalize(15, 10, 20); // 0.5
 */
export function normalize(value: number, min: number, max: number): number {
  if (max < min) {
    throw new RangeError('max must not be less than min');
  }
  return (value - min) / (max - min);
}
