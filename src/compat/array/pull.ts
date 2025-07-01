import { pull as pullToolkit } from '../../array/pull.ts';

/**
 * Removes all provided values from array using SameValueZero for equality comparisons.
 *
 * **Note:** Unlike `_.without`, this method mutates `array`.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of values to remove from the array.
 * @param {T[]} array - The array to modify.
 * @param {...U[]} values - The values to remove.
 * @returns {T[]} Returns `array`.
 *
 * @example
 * var array = [1, 2, 3, 1, 2, 3];
 *
 * pull(array, 2, 3);
 * console.log(array);
 * // => [1, 1]
 */
export function pull<T, U extends T>(array: T[], ...values: U[]): T[];

/**
 * Removes all provided values from array using SameValueZero for equality comparisons.
 *
 * **Note:** Unlike `_.without`, this method mutates `array`.
 *
 * @template L - The type of elements in the array-like object.
 * @param {L} array - The array to modify.
 * @param {...L[0][]} values - The values to remove.
 * @returns {L} Returns `array`.
 *
 * @example
 * var array = [1, 2, 3, 1, 2, 3];
 *
 * pull(array, 2, 3);
 * console.log(array);
 * // => [1, 1]
 */
export function pull<L extends ArrayLike<any>>(array: L extends readonly any[] ? never : L, ...values: Array<L[0]>): L;

/**
 * Removes all specified values from an array.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `difference`.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of values to remove from the array.
 * @param {T[]} arr - The array to modify.
 * @param {U[]} valuesToRemove - The values to remove from the array.
 * @returns {T[]} The modified array with the specified values removed.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 2, 4];
 * pull(numbers, [2, 4]);
 * console.log(numbers); // [1, 3, 5]
 */
export function pull<T, U extends T>(arr: T[], ...valuesToRemove: readonly U[]): T[] {
  return pullToolkit(arr, valuesToRemove);
}
