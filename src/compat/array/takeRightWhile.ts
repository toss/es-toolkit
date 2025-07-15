import { findLastIndex } from './findLastIndex.ts';
import { identity } from '../../function/identity.ts';
import { negate } from '../../function/negate.ts';
import { ListIteratee } from '../_internal/ListIteratee.ts';
import { toArray } from '../_internal/toArray.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates a slice of array with elements taken from the end. Elements are taken until predicate
 * returns falsey. The predicate is invoked with three arguments: (value, index, array).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to query.
 * @param {ListIteratee<T>} [predicate] - The function invoked per iteration.
 * @returns {T[]} Returns the slice of array.
 *
 * @example
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * takeRightWhile(users, function(o) { return !o.active; });
 * // => objects for ['fred', 'pebbles']
 *
 * @example
 * takeRightWhile(users, { 'user': 'pebbles', 'active': false });
 * // => objects for ['pebbles']
 *
 * @example
 * takeRightWhile(users, ['active', false]);
 * // => objects for ['fred', 'pebbles']
 *
 * @example
 * takeRightWhile(users, 'active');
 * // => []
 */
export function takeRightWhile<T>(array: ArrayLike<T> | null | undefined, predicate?: ListIteratee<T>): T[];

/**
 * Creates a slice of the array with elements taken from the end while the specified predicate is satisfied.
 * If no predicate is provided, the identity function is used by default.
 * If the array is `null` or `undefined`, returns an empty array.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to process.
 * @param {(item: T, index: number, array: T[]) => unknown | Partial<T> | [keyof T, unknown] | PropertyKey} [predicate] - The condition used to determine elements to include. Can be:
 * - A function invoked per iteration.
 * - A partial object to match properties.
 * - A key-value pair as a tuple.
 * - A property key to check for truthy values.
 * Defaults to the identity function if not provided.
 * @returns {T[]} - A slice of the array with elements taken from the end or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = takeRightWhile(items, (item) => item > 3);
 * console.log(result); // [4, 5]
 *
 * // Using a partial object
 * const items2 = [{ id: 10 }, { id: 20 }, { id: 30 }];
 * const result2 = takeRightWhile(items2, { id: 30 });
 * console.log(result2); // [{ id: 30 }]
 *
 * // Using a key-value pair
 * const items3 = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }];
 * const result3 = takeRightWhile(items3, ['name', 'Alice']);
 * console.log(result3); // [{ name: 'Alice' }]
 *
 * // Using a property key
 * const items4 = [{ active: false }, { active: true }, { active: true }];
 * const result4 = takeRightWhile(items4, 'active');
 * console.log(result4); // [{ active: true }, { active: true }]
 *
 * // No predicate provided
 * const items5 = [false, true];
 * const result5 = takeRightWhile(items5);
 * console.log(result5); // [true]
 *
 * // null or undefined array
 * const result6 = takeRightWhile(null);
 * console.log(result6); // []
 */
export function takeRightWhile<T>(
  _array: ArrayLike<T> | null | undefined,
  predicate?:
    | ((value: T, index: number, array: ArrayLike<T>) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey
): T[] {
  if (!isArrayLikeObject(_array)) {
    return [];
  }

  const array = toArray(_array);
  const index = findLastIndex(array, negate(createIteratee(predicate ?? identity)));

  return array.slice(index + 1);
}
