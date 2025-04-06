import { unzip as unzipToolkit } from '../../array/unzip.ts';
import { isArray } from '../predicate/isArray.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * Gathers elements in the same position in an internal array
 * from a grouped array of elements and returns them as a new array.
 *
 * @template T - The type of elements in the nested array.
 * @param {T[][] | ArrayLike<ArrayLike<T>> | null | undefined} array - The nested array to unzip.
 * @returns {T[][]} A new array of unzipped elements.
 *
 * @example
 * const zipped = [['a', true, 1],['b', false, 2]];
 * const result = unzip(zipped);
 * // result will be [['a', 'b'], [true, false], [1, 2]]
 */
export function unzip<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][] {
  if (!isArrayLikeObject(array) || !array.length) {
    return [];
  }
  array = isArray(array) ? array : Array.from(array);
  array = (array as T[][]).filter(item => isArrayLikeObject(item));
  return unzipToolkit(array as T[][]);
}
