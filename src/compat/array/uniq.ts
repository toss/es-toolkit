import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Creates a duplicate-free version of an array.
 *
 * This function takes an array and returns a new array containing only the unique values
 * from the original array, preserving the order of first occurrence.
 *
 * @template T - The type of elements in the array.
 * @param arr - The array to process.
 * @returns A new array with only unique values from the original array.
 *
 * @example
 * const array = [1, 2, 2, 3, 4, 4, 5];
 * const result = uniq(array);
 * // result will be [1, 2, 3, 4, 5]
 */
export function uniq<T>(arr: ArrayLike<T> | null | undefined): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  const set = new Set<T>();

  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i]);
  }

  return [...set];
}
