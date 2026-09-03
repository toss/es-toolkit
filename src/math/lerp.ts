/**
 * Linearly interpolates between two numbers.
 *
 * Returns the number that is `t` of the way from `a` to `b`. When `t` is `0` the result is `a`,
 * when `t` is `1` the result is `b`, and when `t` is `0.5` the result is halfway between them.
 * Values of `t` outside `[0, 1]` are not clamped and extrapolate along the same line.
 *
 * `lerp` is short for "linear interpolation". It is the inverse of `inverseLerp`.
 *
 * @param a - The start value, returned when `t` is `0`.
 * @param b - The end value, returned when `t` is `1`.
 * @param t - The interpolation factor, usually between `0` and `1`.
 * @returns The interpolated number.
 *
 * @example
 * lerp(0, 100, 0.5); // 50
 * lerp(10, 20, 0.25); // 12.5
 * lerp(0, 100, 0); // 0
 * lerp(0, 100, 1); // 100
 * lerp(0, 100, 1.5); // 150
 */
export function lerp(a: number, b: number, t: number): number {
  if (t === 1) {
    return b;
  }

  return a + (b - a) * t;
}
