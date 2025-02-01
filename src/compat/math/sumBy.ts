import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Computes the sum of the `number` values in `array`.
 *
 * @param {ArrayLike<number> | null | undefined} array - The array to iterate over.
 * @returns {number} Returns the sum.
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
 * @returns {bigint} Returns the sum.
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
 * @returns {unknown} Returns the sum.
 *
 * @example
 * sumBy(["1", "2"]); // => "12"
 * sumBy([1, undefined, 2]); // => 3
 */
export function sumBy(array: ArrayLike<unknown> | null | undefined): unknown;

/**
 * Computes the sum of the `number` values that are returned by the `iteratee` function.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T>} array - The array to iterate over.
 * @param {(value: T) => number} iteratee - The function invoked per iteration.
 * @returns {number} Returns the sum.
 *
 * @example
 * sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], object => object.a); // => 6
 */
export function sumBy<T>(array: ArrayLike<T>, iteratee: (value: T) => number): number;

/**
 * Computes the sum of the `bigint` values that are returned by the `iteratee` function.
 *
 * NOTE: If the `array` is empty, the function returns `0`.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T>} array - The array to iterate over.
 * @param {(value: T) => bigint} iteratee - The function invoked per iteration.
 * @returns {bigint | number} Returns the sum.
 *
 * @example
 * sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], object => object.a); // => 6n
 * sumBy([], (item: { a: bigint }) => item.a); // => 0
 */
export function sumBy<T>(array: ArrayLike<T>, iteratee: (value: T) => bigint): bigint | number;

/**
 * Computes the sum of the values that are returned by the `iteratee` function.
 *
 * It does not coerce values to `number`.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T> | null | undefined} array - The array to iterate over.
 * @param {(value: T) => number | bigint} iteratee - The function invoked per iteration.
 * @returns {unknown} Returns the sum.
 *
 * @example
 * sumBy([1, undefined, 2], value => value); // => 3
 * sumBy(null); // => 0
 * sumBy(undefined); // => 0
 * sumBy([1, 2, 3]); // => 6
 * sumBy([1n, 2n, 3n]); // => 6n
 * sumBy([{ a: "1" }, { a: "2" }], object => object.a); // => "12"
 */
export function sumBy<T>(array: ArrayLike<T> | null | undefined, iteratee?: (value: T) => number | bigint): unknown {
  if (!array || !array.length) {
    return 0;
  }

  if (iteratee != null) {
    iteratee = iterateeToolkit(iteratee);
  }

  let result: any = undefined;

  for (let i = 0; i < array.length; i++) {
    const current = iteratee ? iteratee(array[i]) : array[i];

    if (current !== undefined) {
      if (result === undefined) {
        result = current;
      } else {
        result += current;
      }
    }
  }

  return result;
}
