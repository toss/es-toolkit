import { orderBy as orderByToolkit } from '../../array/orderBy';

/**
 * Creates a function that orders an array by one or more criteria.
 *
 * @template T - The type of array.
 * @template U - The type of mapped elements.
 * @param {Array<(item: T) => unknown | keyof U>} criteria - The criteria for sorting.
 * @param {Array<'asc' | 'desc'>} orders - The sort orders of criteria.
 * @returns {(arr: T) => T} A function that takes an array and returns a new sorted array.
 *
 * @example
 * const users = [
 *   { name: 'fred', age: 48 },
 *   { name: 'barney', age: 34 },
 *   { name: 'fred', age: 40 },
 * ];
 * const orderByNameAge = orderBy(
 *   [user => user.name, user => user.age],
 *   ['asc', 'desc']
 * );
 * const result = orderByNameAge(users);
 * // => [{ name: 'barney', age: 34 }, { name: 'fred', age: 48 }, { name: 'fred', age: 40 }]
 */
export function orderBy<T extends unknown[], U>(
  criteria: Array<(item: T[number]) => unknown | keyof U>,
  orders: Array<'asc' | 'desc'>
): (arr: T) => T;
/**
 * Orders an array by one or more criteria.
 *
 * @template T - The type of array.
 * @template U - The type of mapped elements.
 * @param {T} arr - The array to sort.
 * @param {Array<(item: T) => unknown | keyof U>} criteria - The criteria for sorting.
 * @param {Array<'asc' | 'desc'>} orders - The sort orders of criteria.
 * @returns {T} The new sorted array.
 *
 * @example
 * const users = [
 *   { name: 'fred', age: 48 },
 *   { name: 'barney', age: 34 },
 *   { name: 'fred', age: 40 },
 * ];
 * const result = orderBy(
 *   users,
 *   [user => user.name, user => user.age],
 *   ['asc', 'desc']
 * );
 * // => [{ name: 'barney', age: 34 }, { name: 'fred', age: 48 }, { name: 'fred', age: 40 }]
 */
export function orderBy<T extends unknown[], U>(
  arr: T,
  criteria: Array<(item: T[number]) => unknown | keyof U>,
  orders: Array<'asc' | 'desc'>
): T;

export function orderBy<T extends unknown[], U>(
  arrOrIteratees: T | Array<(value: T[number]) => U>,
  iterateesOrOrders: Array<(value: T[number]) => U> | Array<'asc' | 'desc'>,
  orders?: Array<'asc' | 'desc'>
) {
  if (orders === undefined && Array.isArray(iterateesOrOrders)) {
    return (arr: T) =>
      orderBy(arr, arrOrIteratees as Array<(value: T[number]) => U>, iterateesOrOrders as Array<'asc' | 'desc'>);
  }

  const arr = arrOrIteratees as T;
  const iteratees = iterateesOrOrders as Array<(value: T[number]) => U>;
  return orderByToolkit(arr as any, iteratees, orders!) as T;
}
