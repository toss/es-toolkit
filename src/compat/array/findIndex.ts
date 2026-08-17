import { ListIterateeCustom } from '../_internal/ListIterateeCustom.ts';
import { identity } from '../function/identity.ts';
import { iteratee as iterateeToolkit } from '../util/iteratee.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Finds the index of the first item in an array that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param arr - The array to search through.
 * @param doesMatch - The criteria to match against the items in the array. This can be a function, a partial object, a key-value pair, or a property name.
 * @param [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns The index of the first item that has the specified property, or `-1` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findIndex(items, 'name');
 * console.log(result); // 0
 */
export function findIndex<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: ListIterateeCustom<T, boolean> = identity,
  fromIndex = 0
): number {
  if (!arr) {
    return -1;
  }
  fromIndex = toInteger(fromIndex);
  if (fromIndex < 0) {
    fromIndex = Math.max(arr.length + fromIndex, 0);
  }
  const subArray = Array.from(arr).slice(fromIndex);

  const iteratee = iterateeToolkit(doesMatch);
  const index = subArray.findIndex(iteratee);

  return index === -1 ? -1 : index + fromIndex;
}
