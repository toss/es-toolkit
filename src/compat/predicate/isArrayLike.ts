import { isLength } from '../../predicate/isLength.ts';

/**
 * Checks if `value` is array-like. This overload is for compatibility with lodash type checking.
 *
 * @param {T} t The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
export function isArrayLike<T extends { __lodashAnyHack: any }>(t: T): boolean;

/**
 * Checks if `value` is array-like. Functions, null, and undefined are never array-like.
 *
 * @param {((...args: any[]) => any) | null | undefined} value The value to check.
 * @returns {value is never} Returns `false` for functions, null, and undefined.
 */
export function isArrayLike(value: ((...args: any[]) => any) | null | undefined): value is never;

/**
 * Checks if `value` is array-like.
 *
 * @param {any} value The value to check.
 * @returns {value is { length: number }} Returns `true` if `value` is array-like, else `false`.
 */
export function isArrayLike(value: any): value is { length: number };

/**
 * Checks if `value` is array-like.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 *
 * @example
 * isArrayLike([1, 2, 3]); // true
 * isArrayLike('abc'); // true
 * isArrayLike({ 0: 'a', length: 1 }); // true
 * isArrayLike({}); // false
 * isArrayLike(null); // false
 * isArrayLike(undefined); // false
 */
export function isArrayLike(value?: any): boolean {
  return value != null && typeof value !== 'function' && isLength((value as ArrayLike<unknown>).length);
}
