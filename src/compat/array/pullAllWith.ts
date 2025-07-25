import copyArray from '../_internal/copyArray.ts';
import { MutableList } from '../_internal/MutableList';
import { RejectReadonly } from '../_internal/RejectReadonly';
import { eq } from '../util/eq.ts';

/**
 * This method is like `_.pullAll` except that it accepts `comparator` which is
 * invoked to compare elements of array to values. The comparator is invoked with
 * two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {ArrayLike<T>} [values] - The values to remove.
 * @param {(a: T, b: T) => boolean} [comparator] - The comparator invoked per element.
 * @returns {T[]} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
 * console.log(array);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
export function pullAllWith<T>(array: T[], values?: ArrayLike<T>, comparator?: (a: T, b: T) => boolean): T[];

/**
 * This method is like `_.pullAll` except that it accepts `comparator` which is
 * invoked to compare elements of array to values. The comparator is invoked with
 * two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
 *
 * @template L
 * @param {RejectReadonly<L>} array - The array to modify.
 * @param {List<L[0]>} [values] - The values to remove.
 * @param {Comparator<L[0]>} [comparator] - The comparator invoked per element.
 * @returns {L} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
 * console.log(array);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
export function pullAllWith<L extends MutableList<any>>(
  array: RejectReadonly<L>,
  values?: ArrayLike<L[0]>,
  comparator?: (a: L[0], b: L[0]) => boolean
): L;

/**
 * This method is like `_.pullAll` except that it accepts `comparator` which is
 * invoked to compare elements of array to values. The comparator is invoked with
 * two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
 *
 * @template T, U
 * @param {T[]} array - The array to modify.
 * @param {ArrayLike<U>} values - The values to remove.
 * @param {(a: T, b: U) => boolean} comparator - The comparator invoked per element.
 * @returns {T[]} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
 * console.log(array);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
export function pullAllWith<T, U>(array: T[], values: ArrayLike<U>, comparator: (a: T, b: U) => boolean): T[];

/**
 * This method is like `_.pullAll` except that it accepts `comparator` which is
 * invoked to compare elements of array to values. The comparator is invoked with
 * two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
 *
 * @template L1, L2
 * @param {RejectReadonly<L1>} array - The array to modify.
 * @param {List<L2>} values - The values to remove.
 * @param {Comparator2<L1[0], L2>} comparator - The comparator invoked per element.
 * @returns {L1} Returns `array`.
 *
 * @example
 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
 * console.log(array);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
export function pullAllWith<L1 extends MutableList<any>, L2>(
  array: RejectReadonly<L1>,
  values: ArrayLike<L2>,
  comparator: (a: L1[0], b: L2) => boolean
): L1;

/**
 * Removes and returns elements from an array using a provided comparison function to determine which elements to remove.
 *
 * @template T
 * @param {T[] | ArrayLike<T>} array - The array to modify.
 * @param {T[] | ArrayLike<T>} values - The values to remove from the array.
 * @param {(a: T, b: T) => boolean} comparator - The function to compare elements of `array` with elements of `values`. Should return `true` if the two elements are considered equal.
 * @returns {T[] | ArrayLike<T>} - The array with specified values removed.
 *
 * @example
 * import pullAllWith from './pullAllWith';
 * import isEqual from '../predicate';
 *
 * const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
 * const valuesToRemove = [{ x: 3, y: 4 }];
 *
 * const result = pullAllWith(array, valuesToRemove, isEqual);
 *
 * console.log(result); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 * console.log(array);  // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 */
export function pullAllWith<T>(
  array: T[] | ArrayLike<T>,
  values?: T[] | ArrayLike<T>,
  comparator?: (a: T, b: T) => boolean
): T[] | ArrayLike<T> {
  if (array?.length == null || values?.length == null) {
    return array;
  }

  if (array === values) {
    values = copyArray(values);
  }

  let resultLength = 0;

  if (comparator == null) {
    comparator = (a, b) => eq(a, b);
  }

  const valuesArray = Array.isArray(values) ? values : Array.from(values);
  const hasUndefined = valuesArray.includes(undefined as any);

  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      const shouldRemove = valuesArray.some(value => comparator(array[i], value));

      if (!shouldRemove) {
        (array as any)[resultLength++] = array[i];
      }

      continue;
    }

    // For handling sparse arrays
    if (!hasUndefined) {
      delete (array as any)[resultLength++];
    }
  }

  (array as any).length = resultLength;

  return array;
}
