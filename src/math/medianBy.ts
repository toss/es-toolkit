import { median } from './median.ts';

/**
 * Calculates the median of an array of elements when applying
 * the `getValue` function to each element.
 *
 * The median is the middle value of a sorted array.
 * If the array has an odd number of elements, the median is the middle value.
 * If the array has an even number of elements, it returns the average of the two middle values.
 *
 * If the array is empty, this function returns `NaN`.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items An array to calculate the median.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {number} The median of all the numbers as determined by the `getValue` function.
 *
 * @example
 * medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // Returns: 3
 * medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // Returns: 2.5
 * medianBy([], x => x.a); // Returns: NaN
 */
export function medianBy<T>(items: readonly T[], getValue: (element: T) => number): number;

/**
 * Calculates the median of an array of elements when applying
 * the `getValue` function to each element, returning a bigint.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items An array to calculate the median.
 * @param {(element: T) => bigint} getValue A function that selects a bigint value from each element.
 * @returns {bigint} The median of all the bigints as determined by the `getValue` function.
 *
 * @example
 * medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }, { a: 5n }], x => x.a); // Returns: 3n
 */
export function medianBy<T>(items: readonly T[], getValue: (element: T) => bigint): bigint;

export function medianBy<T>(items: readonly T[], getValue: (element: T) => number | bigint): number | bigint {
  const nums = items.map(x => getValue(x));

  return median(nums as any);
}
