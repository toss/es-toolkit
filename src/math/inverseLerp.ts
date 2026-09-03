/**
 * Calculates where a number lies between two other numbers, as a fraction from `0` to `1`.
 *
 * Returns the interpolation factor `t` such that `lerp(a, b, t)` equals `value`. When `value`
 * is `a` the result is `0`, when `value` is `b` the result is `1`, and when `value` is halfway
 * between them the result is `0.5`. Values outside `[a, b]` are not clamped, so the result can be
 * less than `0` or greater than `1`.
 *
 * When `a` and `b` are the same number there is no meaningful fraction, so `0` is returned.
 *
 * This is the inverse of `lerp`, and is also known as normalizing a number to a range.
 *
 * @param a - The start of the range, which maps to `0`.
 * @param b - The end of the range, which maps to `1`.
 * @param value - The number to locate within the range.
 * @returns The fraction of the way `value` is from `a` to `b`.
 *
 * @example
 * inverseLerp(0, 100, 50); // 0.5
 * inverseLerp(10, 20, 12.5); // 0.25
 * inverseLerp(0, 100, 0); // 0
 * inverseLerp(0, 100, 100); // 1
 * inverseLerp(0, 100, 150); // 1.5
 * inverseLerp(5, 5, 5); // 0
 */
export function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) {
    return 0;
  }

  return (value - a) / (b - a);
}
