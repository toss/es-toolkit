import { orderBy } from './orderBy.ts';
import { sortBy as sortByToolkit } from '../../array/sortBy';

/**
 * Sorts an array of objects based on the given `criteria`.
 *
 * - If you provide keys, it sorts the objects by the values of those keys.
 * - If you provide functions, it sorts based on the values returned by those functions.
 *
 * The function returns the array of objects sorted in ascending order.
 * If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} arr - The array of objects to be sorted.
 * @param {Array<((item: T) => unknown) | keyof T>} criteria - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.
 * @returns {T[]} - The sorted array.
 *
 * @example
 * const users = [
 *  { user: 'foo', age: 24 },
 *  { user: 'bar', age: 7 },
 *  { user: 'foo ', age: 8 },
 *  { user: 'bar ', age: 29 },
 * ];
 *
 * sortBy(users, ['user', 'age']);
 * sortBy(users, [obj => obj.user, 'age']);
 * // results will be:
 * // [
 * //   { user : 'bar', age: 7 },
 * //   { user : 'bar', age: 29 },
 * //   { user : 'foo', age: 8 },
 * //   { user : 'foo', age: 24 },
 * // ]
 */
export function sortBy<T extends object>(arr: readonly T[], criteria: Array<((item: T) => unknown) | keyof T>): T[];

/**
 * Sorts an array of objects based on the given `criteria`.
 *
 * - If you provide keys, it sorts the objects by the values of those keys.
 * - If you provide functions, it sorts based on the values returned by those functions.
 *
 * The function returns the array of objects sorted in ascending order.
 * If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
 *
 * @template T - The type of the objects in the array.
 * @param {Array<((item: T) => unknown) | keyof T>} criteria - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.
 * @returns {(arr: T[]) => T[]} A function that receive the array of objects to be sorted as argument and returns - The sorted array.
 *
 * @example
 * const users = [
 *  { user: 'foo', age: 24 },
 *  { user: 'bar', age: 7 },
 *  { user: 'foo ', age: 8 },
 *  { user: 'bar ', age: 29 },
 * ];
 *
 * sortBy(['user', 'age'])(users);
 * sortBy(users, [obj => obj.user, 'age']);
 * // results will be:
 * // [
 * //   { user : 'bar', age: 7 },
 * //   { user : 'bar', age: 29 },
 * //   { user : 'foo', age: 8 },
 * //   { user : 'foo', age: 24 },
 * // ]
 */
export function sortBy<T extends object>(criteria: Array<((item: T) => unknown) | keyof T>): (arr: readonly T[]) => T[];

export function sortBy<T extends object>(
  arrOrCriteria: readonly T[] | Array<((item: T) => unknown) | keyof T>,
  criteria?: Array<((item: T) => unknown) | keyof T>
) {
  if (criteria == null) {
    return (arr: readonly T[]) => sortBy(arr, arrOrCriteria as Array<((item: T) => unknown) | keyof T>);
  }

  const arr = arrOrCriteria as readonly T[];
  return sortByToolkit(arr, criteria);
}
