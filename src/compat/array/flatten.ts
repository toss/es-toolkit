import { flattenDepth } from './flattenDepth.ts';
import { ListOfRecursiveArraysOrValues } from '../_internal/ListOfRecursiveArraysOrValues.ts';

/**
 * Flattens array up to depth times.
 *
 * @template T
 * @param array - The array to flatten.
 * @returns Returns the new flattened array.
 *
 * @example
 * flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
export function flatten<T>(array: ArrayLike<T | readonly T[]> | null | undefined): T[] {
  return flattenDepth(array as ListOfRecursiveArraysOrValues<T> | null | undefined, 1);
}
