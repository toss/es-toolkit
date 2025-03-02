import { sortedIndex } from './sortedIndex';

/**
 * This method is like `indexOf` but performs a binary search on a sorted array.
 * @param {ArrayLike<T> | null | undefined} array The sorted array to inspect.
 * @param {T} value The value to search for.
 * @returns {number} Returns the index of the matched value, else -1.
 * @example
 *
 * sortedIndexOf([4,5,5,5,6], 5) => 1
 * sortedIndexOf([1.1, 2.2, 3.3], 2.2) => 1
 *
 */
export function sortedIndexOf<T>(array: ArrayLike<T> | null | undefined, value: T): number {
  if (!array?.length) return -1;

  const index = sortedIndex(array, value);
  if (index < array.length && areValuesEqual(array[index], value)) return index;
  return -1;
}

const areValuesEqual = <T>(a: T, b: T): boolean => Object.is(a, b);
