import { identity } from "../../function";
import { iteratee as iterateeToolkit } from "../util/iteratee.ts";

/**
 * Removes all specified values from an array using a custom iteratee.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T
 * @param {T[]} arr - The array to modify.
 * @param {T[]} values - The values to remove from the array.
 * @param {(value: T) => unknown} iteratee - The iteratee invoked per element.
 * @returns {T[]} The modified array with the specified values removed.
 */
export function pullAllBy<T>(
  arr: T[],
  values: T[],
  iteratee: (value: T) => unknown,
): T[];

/**
 * Removes all specified values from an array using a custom iteratee.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T
 * @param {T[]} arr - The array to modify.
 * @param {T[]} values - The values to remove from the array.
 * @param {Partial<T>} iteratee - The iteratee invoked per element.
 * @returns {T[]} The modified array with the specified values removed.
 */
export function pullAllBy<T>(
  arr: T[],
  values: T[],
  iteratee: Partial<T>,
): T[];

/**
 * Removes all specified values from an array using a custom iteratee.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T
 * @param {T[]} arr - The array to modify.
 * @param {T[]} values - The values to remove from the array.
 * @param {[keyof T, unknown]} iteratee - The iteratee invoked per element.
 * @returns {T[]} The modified array with the specified values removed.
 */
export function pullAllBy<T>(
  arr: T[],
  values: T[],
  iteratee: [keyof T, unknown],
): T[];

/**
 * Removes all specified values from an array using a custom iteratee.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T, K
 * @param {T[]} arr - The array to modify.
 * @param {T[]} values - The values to remove from the array.
 * @param {K} iteratee - The iteratee invoked per element.
 * @returns {T[]} The modified array with the specified values removed.
 */
export function pullAllBy<T, K extends keyof T>(
  arr: T[],
  values: T[],
  iteratee: K,
): T[];

/**
 * Removes all specified values from an array using a custom iteratee.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T
 * @param {T[]} arr - The array to modify.
 * @param {T[]} values - The values to remove from the array.
 * @param {((value: any) => any) | PropertyKey | object | null} _iteratee - The iteratee invoked per element.
 * @returns {T[]} The modified array with the specified values removed.
 */
export function pullAllBy<T>(
  arr: T[],
  values: T[],
  _iteratee:
    | ((value: any) => any)
    | PropertyKey
    | object
    | null,
) {
  const iteratee = iterateeToolkit(_iteratee ?? identity);

  const valuesSet = new Set(values.map((x) => iteratee(x)));

  let resultIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (valuesSet.has(iteratee(arr[i]))) {
      continue;
    }

    // For handling sparse arrays
    if (!Object.hasOwn(arr, i)) {
      delete arr[resultIndex++];
      continue;
    }

    arr[resultIndex++] = arr[i];
  }

  arr.length = resultIndex;

  return arr;
}
