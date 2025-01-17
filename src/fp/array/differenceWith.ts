import { differenceWith as differenceWithToolkit } from '../../array/differenceWith';

/**
 * Computes the difference between two arrays using a custom comparator function.
 *
 * @template T - The type of array.
 * @param {T} values - The values to exclude.
 * @param {(x: T[number], y: T[number]) => boolean} comparator - The function to compare elements.
 * @returns {(arr: T) => T} A function that takes an array and returns a new array with the difference.
 *
 * @example
 * const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const diffByX = differenceWith([{ x: 1 }, { x: 2 }], (a, b) => a.x === b.x);
 * const result = diffByX(objects);
 * // result will be [{ x: 3 }]
 */
export function differenceWith<T extends unknown[]>(
  values: T,
  comparator: (x: T[number], y: T[number]) => boolean
): (arr: T) => T;
/**
 * Computes the difference between two arrays using a custom comparator function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to inspect.
 * @param {T} values - The values to exclude.
 * @param {(x: T[number], y: T[number]) => boolean} comparator - The function to compare elements.
 * @returns {T} A new array with the difference.
 *
 * @example
 * const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const result = differenceWith(objects, [{ x: 1 }, { x: 2 }], (a, b) => a.x === b.x);
 * // result will be [{ x: 3 }]
 */
export function differenceWith<T extends unknown[]>(
  arr: T,
  values: T,
  comparator: (x: T[number], y: T[number]) => boolean
): T;

export function differenceWith<T extends unknown[]>(
  arrOrValues: T,
  valuesOrComparator: T | ((x: T[number], y: T[number]) => boolean),
  comparator?: (x: T[number], y: T[number]) => boolean
) {
  if (comparator === undefined && typeof valuesOrComparator === 'function') {
    return (arr: T) => differenceWith(arr, arrOrValues, valuesOrComparator);
  }

  const arr = arrOrValues as T;
  const values = valuesOrComparator as T;
  return differenceWithToolkit(arr, values, comparator!) as T;
}
