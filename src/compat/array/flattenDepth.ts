import { flatten } from './flatten.ts';

/**
 * Recursively flattens array up to depth times.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to flatten.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {T[]} Returns the new flattened array.
 *
 * @example
 * const array = [1, [2, [3, [4]], 5]];
 *
 * flattenDepth(array, 1);
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2);
 * // => [1, 2, 3, [4], 5]
 */
export function flattenDepth<T>(array: ArrayLike<T> | null | undefined, depth?: number): T[];

/**
 * Recursively flattens array up to depth times.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to flatten.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {T[]} Returns the new flattened array.
 *
 * @example
 * const array = [1, [2, [3, [4]], 5]];
 *
 * flattenDepth(array, 1);
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2);
 * // => [1, 2, 3, [4], 5]
 */
export function flattenDepth<T>(value: ArrayLike<T> | null | undefined, depth = 1): T[] {
  return flatten(value, depth) as T[];
}
