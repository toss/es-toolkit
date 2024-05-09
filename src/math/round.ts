/**
 * @name round
 * @description Rounds given number to given precision
 * ```typescript
 * function round(value: number, precision: number = 0): number
 * ```
 * 
 * @example
 * round(1.2) === 1
 * round(3.9) === 4
 * round(8.5) === 9
 */
export function round(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
