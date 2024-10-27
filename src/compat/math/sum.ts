import { sumBy } from './sumBy';

/**
 * Computes the sum of the `number` values in `array`.
 *
 * @param {ArrayLike<number> | null | undefined} array - The array to iterate over.
 * @returns {number} Returns the sum.
 *
 * @example
 * sum([1, 2, 3]); // => 6
 * sum(null); // => 0
 * sum(undefined); // => 0
 */
export function sum(array: ArrayLike<number> | null | undefined): number;

/**
 * Computes the sum of the `bigint` values in `array`.
 *
 * @param {ArrayLike<bigint>} array - The array to iterate over.
 * @returns {bigint} Returns the sum.
 *
 * @example
 * sum([1n, 2n, 3n]); // => 6n
 */
export function sum(array: ArrayLike<bigint>): bigint;

/**
 * Computes the sum of the values in `array`.
 *
 * It does not coerce values to `number`.
 *
 * @param {ArrayLike<unknown> | null | undefined} array - The array to iterate over.
 * @returns {unknown} Returns the sum.
 *
 * @example
 * sum(["1", "2"]); // => "12"
 * sum([1, undefined, 2]); // => 3
 */
export function sum(array: ArrayLike<unknown> | null | undefined): unknown;

export function sum(array: ArrayLike<unknown> | null | undefined): unknown {
  return sumBy(array);
}
