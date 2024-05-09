/**
 * @name clamp
 * @description Checks if `value` is within the bounds, if not return the closest bound (bound1: min, bound2: max)
 * function clamp(value: number, bound1: number, bound2?: number): number
 * @example
 * clamp(3, 1) // 3
 * clamp(3, 1, 5) // 3
 * clamp(3, 5) // 5
 * clamp(7, 3, 5) // 5
 */
export function clamp(value: number, bound1: number, bound2?: number): number {
  if (bound2 == null) {
    return Math.min(value, bound1);
  }

  return Math.min(Math.max(value, bound1), bound2);
}
