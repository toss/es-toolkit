import { toArray } from '../_internal/toArray.ts';
import { negate } from '../function/negate.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';
import { ListIteratee } from '../_internal/ListIteratee.ts';

/**
 * Creates a slice of array with elements taken from the beginning. Elements are taken until predicate
 * returns falsey. The predicate is invoked with three arguments: (value, index, array).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to query.
 * @param {ListIteratee<T>} [predicate] - The function invoked per iteration.
 * @returns {T[]} Returns the slice of array.
 *
 * @example
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * takeWhile(users, function(o) { return !o.active; });
 * // => objects for ['barney', 'fred']
 *
 * @example
 * takeWhile(users, { 'user': 'barney', 'active': false });
 * // => objects for ['barney']
 *
 * @example
 * takeWhile(users, ['active', false]);
 * // => objects for ['barney', 'fred']
 *
 * @example
 * takeWhile(users, 'active');
 * // => []
 */
export function takeWhile<T>(array: ArrayLike<T> | null | undefined, predicate?: ListIteratee<T>): T[];

/**
 * Creates a slice of the array with elements taken from the beginning while the specified predicate is satisfied.
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
 * @returns {T[]} - A slice of the array with elements taken from the beginning or an empty array if `array` is `null` or `undefined`.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = takeWhile(items, (item) => item < 3);
 * console.log(result); // [1, 2]
 *
 * // Using a partial object
 * const items2 = [{ id: 30 }, { id: 20 }, { id: 10 }];
 * const result2 = takeWhile(items2, { id: 30 });
 * console.log(result2); // [{ id: 30 }]
 *
 * // Using a key-value pair
 * const items3 = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }];
 * const result3 = takeWhile(items3, ['name', 'Alice']);
 * console.log(result3); // [{ name: 'Alice' }]
 *
 * // Using a property key
 * const items4 = [{ active: true }, { active: true }, { active: false }];
 * const result4 = takeWhile(items4, 'active');
 * console.log(result4); // [{ active: true }, { active: true }]
 *
 * // No predicate provided
 * const items5 = [true, false];
 * const result5 = takeWhile(items5);
 * console.log(result5); // [true]
 *
 * // null or undefined array
 * const result6 = takeWhile(null);
 * console.log(result6); // []
 **/
export function takeWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate?:
    | ((value: T, index: number, array: ArrayLike<T>) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey
): T[] {
  if (!isArrayLikeObject(array)) {
    return [];
  }

  const _array = toArray(array);
  const index = _array.findIndex(negate(iteratee(predicate)));

  return index === -1 ? _array : _array.slice(0, index);
}
