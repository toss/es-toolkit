import { differenceBy as differenceByToolkit } from '../../array/differenceBy';

/**
 * Computes the difference between two arrays after mapping their elements through a provided function.
 *
 * @template T - The type of array.
 * @template U - The type of the mapped value.
 * @param {(value: T[number]) => U} mapper - The function to map the elements.
 * @returns {(arr: T) => T} A function that takes an array and returns a new array with the difference.
 *
 * @example
 * const numbers = [2.1, 1.2, 3.3];
 * const diffByFloor = differenceBy(Math.floor);
 * const result = diffByFloor([2.1, 1.2]);
 * // result will be [3.3]
 */
export function differenceBy<T extends unknown[], U>(
  values: T,
  mapper: (value: T[number]) => U
): (arr: T) => T;
/**
 * Computes the difference between two arrays after mapping their elements through a provided function.
 *
 * @template T - The type of array.
 * @template U - The type of the mapped value.
 * @param {T} arr - The array to inspect.
 * @param {T} values - The values to exclude.
 * @param {(value: T[number]) => U} mapper - The function to map the elements.
 * @returns {T} A new array with the difference.
 *
 * @example
 * const numbers = [2.1, 1.2, 3.3];
 * const result = differenceBy(numbers, [2.1, 1.2], Math.floor);
 * // result will be [3.3]
 */
export function differenceBy<T extends unknown[], U>(
  arr: T,
  values: T,
  mapper: (value: T[number]) => U
): T;

export function differenceBy<T extends unknown[], U>(
  arrOrValues: T,
  valuesOrMapper: T | ((value: T[number]) => U),
  mapper?: (value: T[number]) => U
) {
  if (mapper === undefined && typeof valuesOrMapper === 'function') {
    return (arr: T) => differenceBy(arr, arrOrValues, valuesOrMapper);
  }

  const arr = arrOrValues as T;
  const values = valuesOrMapper as T;
  return differenceByToolkit(arr, values, mapper!) as T;
}
