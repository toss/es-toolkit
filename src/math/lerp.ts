/**
 * Returns the number that lies at `fraction` of the way between `start` and `stop`,
 * using linear interpolation.
 *
 * When `fraction` is `0` the result is `start`, when it is `1` the result is `stop`,
 * and when it is `0.5` the result is halfway between them. A `fraction` outside `[0, 1]`
 * is not clamped, so the result continues past `start` or `stop` along the same line.
 *
 * This is the inverse of `inverseLerp`.
 *
 * @param start - The number returned when `fraction` is `0`.
 * @param stop - The number returned when `fraction` is `1`.
 * @param fraction - Where the result lies between `start` and `stop`, usually from `0` to `1`.
 * @returns The number at `fraction` of the way between `start` and `stop`.
 *
 * @example
 * lerp(0, 100, 0.5); // 50
 * lerp(10, 20, 0.25); // 12.5
 * lerp(0, 100, 0); // 0
 * lerp(0, 100, 1); // 100
 * lerp(0, 100, 1.5); // 150
 */
export function lerp(start: number, stop: number, fraction: number): number {
  if (fraction === 1) {
    return stop;
  }

  return start + (stop - start) * fraction;
}
