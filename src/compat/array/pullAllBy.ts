import { MutableList } from '../_internal/MutableList';
import { RejectReadonly } from '../_internal/RejectReadonly';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Removes all specified values from an array using an iteratee function.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {ArrayLike<T>} [values] - The values to remove.
 * @param {((value: T) => unknown) | PropertyKey | [PropertyKey, any] | Partial<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
 * console.log(array);
 * // => [{ 'x': 2 }]
 */
export function pullAllBy<T>(array: T[], values?: ArrayLike<T>, iteratee?: ValueIteratee<T>): T[];

/**
 * Removes all specified values from an array using an iteratee function.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template L
 * @param {RejectReadonly<L>} array - The array to modify.
 * @param {ArrayLike<L[0]>} [values] - The values to remove.
 * @param {ValueIteratee<L[0]>} [iteratee] - The iteratee invoked per element.
 * @returns {L} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
 * console.log(array);
 * // => [{ 'x': 2 }]
 */
export function pullAllBy<L extends MutableList<any>>(
  array: RejectReadonly<L>,
  values?: ArrayLike<L[0]>,
  iteratee?: ValueIteratee<L[0]>
): L;

/**
 * Removes all specified values from an array using an iteratee function.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T, U
 * @param {T[]} array - The array to modify.
 * @param {ArrayLike<U>} values - The values to remove.
 * @param {((value: T | U) => unknown) | PropertyKey | [PropertyKey, any] | Partial<T | U>} iteratee - The iteratee invoked per element.
 * @returns {T[]} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
 * console.log(array);
 * // => [{ 'x': 2 }]
 */
export function pullAllBy<T, U>(array: T[], values: ArrayLike<U>, iteratee: ValueIteratee<T | U>): T[];

/**
 * Removes all specified values from an array using an iteratee function.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template L, U
 * @param {L} array - The array to modify.
 * @param {ArrayLike<U>} values - The values to remove.
 * @param {((value: L[0] | U) => unknown) | PropertyKey | [PropertyKey, any] | Partial<L[0] | U>} iteratee - The iteratee invoked per element.
 * @returns {L} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
 * console.log(array);
 * // => [{ 'x': 2 }]
 */
export function pullAllBy<L extends ArrayLike<any>, U>(
  array: L extends readonly any[] ? never : L,
  values: ArrayLike<U>,
  iteratee: ValueIteratee<L[0] | U>
): L;

/**
 * Removes all specified values from an array using an iteratee function.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `differenceBy`.
 *
 * @template T
 * @param {T[]} arr - The array to modify.
 * @param {ArrayLike<T>} valuesToRemove - The values to remove from the array.
 * @param {keyof T} getValue - The key of the property to match against each element.
 * @returns {T[]} The modified array with the specified values removed.
 *
 * @example
 * // Using a iteratee function
 * const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
 * const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], obj => obj.value);
 * console.log(result); // [{ value: 2 }]
 *
 * // Using a property name
 * const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
 * const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], 'value');
 * console.log(result); // [{ value: 2 }]
 */
export function pullAllBy(arr: any, valuesToRemove: any, _getValue: any): any {
  const getValue = iteratee(_getValue);
  const valuesSet = new Set(Array.from(valuesToRemove).map(x => getValue(x)));

  let resultIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    const value = getValue(arr[i]);

    if (valuesSet.has(value)) {
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
