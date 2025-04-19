import { flatten } from './flatten.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { isKey } from '../_internal/isKey.ts';
import { toKey } from '../_internal/toKey.ts';
import { at } from '../object/at.ts';
import { unset } from '../object/unset.ts';
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
 * @param {Array<number | readonly number[] | string | readonly string[]>} _indices - An array of indices specifying the positions of elements to remove.
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
  ..._indices: Array<number | readonly number[] | string | readonly string[]>
): ArrayLike<T> {
  const indices = flatten(_indices, 1);

  if (!array) {
    return Array(indices.length);
  }

  const result = at(array, indices);

  const indicesToPull = indices
    .map(index => (isIndex(index, array.length) ? Number(index) : index))
    .sort((a: any, b: any) => b - a);

  for (const index of new Set(indicesToPull)) {
    if (isIndex(index, array.length)) {
      Array.prototype.splice.call(array, index as number, 1);
      continue;
    }

    if (isKey(index, array)) {
      delete (array as any)[toKey(index)];
      continue;
    }

    const path = isArray(index) ? index : toPath(index);
    unset(array, path);
  }

  return result as T[];
}
