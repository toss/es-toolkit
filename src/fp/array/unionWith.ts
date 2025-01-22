import { unionWith as unionWithToolkit } from '../../array/unionWith';

/**
 * Creates a function that creates a new array of unique values using a comparator function.
 *
 * @template T - The type of elements in the array.
 * @param {Array<T>} values - The values to include in the union.
 * @param {(a: T, b: T) => boolean} comparator - The function to compare elements.
 * @returns {(arr: Array<T>) => Array<T>} A function that takes an array and returns a new array with unique values.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * const isEqual = (a, b) => a.x === b.x && a.y === b.y;
 * const unionWithEqual = unionWith(others, isEqual);
 * const result = unionWithEqual(objects);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
export function unionWith<T>(values: readonly T[], comparator: (a: T, b: T) => boolean): (arr: readonly T[]) => T[];

/**
 * Creates a new array of unique values using a comparator function.
 *
 * @template T - The type of elements in the array.
 * @param {Array<T>} arr - The array to inspect.
 * @param {Array<T>} values - The values to include in the union.
 * @param {(a: T, b: T) => boolean} comparator - The function to compare elements.
 * @returns {Array<T>} The new array of combined unique values.
 */
export function unionWith<T>(arr: readonly T[], values: readonly T[], comparator: (a: T, b: T) => boolean): T[];

export function unionWith<T>(
  arrOrValues: readonly T[],
  valuesOrComparator: readonly T[] | ((a: T, b: T) => boolean),
  comparator?: (a: T, b: T) => boolean
) {
  if (typeof valuesOrComparator === 'function') {
    return (arr: readonly T[]) => unionWith(arr, arrOrValues, valuesOrComparator);
  }

  return unionWithToolkit(arrOrValues, valuesOrComparator, comparator!);
}
