import { toNumber } from './toNumber.ts';

/**
 * Checks if value is greater than other.
 *
 * @param {unknown} value The value to compare.
 * @param {unknown} other The other value to compare.
 * @returns {boolean} Returns `true` if value is greater than other, else `false`.
 *
 * @example
 * gt(3, 1); // true
 * gt(3, 3); // false
 * gt(1, 3); // false
 */
export function gt(value: unknown, other: unknown): boolean {
  if (typeof value === 'string' && typeof other === 'string') {
    return value > other;
  }

  return toNumber(value) > toNumber(other);
}
