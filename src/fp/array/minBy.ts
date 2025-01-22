import { minBy as minByToolkit } from '../../array/minBy';

/**
 * Creates a function that finds the element with the minimum value in an array
 * using the provided value selector function.
 *
 * @template T - The type of array.
 * @param {(element: T[number]) => number} getValue - The function to get the value to compare.
 * @returns {(arr: T) => T['length'] extends 0 ? undefined : T[number]} A function that takes an array and returns the element with the minimum value.
 *
 * @example
 * const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * const minByValue = minBy(obj => obj.value);
 * const result = minByValue(objects);
 * // result will be { value: 1 }
 */
export function minBy<T extends unknown[]>(
  getValue: (element: T[number]) => number
): (arr: T) => T['length'] extends 0 ? undefined : T[number];
/**
 * Finds the element in an array that has the minimum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of array.
 * @param {T} arr The nonempty array of elements to search.
 * @param {(element: T[number]) => number} getValue A function that selects a numeric value from each element.
 * @returns {T['length'] extends 0 ? undefined : T[number]} The element with the minimum value as determined by the `getValue` function.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 1 }
 * minBy([], x => x.a); // Returns: undefined
 * minBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // Returns: { name: 'joe', age: 26 }
 */
export function minBy<T extends unknown[]>(
  arr: T,
  getValue: (element: T[number]) => number
): T['length'] extends 0 ? undefined : T[number];

export function minBy<T extends unknown[]>(
  arrOrGetValue: T | ((element: T[number]) => number),
  getValue?: (element: T[number]) => number
) {
  if (getValue === undefined && typeof arrOrGetValue === 'function') {
    return (arr: T) => minBy(arr, arrOrGetValue as (element: T[number]) => number);
  }

  const arr = arrOrGetValue as T[];
  return minByToolkit(arr, getValue!);
}
