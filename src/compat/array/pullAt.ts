import { flattenDepth } from './flattenDepth.ts';
import { isIndex } from '../_internal/isIndex.ts';
import { isKey } from '../_internal/isKey.ts';
import { Many } from '../_internal/Many.ts';
import type { MutableList } from '../_internal/MutableList.d.ts';
import type { RejectReadonly } from '../_internal/RejectReadonly.d.ts';
import { toKey } from '../_internal/toKey.ts';
import { at } from '../object/at.ts';
import { unset } from '../object/unset.ts';
import { isArray } from '../predicate/isArray.ts';
import { toPath } from '../util/toPath.ts';

/**
 * Removes elements from array corresponding to the given indexes and returns an array of the removed elements.
 * Indexes may be specified as an array of indexes or as individual arguments.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {...Array<number | number[]>} indexes - The indexes of elements to remove, specified as individual indexes or arrays of indexes.
 * @returns {T[]} Returns the new array of removed elements.
 *
 * @example
 * var array = [5, 10, 15, 20];
 * var evens = pullAt(array, 1, 3);
 *
 * console.log(array);
 * // => [5, 15]
 *
 * console.log(evens);
 * // => [10, 20]
 */
export function pullAt<T>(array: T[], ...indexes: Array<Many<number>>): T[];

/**
 * Removes elements from array corresponding to the given indexes and returns an array of the removed elements.
 * Indexes may be specified as an array of indexes or as individual arguments.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @template L
 * @param {L} array - The array to modify.
 * @param {...Array<number | number[]>} indexes - The indexes of elements to remove, specified as individual indexes or arrays of indexes.
 * @returns {L} Returns the new array of removed elements.
 *
 * @example
 * var array = [5, 10, 15, 20];
 * var evens = pullAt(array, 1, 3);
 *
 * console.log(array);
 * // => [5, 15]
 *
 * console.log(evens);
 * // => [10, 20]
 */
export function pullAt<L extends MutableList<any>>(array: RejectReadonly<L>, ...indexes: Array<Many<number>>): L;

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
  const indices: Array<number | string> = flattenDepth(_indices as any, 1);

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
