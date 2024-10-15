import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Finds the index of the first item in an array that matches the given predicate function.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {(item: T, index: number, arr: T[]) => unknown} doesMatch - A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
 * @param {number} [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns {number} - The index of the first item that matches the predicate, or `undefined` if no match is found.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = find(items, (item) => item > 3);
 * console.log(result); // 4
 */
export function findIndex<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: (item: T, index: number, arr: readonly T[]) => unknown,
  fromIndex?: number
): number;

/**
 * Finds the index of the first item in an array that matches the given partial object.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @param {number} [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns {number} - The index of the first item that matches the partial object, or `undefined` if no match is found.
 *
 * @example
 * // Using a partial object
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findIndex(items, { name: 'Bob' });
 * console.log(result); // 1
 */
export function findIndex<T>(arr: ArrayLike<T> | null | undefined, doesMatch: Partial<T>, fromIndex?: number): number;

/**
 * Finds the index of the first item in an array that matches a property with a specific value.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {[keyof T, unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @param {number} [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns {number} - The index of the first item that has the specified property value, or `undefined` if no match is found.
 *
 * @example
 * // Using a property-value pair
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findIndex(items, ['name', 'Alice']);
 * console.log(result); // 0
 */
export function findIndex<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatchProperty: [keyof T, unknown],
  fromIndex?: number
): number;

/**
 * Finds the index of the first item in an array that has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {string} propertyToCheck - The property name to check.
 * @param {number} [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns {number} - The index of the first item that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findIndex(items, 'name');
 * console.log(result); // 0
 */
export function findIndex<T>(arr: ArrayLike<T> | null | undefined, propertyToCheck: string, fromIndex?: number): number;

/**
 * Finds the index of the first item in an array that has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string} doesMatch - The criteria to match against the items in the array. This can be a function, a partial object, a key-value pair, or a property name.
 * @param {string} propertyToCheck - The property name to check for in the items of the array.
 * @param {number} [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns {number} - The index of the first item that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findIndex(items, 'name');
 * console.log(result); // 0
 */
export function findIndex<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string,
  fromIndex: number = 0
): number {
  if (!arr) {
    return -1;
  }
  if (fromIndex < 0) {
    fromIndex = Math.max(arr.length + fromIndex, 0);
  }
  const subArray = Array.from(arr).slice(fromIndex);
  let index = -1;
  switch (typeof doesMatch) {
    case 'function': {
      index = subArray.findIndex(doesMatch);
      break;
    }
    case 'object': {
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];

        index = subArray.findIndex(matchesProperty(key, value));
      } else {
        index = subArray.findIndex(matches(doesMatch));
      }
      break;
    }
    case 'string': {
      index = subArray.findIndex(property(doesMatch));
    }
  }
  return index === -1 ? -1 : index + fromIndex;
}
