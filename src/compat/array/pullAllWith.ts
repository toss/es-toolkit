import copyArray from '../_internal/copyArray.ts';
import { eq } from '../util/eq.ts';

/**
 * Removes and returns elements from an array using a provided comparison function to determine which elements to remove.
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {T[]} values - The values to remove from the array.
 * @param {(a: T, b: T) => boolean} comparator - The function to compare elements of `array` with elements of `values`. Should return `true` if the two elements are considered equal.
 * @returns {T[]} - The array with specified values removed.
 *
 * @example
 * const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
 * const valuesToRemove = [{ x: 3, y: 4 }];
 *
 * const result = pullAllWith(array, valuesToRemove, isEqual);
 *
 * console.log(result); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 */
export function pullAllWith<T>(array: T[], values?: T[], comparator?: (a: T, b: T) => boolean): T[];

export function pullAllWith<T>(
  array: ArrayLike<T>,
  values?: ArrayLike<T>,
  comparator?: (a: T, b: T) => boolean
): ArrayLike<T>;

/**
 * Removes and returns elements from an array using a provided comparison function to determine which elements to remove.
 *
 * @template T1
 * @template T2
 * @param {T1[]} array - The array to modify.
 * @param {ArrayLike<T2>} values - The values to remove from the array.
 * @param {(a: T1, b: T2) => boolean} comparator - The function to compare elements of `array` with elements of `values`. Should return `true` if the two elements are considered equal.
 * @returns {T1[]} - The array with specified values removed.
 *
 * @example
 * const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
 * const valuesToRemove = [{ x: 3, y: 4 }];
 *
 * const result = pullAllWith(array, valuesToRemove, isEqual);
 *
 * console.log(result); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 */
export function pullAllWith<T1, T2>(array: T1[], values: ArrayLike<T2>, comparator: (a: T1, b: T2) => boolean): T1[];

/**
 * Removes and returns elements from an array using a provided comparison function to determine which elements to remove.
 *
 * @template T1
 * @template T2
 * @param {T1[]} array - The array to modify.
 * @param {ArrayLike<T2>} values - The values to remove from the array.
 * @param {(a: T1, b: T2) => boolean} comparator - The function to compare elements of `array` with elements of `values`. Should return `true` if the two elements are considered equal.
 * @returns {ArrayLike<T1>} - The array with specified values removed.
 *
 * @example
 * const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
 * const valuesToRemove = [{ x: 3, y: 4 }];
 *
 * const result = pullAllWith(array, valuesToRemove, isEqual);
 *
 * console.log(result); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 */
export function pullAllWith<T1, T2>(
  array: ArrayLike<T1>,
  values: ArrayLike<T2>,
  comparator: (a: T1, b: T2) => boolean
): ArrayLike<T1>;

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
