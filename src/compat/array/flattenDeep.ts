import { flattenDepth } from './flattenDepth.ts';
import { ListOfRecursiveArraysOrValues } from '../_internal/ListOfRecursiveArraysOrValues.ts';

/**
 * Recursively flattens array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to flatten.
 * @returns {Array<ExtractNestedArrayType<T>>} Returns the new flattened array.
 *
 * @example
 * flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
export function flattenDeep<T>(
  value: ListOfRecursiveArraysOrValues<T> | null | undefined
): Array<T extends string ? T : T extends ArrayLike<any> ? never : T> {
  return flattenDepth(value, Infinity) as any;
}
