import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Computes the sum of the values that are returned by the `iteratee` function.
 *
 * It does not coerce values to `number`.
 *
 * @template T - The type of the array elements.
 * @param {ArrayLike<T> | null | undefined} array - The array to iterate over.
 * @param {((value: T) => number) | string} iteratee - The function invoked per iteration.
 * @returns {number} Returns the sum.
 *
 * @example
 * sumBy([1, undefined, 2], value => value); // => 3
 * sumBy(null); // => 0
 * sumBy(undefined); // => 0
 * sumBy([1, 2, 3]); // => 6
 * sumBy([1n, 2n, 3n]); // => 6n
 * sumBy([{ a: "1" }, { a: "2" }], object => object.a); // => "12"
 */
export function sumBy<T>(array: ArrayLike<T> | null | undefined, iteratee?: ((value: T) => number) | string): number {
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
