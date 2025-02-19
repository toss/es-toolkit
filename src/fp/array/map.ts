/**
 * Map each values of array by mapper function.
 *
 * @template T - The type of array.
 * @template R - The type of mapped value.
 * @param {(value: T[number]) => R} mapper - The function that map each items to new value.
 * @returns {(arr: T) => R[]} A new array with mapped values.
 *
 * @example
 * const arr = [1, 2, 3];
 * const double = map(value => value * 2);
 * const result = double(arr);
 * // result will be [2, 4, 6]
 */
export function map<T extends unknown[], R>(mapper: (value: T[number]) => R): (arr: T) => R[];
/**
 * Map each values of array by mapper function.
 *
 * @template T - The type of array.
 * @template R - The type of mapped value.
 * @param {T} arr - The array to be mapped.
 * @param {(value: T[number]) => R} mapper - The function that map each items to new value.
 * @returns {R[]} A new array with mapped values.
 *
 * @example
 * const arr = [1, 2, 3];
 * const result = map(arr, value => value * 2);
 * // result will be [2, 4, 6]
 */
export function map<T extends unknown[], R>(arr: T, mapper: (value: T[number]) => R): R[];

export function map<T extends unknown[], R>(
  arrOrMapper: T | ((value: T[number]) => R),
  mapper?: (value: T[number]) => R
) {
  if (mapper == null) {
    return (arr: T) => map(arr, arrOrMapper as (value: T[number]) => R);
  }

  const arr = arrOrMapper as T[];
  const result = [];

  for (const item of arr) {
    result.push(mapper(item));
  }

  return result;
}
