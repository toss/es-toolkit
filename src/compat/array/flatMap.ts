import { flatten } from './flatten.ts';
import { map } from './map.ts';
import { isNil } from '../../predicate';

/**
 * Maps each element in the collection using the iteratee function and flattens the result by one level.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @category Array
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
export function flatMap<T, R>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee?: ((value: T, index: number | string, collection: unknown) => R | R[] | null | undefined) | keyof T | object
): R[] {
  if (isNil(collection)) {
    return [];
  }

  const mapped = isNil(iteratee) ? map(collection) : map(collection, iteratee);

  return flatten(mapped, 1) as R[];
}
