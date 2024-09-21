import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Iterates through an array in reverse order and returns the index of the first item that matches the given predicate function.
 *
 * @template T
 * @param {T[]} arr - The array to search through.
 * @param {(item: T, index: number, arr: T[]) => unknown} doesMatch - A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
 * @param {number} [fromIndex=arr.length - 1] - The index to start the search from, defaults to the last index of the array.
 * @returns {number} - The index of the first item that matches the predicate, or `undefined` if no match is found.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = findLastIndex(items, (item) => item > 3)
 * console.log(result); // 4
 */
export function findLastIndex<T>(
  arr: readonly T[],
  doesMatch: (item: T, index: number, arr: readonly T[]) => unknown,
  fromIndex?: number
): number;

/**
 * Finds the index of the first item in an array that matches the given partial object.
 *
 * @template T
 * @param {readonly T[]} arr - The array to search through.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @param {number} [fromIndex=arr.length - 1] - The index to start the search from, defaults to the last index of the array.
 * @returns {number} - The index of the first item that matches the partial object, or `undefined` if no match is found.
 *
 * @example
 * // Using a partial object
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findLastIndex(items, { name: 'Bob' });
 * console.log(result); // 1
 */
export function findLastIndex<T>(arr: readonly T[], doesMatch: Partial<T>, fromIndex?: number): number;

/**
 * Finds the index of the first item in an array that matches a property with a specific value.
 *
 * @template T
 * @param {readonly T[]} arr - The array to search through.
 * @param {[keyof T, unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @param {number} [fromIndex=arr.length - 1] - The index to start the search from, defaults to the last index of the array.
 * @returns {number} - The index of the first item that has the specified property value, or `undefined` if no match is found.
 *
 * @example
 * // Using a property-value pair
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findLastIndex(items, ['name', 'Alice']);
 * console.log(result); // 0
 */
export function findLastIndex<T>(arr: readonly T[], doesMatchProperty: [keyof T, unknown], fromIndex?: number): number;

/**
 * Finds the index of the first item in an array that has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {readonly T[]} arr - The array to search through.
 * @param {string} propertyToCheck - The property name to check.
 * @param {number} [fromIndex=arr.length - 1] - The index to start the search from, defaults to the last index of the array.
 * @returns {number} - The index of the first item that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findLastIndex(items, 'name');
 * console.log(result); // 1
 */
export function findLastIndex<T>(arr: readonly T[], propertyToCheck: string, fromIndex?: number): number;

/**
 * Finds the index of the first item in an array that has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {T[]} arr - The array to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string} doesMatch - The property name to check.
 * @param {number} [fromIndex=arr.length - 1] - The index to start the search from, defaults to the last index of the array.
 * @returns {number} - The index of the first item that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = findLastIndex(items, 'name');
 * console.log(result); // 1
 */
export function findLastIndex<T>(
  arr: readonly T[],
  doesMatch: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string,
  fromIndex: number = arr.length - 1
): number {
  if (fromIndex < 0) {
    fromIndex = Math.max(arr.length + fromIndex, 0);
  } else {
    fromIndex = Math.min(fromIndex, arr.length - 1);
  }

  arr = arr.slice(0, fromIndex + 1);

  switch (typeof doesMatch) {
    case 'function': {
      return arr.findLastIndex(doesMatch);
    }
    case 'object': {
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];

        return arr.findLastIndex(matchesProperty(key, value));
      } else {
        return arr.findLastIndex(matches(doesMatch));
      }
    }
    case 'string': {
      return arr.findLastIndex(property(doesMatch));
    }
  }
}
