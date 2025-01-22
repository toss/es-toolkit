import { unionBy as unionByToolkit } from '../../array/unionBy';

/**
 * Creates a function that creates a new array of unique values by the iteratee function.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of the mapped elements.
 * @param {Array<T>} values - The values to include in the union.
 * @param {(value: T) => U} iteratee - The function to map the elements.
 * @returns {(arr: Array<T>) => Array<T>} A function that takes an array and returns a new array with unique values.
 *
 * @example
 * const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }];
 * const unionByX = unionBy([{ 'x': 2 }, { 'x': 3 }], value => value.x);
 * const result = unionByX(array);
 * // => [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }]
 */
export function unionBy<T, U>(values: readonly T[], iteratee: (value: T) => U): (arr: readonly T[]) => T[];

/**
 * Creates a new array of unique values by the iteratee function.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of the mapped elements.
 * @param {Array<T>} arr - The array to inspect.
 * @param {Array<T>} values - The values to include in the union.
 * @param {(value: T) => U} iteratee - The function to map the elements.
 * @returns {Array<T>} The new array of combined unique values.
 */
export function unionBy<T, U>(arr: readonly T[], values: readonly T[], iteratee: (value: T) => U): T[];

export function unionBy<T, U>(
  arrOrValues: readonly T[],
  valuesOrIteratee: readonly T[] | ((value: T) => U),
  iteratee?: (value: T) => U
) {
  if (typeof valuesOrIteratee === 'function') {
    return (arr: readonly T[]) => unionBy(arr, arrOrValues, valuesOrIteratee);
  }

  return unionByToolkit(arrOrValues, valuesOrIteratee, iteratee!);
}
