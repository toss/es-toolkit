import { flatMap as flatMapToolkit } from '../../array/flatMap';

export function flatMap<T extends unknown[], R>(mapper: (value: T[number]) => R[]): (arr: T) => R[];
/**
 * Map each values of array by mapper function and flatten the result.
 *
 * @template T - The type of array.
 * @template R - The type of mapped value.
 * @param {T} arr - The array to be mapped.
 * @param {(value: T[number]) => R[]} mapper - The function that map each items to array of new values.
 * @returns {R[]} A new flattened array with mapped values.
 *
 * @example
 * const arr = [1, 2, 3];
 * const result = flatMap(arr, value => [value, value * 2]);
 * // result will be [1, 2, 2, 4, 3, 6]
 */
export function flatMap<T extends unknown[], R>(arr: T, mapper: (value: T[number]) => R[]): R[];
/**
 * Map each values of array by mapper function and flatten the result.
 *
 * @template T - The type of array.
 * @template R - The type of mapped value.
 * @param {(value: T[number]) => R[]} mapper - The function that map each items to array of new values.
 * @returns {(arr: T) => R[]} A function that takes an array and returns flattened mapped values.
 *
 * @example
 * const arr = [1, 2, 3];
 * const duplicate = flatMap(value => [value, value]);
 * const result = duplicate(arr);
 * // result will be [1, 1, 2, 2, 3, 3]
 */
export function flatMap<T extends unknown[], R>(
  arrOrMapper: T | ((value: T[number]) => R[]),
  mapper?: (value: T[number]) => R[]
) {
  if (mapper == null) {
    return (arr: T) => flatMap(arr, arrOrMapper as (value: T[number]) => R[]);
  }

  const arr = arrOrMapper as T[];
  return flatMapToolkit(arr, mapper as any);
}
