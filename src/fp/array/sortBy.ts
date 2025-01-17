import { sortBy as sortByToolkit } from '../../array/sortBy';

/**
 * Sorts an array by the results of running each element through a key selector function.
 *
 * @template T - The type of array.
 * @template U - The type of the sort key.
 * @param {(value: T[number]) => U} keySelector - The function to select the sort key.
 * @returns {(arr: T) => T} A function that takes an array and returns a new sorted array.
 *
 * @example
 * const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }];
 * const sortByAge = sortBy(user => user.age);
 * const result = sortByAge(users);
 * // result will be [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
 */
export function sortBy<T extends unknown[], U>(keySelector: (value: T[number]) => U): (arr: T) => T;
/**
 * Sorts an array by the results of running each element through a key selector function.
 *
 * @template T - The type of array.
 * @template U - The type of the sort key.
 * @param {T} arr - The array to sort.
 * @param {(value: T[number]) => U} keySelector - The function to select the sort key.
 * @returns {T} A new sorted array.
 *
 * @example
 * const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }];
 * const result = sortBy(users, user => user.age);
 * // result will be [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
 */
export function sortBy<T extends unknown[], U>(arr: T, keySelector: (value: T[number]) => U): T;

export function sortBy<T extends unknown[], U>(
  arrOrKeySelector: T | ((value: T[number]) => U),
  keySelector?: (value: T[number]) => U
) {
  if (typeof arrOrKeySelector === 'function') {
    return (arr: T) => sortBy(arr, arrOrKeySelector as (value: T[number]) => U);
  }

  const arr = arrOrKeySelector as T;
  return sortByToolkit(arr as any, [keySelector!]) as T;
}
