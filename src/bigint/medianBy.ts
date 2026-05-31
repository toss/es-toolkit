import { median } from './median.ts';

/**
 * Calculates the median of an array of elements when applying
 * the `getValue` function to each element.
 *
 * The median is the middle value of a sorted array.
 * If the array has an odd number of elements, the median is the middle value.
 * If the array has an even number of elements, it returns the average of the two middle values,
 * truncated toward zero because bigints are integers.
 *
 * If the array is empty, this function returns `undefined`.
 *
 * @template T - The type of elements in the array.
 * @param {readonly T[]} items - An array to calculate the median.
 * @param {(element: T) => bigint} getValue - A function that selects a bigint value from each element.
 * @returns {bigint | undefined} The median as determined by the `getValue` function, or `undefined` if the array is empty.
 *
 * @example
 * medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }, { a: 5n }], x => x.a); // Returns: 3n
 * medianBy([{ a: 1n }, { a: 2n }, { a: 3n }, { a: 4n }], x => x.a); // Returns: 2n
 * medianBy([], x => x.a); // Returns: undefined
 */
export function medianBy<T>(items: readonly T[], getValue: (element: T) => bigint): bigint | undefined {
  const nums = items.map(x => getValue(x));

  return median(nums);
}
