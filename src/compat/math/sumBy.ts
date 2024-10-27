import { iteratee as iterateeToolkit } from '../util/iteratee';

/**
 * Computes the sum of the `number` values in `array`.
 *
 * @param {ArrayLike<number> | null | undefined} array - The array to iterate over.
 * @returns {number} - Returns the sum.
 *
 * @example
 * sumBy([1, 2, 3]); // => 6
 * sumBy(null); // => 0
 * sumBy(undefined); // => 0
 */
export function sumBy(array: ArrayLike<number> | null | undefined): number;

/**
 * Computes the sum of the `bigint` values in `array`.
 *
 * @param {ArrayLike<bigint>} array - The array to iterate over.
 * @returns {bigint} - Returns the sum.
 *
 * @example
 * sumBy([1n, 2n, 3n]); // => 6n
 */
export function sumBy(array: ArrayLike<bigint>): bigint;

/**
 * Computes the sum of the values in `array`.
 *
 * It does not coerce values to `number`.
 *
 * @param {ArrayLike<unknown> | null | undefined} array - The array to iterate over.
 * @returns {unknown} - Returns the sum.
 *
 * @example
 * sumBy(["1", "2"]); // => "12"
 * sumBy([1, undefined, 2]); // => 3
 */
export function sumBy(array: ArrayLike<unknown> | null | undefined): unknown;

/**
 * Compmutes the sum of the `number` values that are returned by the `iteratee` function.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T>} array - The array to iterate over.
 * @param {(value: T) => number} iteratee - The function invoked per iteration.
 * @returns {number} - Returns the sum.
 *
 * @example
 * sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], object => object.a); // => 6
 */
export function sumBy<T>(array: ArrayLike<T>, iteratee: (value: T) => number): number;

/**
 * Compmutes the sum of the `bigint` values that are returned by the `iteratee` function.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T>} array - The array to iterate over.
 * @param {(value: T) => bigint} iteratee - The function invoked per iteration.
 * @returns {bigint} - Returns the sum.
 *
 * @example
 * sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], object => object.a); // => 6n
 */
export function sumBy<T>(array: ArrayLike<T>, iteratee: (value: T) => bigint): bigint;

export function sumBy<T>(array: ArrayLike<T> | null | undefined, iteratee?: (value: T) => number | bigint): unknown {
  if (!array || !array.length) {
    return 0;
  }

  if (iteratee != null) {
    iteratee = iterateeToolkit(iteratee);
  }

  let result: any = iteratee ? iteratee(array[0]) : array[0];

  for (let i = 1; i < array.length; i++) {
    const current = iteratee ? iteratee(array[i]) : array[i];

    if (current !== undefined) {
      result += current;
    }
  }

  return result;
}
