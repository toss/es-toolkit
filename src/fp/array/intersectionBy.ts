import { intersectionBy as intersectionByToolkit } from '../../array/intersectionBy';

/**
 * Creates a function that returns the intersection of two arrays based on a mapping function.
 *
 * @template T - The type of array.
 * @template U - The type of mapped elements.
 * @param {T} values - The values to inspect.
 * @param {(value: T[number]) => U} mapper - The function to map the elements.
 * @returns {(arr: T) => T} A function that takes an array and returns a new array with the intersection.
 *
 * @example
 * const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const intersectById = intersectionBy([{ id: 2 }, { id: 4 }], item => item.id);
 * const result = intersectById(objects);
 * // result will be [{ id: 2 }]
 */
export function intersectionBy<T extends unknown[], U>(
  values: T,
  mapper: (value: T[number]) => U
): (arr: T) => T;
/**
 * Returns the intersection of two arrays based on a mapping function.
 *
 * @template T - The type of array.
 * @template U - The type of mapped elements.
 * @param {T} arr - The array to inspect.
 * @param {T} values - The values to inspect.
 * @param {(value: T[number]) => U} mapper - The function to map the elements.
 * @returns {T} A new array with the intersection.
 *
 * @example
 * const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const result = intersectionBy(objects, [{ id: 2 }, { id: 4 }], item => item.id);
 * // result will be [{ id: 2 }]
 */
export function intersectionBy<T extends unknown[], U>(
  arr: T,
  values: T,
  mapper: (value: T[number]) => U
): T;

export function intersectionBy<T extends unknown[], U>(
  arrOrValues: T,
  valuesOrMapper: T | ((value: T[number]) => U),
  mapper?: (value: T[number]) => U
) {
  if (mapper === undefined && typeof valuesOrMapper === 'function') {
    return (arr: T) => intersectionBy(arr, arrOrValues, valuesOrMapper);
  }

  const arr = arrOrValues as T;
  const values = valuesOrMapper as T;
  return intersectionByToolkit(arr, values, mapper!) as T;
}
