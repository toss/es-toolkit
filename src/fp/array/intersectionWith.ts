import { intersectionWith as intersectionWithToolkit } from '../../array/intersectionWith';

/**
 * Creates a function that returns the intersection of two arrays using a comparator function.
 *
 * @template T - The type of array.
 * @param {T} values - The values to inspect.
 * @param {(a: T[number], b: T[number]) => boolean} comparator - The comparator invoked per element.
 * @returns {(arr: T) => T} A function that takes an array and returns a new array with the intersection.
 *
 * @example
 * const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const intersectBySum = intersectionWith([{ x: 1, y: 1 }], (a, b) => a.x + a.y === b.x + b.y);
 * const result = intersectBySum(objects);
 * // result will be [{ x: 2, y: 1 }]
 */
export function intersectionWith<T extends unknown[]>(
  values: T,
  comparator: (a: T[number], b: T[number]) => boolean
): (arr: T) => T;
/**
 * Returns the intersection of two arrays using a comparator function.
 *
 * @template T - The type of array.
 * @param {T} arr - The array to inspect.
 * @param {T} values - The values to inspect.
 * @param {(a: T[number], b: T[number]) => boolean} comparator - The comparator invoked per element.
 * @returns {T} A new array with the intersection.
 *
 * @example
 * const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const result = intersectionWith(objects, [{ x: 1, y: 1 }], (a, b) => a.x + a.y === b.x + b.y);
 * // result will be [{ x: 2, y: 1 }]
 */
export function intersectionWith<T extends unknown[]>(
  arr: T,
  values: T,
  comparator: (a: T[number], b: T[number]) => boolean
): T;

export function intersectionWith<T extends unknown[]>(
  arrOrValues: T,
  valuesOrComparator: T | ((a: T[number], b: T[number]) => boolean),
  comparator?: (a: T[number], b: T[number]) => boolean
) {
  if (comparator === undefined && typeof valuesOrComparator === 'function') {
    return (arr: T) => intersectionWith(arr, arrOrValues, valuesOrComparator);
  }

  const arr = arrOrValues as T;
  const values = valuesOrComparator as T;
  return intersectionWithToolkit(arr, values, comparator!) as T;
}
