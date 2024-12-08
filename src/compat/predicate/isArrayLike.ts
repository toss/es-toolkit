import { isLength } from '../../predicate/isLength.ts';

/**
 * Checks if `value` is array-like.
 *
 * @param {unknown} value The value to check.
 * @returns {value is ArrayLike<unknown>} Returns `true` if `value` is array-like, else `false`.
 *
 * @example
 * isArrayLike([1, 2, 3]); // true
 * isArrayLike('abc'); // true
 * isArrayLike({ 0: 'a', length: 1 }); // true
 * isArrayLike({}); // false
 * isArrayLike(null); // false
 * isArrayLike(undefined); // false
 */
export function isArrayLike(value?: unknown): value is ArrayLike<unknown> {
  return value != null && typeof value !== 'function' && isLength((value as ArrayLike<unknown>).length);
}
