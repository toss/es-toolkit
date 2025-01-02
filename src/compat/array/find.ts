import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Finds the first item in an array that matches the given predicate function.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {(item: T, index: number, arr: T[]) => unknown} doesMatch - A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
 * @returns {T | undefined} - The first item that matches the predicate, or `undefined` if no match is found.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = find(items, (item) => item > 3);
 * console.log(result); // 4
 */
export function find<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch: (item: T, index: number, arr: readonly T[]) => unknown
): T | undefined;

/**
 * Finds the first item in an array that matches the given partial object.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @returns {T | undefined} - The first item that matches the partial object, or `undefined` if no match is found.
 *
 * @example
 * // Using a partial object
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = find(items, { name: 'Bob' });
 * console.log(result); // { id: 2, name: 'Bob' }
 */
export function find<T>(arr: ArrayLike<T> | null | undefined, doesMatch: Partial<T>): T | undefined;

/**
 * Finds the first item in an array that matches a property with a specific value.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {[keyof T, unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @returns {T | undefined} - The first item that has the specified property value, or `undefined` if no match is found.
 *
 * @example
 * // Using a property-value pair
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = find(items, ['name', 'Alice']);
 * console.log(result); // { id: 1, name: 'Alice' }
 */
export function find<T>(arr: ArrayLike<T> | null | undefined, doesMatchProperty: [keyof T, unknown]): T | undefined;

/**
 * Finds the first item in an array that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to search through.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @returns {T | undefined} - The first item that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = find(items, 'name');
 * console.log(result); // { id: 1, name: 'Alice' }
 */
export function find<T>(arr: ArrayLike<T> | null | undefined, propertyToCheck: PropertyKey): T | undefined;

/**
 * Finds the first item in an object that matches the given predicate function.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {(item: T[keyof T], index: number, arr: T) => unknown} doesMatch - A function that takes an item, its key, and the object, and returns a truthy value if the item matches the criteria.
 * @returns {T | undefined} - The first property value that matches the predicate, or `undefined` if no match is found.
 *
 * @example
 * // Using a predicate function
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = find(obj, (item) => item > 2);
 * console.log(result); // 3
 */
export function find<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatch: (item: T[keyof T], index: keyof T, object: T) => unknown
): T | undefined;

/**
 * Finds the first item in an object that matches the given partial value.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {Partial<T[keyof T]>} doesMatch - A partial value to match against the values of the object.
 * @returns {T | undefined} - The first property value that matches the partial value, or `undefined` if no match is found.
 *
 * @example
 * // Using a partial value
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = find(obj, { name: 'Bob' });
 * console.log(result); // { id: 2, name: 'Bob' }
 */
export function find<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatch: Partial<T[keyof T]>
): T | undefined;

/**
 * Finds the first item in an object that matches a property with a specific value.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {[keyof T[keyof T], unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @returns {T | undefined} - The first item that has the specified property value, or `undefined` if no match is found.
 *
 * @example
 * // Using a property-value pair
 * const items = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
 * const result = find(items, ['name', 'Alice']);
 * console.log(result); // { id: 1, name: 'Alice' }
 */
export function find<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatchProperty: [keyof T[keyof T], unknown]
): T | undefined;

/**
 * Finds the first item in an object that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {T | null | undefined} object - The object to search through.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @returns {T | undefined} - The first property value that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = find(obj, 'name');
 * console.log(result); // { id: 1, name: 'Alice' }
 */
export function find<T extends Record<string, unknown>>(
  object: T | null | undefined,
  propertyToCheck: PropertyKey
): T | undefined;

/**
 * Finds the first item in an object that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The source array or object to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} doesMatch - The criteria to match. It can be a function, a partial object, a key-value pair, or a property name.
 * @returns {T | undefined} - The first property value that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = find(obj, 'name');
 * console.log(result); // { id: 1, name: 'Alice' }
 */
export function find<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  doesMatch: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey
): T | undefined {
  if (!source) {
    return undefined;
  }
  const values = Array.isArray(source) ? source : Object.values(source);

  switch (typeof doesMatch) {
    case 'function': {
      if (!Array.isArray(source)) {
        const keys = Object.keys(source) as Array<keyof T>;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = source[key] as T;

          if (doesMatch(value, key as number, source)) {
            return value;
          }
        }

        return undefined;
      }

      return values.find(doesMatch);
    }
    case 'object': {
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];

        return values.find(matchesProperty(key, value));
      } else {
        return values.find(matches(doesMatch));
      }
    }
    case 'symbol':
    case 'number':
    case 'string': {
      return values.find(property(doesMatch));
    }
  }
}
