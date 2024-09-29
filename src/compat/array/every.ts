import { identity } from '../_internal/identity.ts';
import { property } from '../object/property.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Checks if all elements in an array are truthy.
 *
 * @template T
 * @param {T[]} arr - The array to check through.
 * @returns {boolean} - `true` if all elements are truthy, or `false` if at least one element is falsy.
 *
 * @example
 * const items = [1, 2, 3, 4];
 * const result = every(items);
 * console.log(result); // true
 *
 * const itemsWithFalsy = [1, 0, 3, 4];
 * const resultWithFalsy = every(itemsWithFalsy);
 * console.log(resultWithFalsy); // false
 */
export function every<T>(arr: readonly T[]): boolean;

/**
 * Checks if every item in an array matches the given predicate function.
 *
 * @template T
 * @param {T[]} arr - The array to check through.
 * @param {(item: T, index: number, arr: T[]) => unknown} doesMatch - A function that takes an item, its index, and the array, and returns a truthy value if the item matches the criteria.
 * @returns {boolean} - `true` if every item matches the predicate, or `false` if at least one item does not match.
 *
 * @example
 * // Using a predicate function
 * const items = [1, 2, 3, 4, 5];
 * const result = every(items, (item) => item > 0);
 * console.log(result); // true
 */
export function every<T>(arr: readonly T[], doesMatch: (item: T, index: number, arr: readonly T[]) => unknown): boolean;

/**
 * Checks if every item in an array matches the given partial object.
 *
 * @template T
 * @param {T[]} arr - The array to check through.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @returns {boolean} - `true` if every item matches the partial object, or `false` if at least one item does not match.
 *
 * @example
 * // Using a partial object
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = every(items, { name: 'Bob' });
 * console.log(result); // false
 */
export function every<T>(arr: readonly T[], doesMatch: Partial<T>): boolean;

/**
 * Checks if every item in an array matches a property with a specific value.
 *
 * @template T
 * @param {T[]} arr - The array to check through.
 * @param {[keyof T, unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @returns {boolean} - `true` if every item has the specified property value, or `false` if at least one item does not match.
 *
 * @example
 * // Using a property-value pair
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = every(items, ['name', 'Alice']);
 * console.log(result); // false
 */
export function every<T>(arr: readonly T[], doesMatchProperty: [keyof T, unknown]): boolean;

/**
 * Checks if every item in an array has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {T[]} arr - The array to check through.
 * @param {string} propertyToCheck - The property name to check.
 * @returns {boolean} - `true` if every item has the specified property, or `false` if at least one item does not match.
 *
 * @example
 * // Using a property name
 * const items = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const result = every(items, 'name');
 * console.log(result); // true
 */
export function every<T>(arr: readonly T[], propertyToCheck: string): boolean;

/**
 * Checks if every item in an object matches the given predicate function.
 *
 * @template T
 * @param {T} object - The object to check through.
 * @param {(value: T[keyof T], key: keyof T, object: T) => unknown} doesMatch - A function that takes an value, its key, and the object, and returns a truthy value if the item matches the criteria.
 * @returns {boolean} - `true` if every property value matches the predicate, or `false` if at least one does not match.
 *
 * @example
 * // Using a predicate function
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = every(obj, (value) => value > 0);
 * console.log(result); // true
 */
export function every<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): boolean;

/**
 * Checks if every item in an object matches the given partial value.
 *
 * @template T
 * @param {T} object - The object to check through.
 * @param {Partial<T[keyof T]>} doesMatch - A partial value to match against the values of the object.
 * @returns {boolean} - `true` if every property value matches the partial value, or `false` if at least one does not match.
 *
 * @example
 * // Using a partial value
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = every(obj, { name: 'Bob' });
 * console.log(result); // false
 */
export function every<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): boolean;

/**
 * Checks if every item in an object matches a property with a specific value.
 *
 * @template T
 * @param {T[]} object - The object to check through.
 * @param {[keyof T, unknown]} doesMatchProperty - An array where the first element is the property key and the second element is the value to match.
 * @returns {boolean} - `true` if every item has the specified property value, or `false` if at least one item does not match.
 *
 * @example
 * // Using a property-value pair
 * const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
 * const result = every(obj, ['name', 'Alice']);
 * console.log(result); // false
 */
export function every<T extends Record<string, unknown>>(object: T, doesMatchProperty: [keyof T, unknown]): boolean;

/**
 * Checks if every item in an object has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {T} object - The object to check through.
 * @param {string} propertyToCheck - The property name to check.
 * @returns {boolean} - `true` if every property value has the specified property, or `false` if at least one does not match.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = every(obj, 'name');
 * console.log(result); // true
 */
export function every<T extends Record<string, unknown>>(object: T, propertyToCheck: string): boolean;

/**
 * Checks if every item in an object has a specific property, where the property name is provided as a string.
 *
 * @template T
 * @param {T extends Record<string, unknown> ? T : never} object - The object to check through.
 * @param {readonly T[] | Record<any, any>} source - The source array or object to check through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string} doesMatch - The criteria to match. It can be a function, a partial object, a key-value pair, or a property name.
 * @param {string} propertyToCheck - The property name to check.
 * @returns {boolean} - `true` if every property value has the specified property, or `false` if at least one does not match.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = every(obj, 'name');
 * console.log(result); // true
 */
export function every<T>(
  source: readonly T[] | Record<any, any>,
  doesMatch?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string
): boolean {
  if (!source) {
    source = [];
  }

  let values = source;

  if (!Array.isArray(source)) {
    values = Object.values(source);
  }

  if (!doesMatch) {
    doesMatch = identity;
  }

  switch (typeof doesMatch) {
    case 'function': {
      if (!Array.isArray(source)) {
        const entries: any[] = Object.entries(source);

        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const key = entry[0];
          const value = entry[1];

          if (!doesMatch(value, key, source)) {
            return false;
          }
        }

        return true;
      }

      return values.every(doesMatch);
    }
    case 'object': {
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];

        return values.every(matchesProperty(key, value));
      } else {
        return values.every(matches(doesMatch));
      }
    }
    case 'string': {
      return values.every(property(doesMatch));
    }
  }
}
