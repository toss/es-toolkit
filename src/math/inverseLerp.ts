/**
 * Returns where `value` lies between `start` and `stop`, as a fraction from `0` to `1`.
 *
 * When `value` equals `start` the result is `0`, when it equals `stop` the result is `1`,
 * and when it is halfway between them the result is `0.5`. A `value` outside `[start, stop]`
 * is not clamped, so the result can be less than `0` or greater than `1`.
 *
 * When `start` and `stop` are the same number there is no position to measure, so `0` is returned.
 *
 * This is the inverse of `lerp`, and is also known as normalizing a number to a range.
 *
 * @param start - The number that maps to `0`.
 * @param stop - The number that maps to `1`.
 * @param value - The number to locate between `start` and `stop`.
 * @returns Where `value` lies between `start` and `stop`, as a fraction from `0` to `1`.
 *
 * @example
 * inverseLerp(0, 100, 50); // 0.5
 * inverseLerp(10, 20, 12.5); // 0.25
 * inverseLerp(0, 100, 0); // 0
 * inverseLerp(0, 100, 100); // 1
 * inverseLerp(0, 100, 150); // 1.5
 * inverseLerp(5, 5, 5); // 0
 */
export function inverseLerp(start: number, stop: number, value: number): number {
  if (start === stop) {
    return 0;
  }

  return (value - start) / (stop - start);
}
