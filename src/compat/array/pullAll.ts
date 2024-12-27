import { pull as pullToolkit } from '../../array/pull.ts';

/**
 * Removes all specified values from an array.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `difference`.
 *
 * @template T
 * @param {T[]} arr - The array to modify.
 * @param {ArrayLike<T>} valuesToRemove - The values to remove from the array.
 * @returns {T[]} The modified array with the specified values removed.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 2, 4];
 * pullAll(numbers, [2, 4]);
 * console.log(numbers); // [1, 3, 5]
 */
export function pullAll<T>(arr: T[], valuesToRemove: ArrayLike<T> = []): T[] {
  return pullToolkit(arr, Array.from(valuesToRemove));
}
