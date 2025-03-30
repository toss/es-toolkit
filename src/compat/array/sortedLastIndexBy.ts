import { sortedIndexBy } from './sortedIndexBy';

type PropertyName = string | number | symbol;

type Iteratee<T, R> = ((value: T) => R) | PropertyName | [PropertyName, any] | Partial<T>;

/**
 * This method is like `sortedLastIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @param {ArrayLike<T> | null | undefined} array The sorted array to inspect.
 * @param {T} value The value to evaluate.
 * @param {(value: T) => R} iteratee The iteratee invoked per element.
 * @returns {number} Returns the highest index at which `value` should be inserted
 *  into `array`.
 * @example
 * const objects = [{ 'n': 4 }, { 'n': 5 }]
 * sortedLastIndexBy(objects, { 'n': 4 }, ({ n }) => n)
 * // => 1
 */
export function sortedLastIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee?: Iteratee<T, R>
): number {
  return sortedIndexBy(array, value, iteratee, true);
}
