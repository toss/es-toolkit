import { maxBy as maxByToolkit } from '../../array/maxBy';

/**
 * Creates a function that finds the element with the maximum value in an array
 * using the provided value selector function.
 *
 * @template T - The type of elements in the array.
 * @param {(element: T) => number} getValue - The function to get the value to compare.
 * @returns {(arr: [T, ...T[]]) => T} A function that takes an array and returns the element with the maximum value.
 *
 * @example
 * const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * const maxByValue = maxBy(obj => obj.value);
 * const result = maxByValue(objects);
 * // result will be { value: 3 }
 */
export function maxBy<T>(
  getValue: (element: T) => number
): (arr: readonly [T, ...T[]]) => T;
/**
 * Creates a function that finds the element with the maximum value in an array
 * using the provided value selector function.
 *
 * @template T - The type of elements in the array.
 * @param {(element: T) => number} getValue - The function to get the value to compare.
 * @returns {(arr: T[]) => T | undefined} A function that takes an array and returns the element with the maximum value.
 *
 * @example
 * const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * const maxByValue = maxBy(obj => obj.value);
 * const result = maxByValue(objects);
 * // result will be { value: 3 }
 */
export function maxBy<T>(
  getValue: (element: T) => number
): (arr: readonly T[]) => T | undefined;
/**
 * Finds the element in an array that has the maximum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {[T, ...T[]]} items The nonempty array of elements to search.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {T} The element with the maximum value as determined by the `getValue` function.
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
 * maxBy([], x => x.a); // Returns: undefined
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // Returns: { name: 'john', age: 30 }
 */
export function maxBy<T>(items: readonly [T, ...T[]], getValue: (element: T) => number): T;
/**
 * Finds the element in an array that has the maximum value when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {[T, ...T[]]} items The nonempty array of elements to search.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {T} The element with the maximum value as determined by the `getValue` function.
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: { a: 3 }
 * maxBy([], x => x.a); // Returns: undefined
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // Returns: { name: 'john', age: 30 }
 */
export function maxBy<T>(
  arr: readonly T[],
  getValue: (element: T) => number
): T | undefined;

export function maxBy<T>(
  arrOrGetValue: readonly T[] | ((element: T) => number),
  getValue?: (element: T) => number
) {
  if (getValue === undefined && typeof arrOrGetValue === 'function') {
    return (arr: readonly T[]) => maxBy(arr, arrOrGetValue as (element: T) => number);
  }

  const arr = arrOrGetValue as T[];
  return maxByToolkit(arr, getValue!);
}
