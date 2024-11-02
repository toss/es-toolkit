import { Criterion, orderBy } from './orderBy.ts';
import { flatten } from '../../array/flatten.ts';
import { isIterateeCall } from '../_internal/isIterateeCall.ts';

/**
 * Sorts an array of objects based on multiple properties and their corresponding order directions.
 *
 * This function takes an array of objects, an array of criteria to sort by.
 * It returns the ascending sorted array, ordering by each key.
 * If values for a key are equal, it moves to the next key to determine the order.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | object | null | undefined} collection - The array of objects to be sorted.
 * @param {Array<Array<Criterion<T> | Criterion<T>>>} criteria - An array of criteria (property names or property paths or custom key functions) to sort by.
 * @returns {T[]} - The ascending sorted array.
 *
 * @example
 * // Sort an array of objects by 'user' in ascending order and 'age' in descending order.
 * const users = [
 *   { user: 'fred', age: 48 },
 *   { user: 'barney', age: 34 },
 *   { user: 'fred', age: 40 },
 *   { user: 'barney', age: 36 },
 * ];
 * const result = sortBy(users, ['user', (item) => item.age])
 * // result will be:
 * // [
 * //   { user: 'barney', age: 34 },
 * //   { user: 'barney', age: 36 },
 * //   { user: 'fred', age: 40 },
 * //   { user: 'fred', age: 48 },
 * // ]
 */
export function sortBy<T = any>(
  collection: ArrayLike<T> | object | null | undefined,
  ...criteria: Array<Criterion<T> | Array<Criterion<T>>>
): T[] {
  const length = criteria.length;
  // Enables use as an iteratee for methods like `_.reduce` and `_.map`.
  if (length > 1 && isIterateeCall(collection, criteria[0], criteria[1])) {
    criteria = [];
  } else if (length > 2 && isIterateeCall(criteria[0], criteria[1], criteria[2])) {
    criteria = [criteria[0]];
  }
  return orderBy(collection, flatten(criteria), ['asc']);
}
