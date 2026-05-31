import { sumBy } from './sumBy.ts';

/**
 * Calculates the average of an array of elements when applying
 * the `getValue` function to each element.
 *
 * Because bigints are integers, the result is truncated toward zero, following the behavior of BigInt division.
 *
 * If the array is empty, this function returns `undefined`.
 *
 * @template T - The type of elements in the array.
 * @param {readonly T[]} items - An array to calculate the average.
 * @param {(element: T) => bigint} getValue - A function that selects a bigint value from each element.
 * @returns {bigint | undefined} The average as determined by the `getValue` function, or `undefined` if the array is empty.
 *
 * @example
 * meanBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a); // Returns: 2n
 * meanBy([], x => x.a); // Returns: undefined
 */
export function meanBy<T>(items: readonly T[], getValue: (element: T) => bigint): bigint | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return sumBy(items, item => getValue(item)) / BigInt(items.length);
}
