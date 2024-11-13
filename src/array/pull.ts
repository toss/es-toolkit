/**
 * Removes all occurrences of the specified values from an array and returns the modified array.
 *
 * This function mutates the original array.
 *
 * @template T
 * @param {T[]} arr - The array from which elements will be removed.
 * @param {...T} values - The values to remove from the array.
 * @returns {T[]} The modified array with specified values removed.
 *
 * @example
 * import { pull } from './pull';
 *
 * const numbers = [1, 2, 3, 1, 2, 3];
 * pull(numbers, 1, 3);
 * console.log(numbers); // [2, 2]
 */
export function pull<T>(arr: T[], ...values: T[]): T[] {
    const valuesSet = new Set(values);

    for (let i = arr.length - 1; i >= 0; i--) {
      if (valuesSet.has(arr[i])) {
        arr.splice(i, 1);
      }
    }

    return arr;
  }
