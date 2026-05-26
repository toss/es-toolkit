import { orderBy } from './orderBy.ts';

/**
 * Sorts an array of objects or primitives based on the given `criteria`.
 *
 * - For objects: If you provide keys, it sorts the objects by the values of those keys.
 * - For objects: If you provide functions, it sorts based on the values returned by those functions.
 * - For primitives: If you provide functions, it sorts based on the values returned by those functions.
 * - For primitives: If you provide no criteria, it sorts the primitives themselves.
 *
 * The function returns the array of objects sorted in ascending order.
 * If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} arr - The array of objects or primitives to be sorted.
 * @param {Array<((item: T) => unknown) | keyof T>} [criteria=[]] - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting. If empty or not provided, sorts by the values themselves.
 * @returns {T[]} - The sorted array.
 *
 * @example
 * const users = [
 *  { user: 'foo', age: 24 },
 *  { user: 'bar', age: 7 },
 *  { user: 'foo', age: 8 },
 *  { user: 'bar', age: 29 },
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
 *
 * @example
 * // Sort an array of strings (no criteria needed for primitives)
 * const strings = ['banana', 'apple', 'cherry'];
 * sortBy(strings);
 * // result will be: ['apple', 'banana', 'cherry']
 *
 * @example
 * // Sort strings by length
 * sortBy(strings, [x => x.length]);
 * // result will be: ['apple', 'banana', 'cherry']
 *
 * @example
 * // Sort strings case-insensitively
 * const mixed = ['Banana', 'apple', 'Cherry'];
 * sortBy(mixed, [x => x.toLowerCase()]);
 * // result will be: ['apple', 'Banana', 'Cherry']
 */
export function sortBy<T>(arr: readonly T[], criteria: Array<((item: T) => unknown) | keyof T> = []): T[] {
  return orderBy(arr, criteria, ['asc']);
}
