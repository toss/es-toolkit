import { toNumber } from './toNumber.ts';
import { isString } from '../predicate/isString.ts';

/**
 * Checks if value is less than other.
 *
 * @param {unknown} value The value to compare.
 * @param {unknown} other The other value to compare.
 * @returns {boolean} Returns `true` if value is less than other, else `false`.
 *
 * @example
 * lt(1, 3); // true
 * lt(3, 3); // false
 * lt(3, 1); // false
 */
export function lt(value: unknown, other: unknown): boolean {
  if (isString(value) && isString(other)) {
    return value < other;
  }

  return toNumber(value) < toNumber(other);
}
