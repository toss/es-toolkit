import { pull as pullToolkit } from '../../array/pull.ts';

/**
 * This method is like `_.pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `_.difference`, this method mutates `array`.
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {ArrayLike<T>} [values] - The values to remove.
 * @returns {T[]} Returns `array`.
 *
 * @example
 * var array = [1, 2, 3, 1, 2, 3];
 *
 * pullAll(array, [2, 3]);
 * console.log(array);
 * // => [1, 1]
 */
export function pullAll<T>(array: T[], values?: ArrayLike<T>): T[];

/**
 * This method is like `_.pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `_.difference`, this method mutates `array`.
 *
 * @template L
 * @param {L} array - The array to modify.
 * @param {ArrayLike<L[0]>} [values] - The values to remove.
 * @returns {L} Returns `array`.
 *
 * @example
 * var array = [1, 2, 3, 1, 2, 3];
 *
 * pullAll(array, [2, 3]);
 * console.log(array);
 * // => [1, 1]
 */
export function pullAll<L extends ArrayLike<any>>(array: L extends readonly any[] ? never : L, values?: ArrayLike<L[0]>): L;

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
