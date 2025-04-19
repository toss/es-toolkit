import { flatten } from './flatten.ts';
import { last } from './last.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { isKey } from '../_internal/isKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { at } from '../object/at.ts';
import { get } from '../object/get.ts';
import { isArray } from '../predicate/isArray.ts';
import { toPath } from '../util/toPath.ts';

/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * @template T
 * @param {T[]} array - The array from which elements will be removed.
 * @param {Array<number | readonly number[] | string | readonly string[]>} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {T[]} An array containing the elements that were removed from the original array.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = pullAt(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 */
export function pullAt<T>(
  array: T[],
  ...indicesToRemove: Array<number | readonly number[] | string | readonly string[]>
): T[];

/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array from which elements will be removed.
 * @param {Array<number | readonly number[] | string | readonly string[]>} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {ArrayLike<T>} An array containing the elements that were removed from the original array.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = pullAt(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 */
export function pullAt<T>(
  array: ArrayLike<T>,
  ...indicesToRemove: Array<number | readonly number[] | string | readonly string[]>
): ArrayLike<T>;

/**
 * Removes elements from an array at specified indices and returns the removed elements.
 *
 * @template T
 * @param {ArrayLike<T>} array - The array from which elements will be removed.
 * @param {Array<number | readonly number[] | string | readonly string[]>} indicesToRemove - An array of indices specifying the positions of elements to remove.
 * @returns {ArrayLike<T>} An array containing the elements that were removed from the original array.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const removed = pullAt(numbers, [1, 3, 4]);
 * console.log(removed); // [20, 40, 50]
 * console.log(numbers); // [10, 30]
 */
export function pullAt<T>(
  array: ArrayLike<T>,
  ...indicesToRemove: Array<number | readonly number[] | string | readonly string[]>
): ArrayLike<T> {
  const flattenIndexes = flatten(indicesToRemove, 1);
  const result = at(array, flattenIndexes);
  if (!array) {
    return result as T[];
  }

  const arrayLength = array ? array.length : 0;
  const indexes = new Set(
    flattenIndexes
      .map(index => (isIndex(index, arrayLength) ? Number(index) : index))
      .sort((a, b) => (b as any) - (a as any))
  );

  for (const index of indexes) {
    if (isIndex(index)) {
      Array.prototype.splice.call(array, index as number, 1);
    } else if (!isKey(index, array)) {
      const path = isArray(index) ? index : toPath(index);
      const object = array.length === 1 ? array : get(array, path.slice(0, -1));

      if (object != null) {
        delete object[toKey(last(path))];
      }
    } else {
      delete (array as any)[toKey(index)];
    }
  }
  return result as T[];
}
