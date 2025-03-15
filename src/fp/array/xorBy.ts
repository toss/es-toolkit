import { xorBy as xorByToolkit } from '../../array/xorBy';

/**
 * Creates a function that computes the symmetric difference between two arrays
 * using an iteratee function for comparison.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of the mapped elements.
 * @param {Array<T>} values - The values to compute the symmetric difference with.
 * @param {(value: T) => U} iteratee - The function to transform elements for comparison.
 * @returns {(arr: Array<T>) => Array<T>} A function that takes an array and returns a new array with the symmetric difference.
 *
 * @example
 * const objects = [{ 'x': 1 }, { 'x': 2 }];
 * const xorByX = xorBy([{ 'x': 2 }, { 'x': 3 }], value => value.x);
 * const result = xorByX(objects);
 * // => [{ 'x': 1 }, { 'x': 3 }]
 */
export function xorBy<T, U>(values: readonly T[], iteratee: (value: T) => U): (arr: readonly T[]) => T[];

/**
 * Computes the symmetric difference between two arrays using an iteratee function for comparison.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of the mapped elements.
 * @param {Array<T>} arr - The array to inspect.
 * @param {Array<T>} values - The values to compute the symmetric difference with.
 * @param {(value: T) => U} iteratee - The function to transform elements for comparison.
 * @returns {Array<T>} The new array of filtered values.
 *
 * @example
 * xorBy([{ 'x': 1 }, { 'x': 2 }], [{ 'x': 2 }, { 'x': 3 }], value => value.x);
 * // => [{ 'x': 1 }, { 'x': 3 }]
 */
export function xorBy<T, U>(arr: readonly T[], values: readonly T[], iteratee: (value: T) => U): T[];

export function xorBy<T, U>(
  arrOrValues: readonly T[],
  valuesOrIteratee: readonly T[] | ((value: T) => U),
  iteratee?: (value: T) => U
) {
  if (typeof valuesOrIteratee === 'function') {
    return (arr: readonly T[]) => xorBy(arr, arrOrValues, valuesOrIteratee);
  }

  return xorByToolkit(arrOrValues, valuesOrIteratee, iteratee!);
}
