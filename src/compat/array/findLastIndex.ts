import { identity } from '../../function/identity.ts';
import { ListIterateeCustom } from '../_internal/ListIterateeCustom.ts';
import { toArray } from '../_internal/toArray.ts';
import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Finds the index of the last element in the array that satisfies the predicate.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The array to search through.
 * @param {ListIterateeCustom<T, boolean>} [predicate] - The predicate function, partial object, property-value pair, or property name.
 * @param {number} [fromIndex] - The index to start searching from.
 * @returns {number} The index of the last matching element, or -1 if not found.
 *
 * @example
 * const users = [
 *   { user: 'barney', active: true },
 *   { user: 'fred', active: false },
 *   { user: 'pebbles', active: false }
 * ];
 *
 * findLastIndex(users, o => o.user === 'pebbles');
 * // => 2
 *
 * findLastIndex(users, { user: 'barney', active: true });
 * // => 0
 *
 * findLastIndex(users, ['active', false]);
 * // => 2
 *
 * findLastIndex(users, 'active');
 * // => 0
 */
export function findLastIndex<T>(
  array: ArrayLike<T> | null | undefined,
  predicate?: ListIterateeCustom<T, boolean>,
  fromIndex?: number
): number;

/**
 * Finds the index of the last element in the array that satisfies the predicate.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} doesMatch - The predicate function, partial object, property-value pair, or property name.
 * @param {number} [fromIndex=arr.length - 1] - The index to start the search from, defaults to the last index of the array.
 * @returns {number} The index of the last matching element, or -1 if not found.
 *
 * @example
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * findLastIndex(items, 'name');
 * // => 1
 */
export function findLastIndex<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey = identity,
  fromIndex: number = arr ? arr.length - 1 : 0
): number {
  if (!arr) {
    return -1;
  }
  if (fromIndex < 0) {
    fromIndex = Math.max(arr.length + fromIndex, 0);
  } else {
    fromIndex = Math.min(fromIndex, arr.length - 1);
  }

  const subArray = toArray(arr).slice(0, fromIndex + 1);

  switch (typeof doesMatch) {
    case 'function': {
      return findLastIndexImpl(subArray, doesMatch);
    }
    case 'object': {
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];

        return findLastIndexImpl(subArray, matchesProperty(key, value));
      } else {
        return findLastIndexImpl(subArray, matches(doesMatch));
      }
    }
    case 'number':
    case 'symbol':
    case 'string': {
      return findLastIndexImpl(subArray, property(doesMatch));
    }
  }
}

function findLastIndexImpl<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, arr: any) => unknown
): number {
  if (!array) {
    return -1;
  }

  let index = array.length;

  while (index-- > 0) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}
