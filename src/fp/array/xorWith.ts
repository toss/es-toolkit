import { xorWith as xorWithToolkit } from '../../array/xorWith';

/**
 * Creates a function that computes the symmetric difference between two arrays
 * using a comparator function.
 *
 * @template T - The type of elements in the array.
 * @param {Array<T>} values - The values to compute the symmetric difference with.
 * @param {(a: T, b: T) => boolean} comparator - The function to compare elements.
 * @returns {(arr: Array<T>) => Array<T>} A function that takes an array and returns a new array with the symmetric difference.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * const isEqual = (a, b) => a.x === b.x && a.y === b.y;
 * const xorWithEqual = xorWith(others, isEqual);
 * const result = xorWithEqual(objects);
 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
export function xorWith<T>(values: readonly T[], comparator: (a: T, b: T) => boolean): (arr: readonly T[]) => T[];

/**
 * Computes the symmetric difference between two arrays using a comparator function.
 *
 * @template T - The type of elements in the array.
 * @param {Array<T>} arr - The array to inspect.
 * @param {Array<T>} values - The values to compute the symmetric difference with.
 * @param {(a: T, b: T) => boolean} comparator - The function to compare elements.
 * @returns {Array<T>} The new array of filtered values.
 *
 * @example
 * const isEqual = (a, b) => a.x === b.x && a.y === b.y;
 * xorWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], isEqual);
 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
export function xorWith<T>(arr: readonly T[], values: readonly T[], comparator: (a: T, b: T) => boolean): T[];

export function xorWith<T>(
  arrOrValues: readonly T[],
  valuesOrComparator: readonly T[] | ((a: T, b: T) => boolean),
  comparator?: (a: T, b: T) => boolean
) {
  if (typeof valuesOrComparator === 'function') {
    return (arr: readonly T[]) => xorWith(arr, arrOrValues, valuesOrComparator);
  }

  return xorWithToolkit(arrOrValues, valuesOrComparator, comparator!);
}
