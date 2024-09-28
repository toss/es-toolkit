import { Criterion, orderBy } from './orderBy.ts';

/**
 * Sorts an array of objects based on multiple properties and their corresponding order directions.
 *
 * This function takes an array of objects, an array of criteria to sort by.
 * It returns the ascending sorted array, ordering by each key.
 * If values for a key are equal, it moves to the next key to determine the order.
 *
 * @template T - The type of elements in the array.
 * @param { T[] | object | null | undefined} collection - The array of objects to be sorted.
 * @param {Criterion<T> | Array<Criterion<T>>} criteria - An array of criteria (property names or property paths or custom key functions) to sort by.
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
export function sortBy<T>(
  collection: readonly T[] | object | number | null | undefined,
  criteria?: Criterion<T> | Array<Criterion<T>>
): T[] {
  return orderBy(collection, criteria, ['asc']);
}
