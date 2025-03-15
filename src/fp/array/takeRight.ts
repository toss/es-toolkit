import { takeRight as takeRightToolkit } from "../../array/takeRight";

/**
 * Returns a new array containing the last `count` elements from the input array `arr`.
 * If `count` is greater than the length of `arr`, the entire array is returned.
 *
 * @template T - The type of elements in the array.
 * @param {number} - The number of elements to take.
 * @returns {(arr: T[]) =>T[]} A new array containing the last `count` elements from `arr`.
 *
 * @example
 * // Returns [4, 5]
 * takeRight(2)([1, 2, 3, 4, 5]);
 *
 * @example
 * // Returns ['b', 'c']
 * takeRight(2)(['a', 'b', 'c']);
 *
 * @example
 * // Returns [1, 2, 3]
 * takeRight(5)([1, 2, 3]);
 */
export function takeRight<T>(count: number): (arr: T[]) =>T[];

/**
 * Returns a new array containing the last `count` elements from the input array `arr`.
 * If `count` is greater than the length of `arr`, the entire array is returned.
 *
 * @template T - The type of elements in the array.
 * @param {number} - The number of elements to take.
 * @returns {T[]} A function that receive the array to take elements from as an argument and returns new array containing the last `count` elements from `arr`.
 *
 * @example
 * // Returns [4, 5]
 * takeRight([1, 2, 3, 4, 5], 2);
 *
 * @example
 * // Returns ['b', 'c']
 * takeRight(['a', 'b', 'c'], 2);
 *
 * @example
 * // Returns [1, 2, 3]
 * takeRight([1, 2, 3], 5);
 */
export function takeRight<T>(arr: T[], count: number): T[];

export function takeRight<T>(arrOrCount: T[] | number, count?: number) {
  if(count == null) {
    return (arr: T[]) => takeRight(arr, arrOrCount as number);
  }

  const arr = arrOrCount as T[];
  return takeRightToolkit(arr, count);
}
