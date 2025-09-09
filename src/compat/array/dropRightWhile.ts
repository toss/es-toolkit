import { dropRightWhile as dropRightWhileToolkit } from '../../array/dropRightWhile.ts';
import { identity } from '../../function/identity.ts';
import { ListIteratee } from '../_internal/ListIteratee.ts';
import { property } from '../object/property.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Creates a slice of array excluding elements dropped from the end until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} array - The array to query.
 * @param {ListIteratee<T>} [predicate] - The function invoked per iteration.
 * @returns {T[]} Returns the slice of array.
 * @example
 *
 * const users = [
 *   { user: 'barney', active: true },
 *   { user: 'fred', active: false },
 *   { user: 'pebbles', active: false }
 * ];
 *
 * // Using function predicate
 * dropRightWhile(users, user => !user.active);
 * // => [{ user: 'barney', active: true }]
 *
 * // Using matches shorthand
 * dropRightWhile(users, { user: 'pebbles', active: false });
 * // => [{ user: 'barney', active: true }, { user: 'fred', active: false }]
 *
 * // Using matchesProperty shorthand
 * dropRightWhile(users, ['active', false]);
 * // => [{ user: 'barney', active: true }]
 *
 * // Using property shorthand
 * dropRightWhile(users, 'active');
 * // => [{ user: 'barney', active: true }]
 */
export function dropRightWhile<T>(array: ArrayLike<T> | null | undefined, predicate?: ListIteratee<T>): T[];

/**
 * Removes elements from the end of an array until the predicate returns false.
 *
 * This function iterates over an array and drops elements from the end until the provided
 * predicate function returns false. It then returns a new array with the remaining elements.
 *
 * @template T - The type of elements in the array.
 * @param {ArrayLike<T> | null | undefined} arr - The array from which to drop elements.
 * @param {(item: T, index: number, arr: T[]) => unknown} predicate - A predicate function that determines
 * whether to continue dropping elements. The function is called with each element, index, and array, and dropping
 * continues as long as it returns true.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [3, 2, 1];
 * const result = dropRightWhile(array, (item, index, arr) => index >= 1);
 * // Returns: [3]
 */
export function dropRightWhile<T>(
  arr: ArrayLike<T> | null | undefined,
  predicate:
    | ((item: T, index: number, arr: readonly T[]) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey = identity
): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  return dropRightWhileImpl(Array.from(arr), predicate);
}

function dropRightWhileImpl<T>(
  arr: readonly T[],
  predicate: ((item: T, index: number, arr: readonly T[]) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey
): T[] {
  switch (typeof predicate) {
    case 'function': {
      return dropRightWhileToolkit(arr, (item, index, arr) => Boolean(predicate(item, index, arr)));
    }
    case 'object': {
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];

        return dropRightWhileToolkit(arr, matchesProperty(key, value));
      } else {
        return dropRightWhileToolkit(arr, matches(predicate));
      }
    }
    case 'symbol':
    case 'number':
    case 'string': {
      return dropRightWhileToolkit(arr, property(predicate));
    }
  }
}
