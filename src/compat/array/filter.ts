import { identity } from '../_internal/identity';
import { property } from '../object/property';
import { isArray } from '../predicate/isArray';
import { matches } from '../predicate/matches';
import { matchesProperty } from '../predicate/matchesProperty';

/**
 * Filters items from a array and returns an array of elements.
 *
 * @template T
 * @param {T[]} arr - The array to iterate over.
 * @param {(item: T, index: number, arr: T[]) => unknown} doesMatch - The function invoked per iteration.
 * @returns {T[]} - Returns a new array of elements that satisfy the given doesMatch function.
 *
 * @example
 * filter([1, 2, 3], n => n % 2 === 0)
 * // => [2]
 */
export function filter<T>(arr: readonly T[], doesMatch?: (item: T, index: number, arr: readonly T[]) => unknown): T[];

/**
 * Filters elements in a arr that match the properties of the given partial object.
 *
 * @template T
 * @param {T[]} arr - The array to iterate over.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @returns {T[]} - Returns a new array of elements that match the given properties.
 *
 * @example
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * filter(arr, { name: 'Bob' });
 * // => [{ id: 2, name: 'Bob' }]
 */
export function filter<T>(arr: readonly T[], doesMatch: Partial<T>): T[];

/**
 * Filters elements in a arr that match the given key-value pair.
 *
 * @template T
 * @param {T[]} arr - The array to iterate over.
 * @param {[keyof T, unknown]} doesMatchProperty - The key-value pair to match.
 * @returns {T[]} - Returns a new array of elements that match the given key-value pair.
 *
 * @example
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * filter(arr, ['name', 'Alice']);
 * // => [{ id: 1, name: 'Alice' }]
 */
export function filter<T>(arr: readonly T[], doesMatchProperty: [keyof T, unknown]): T[];

/**
 * Filters the arr, returning elements that contain the given property name.
 *
 * @template T
 * @param {T[]} arr - The array to iterate over.
 * @param {string} propertyToCheck - The property name to check.
 * @returns {T[]} - Returns a new array of elements that match the given property name.
 *
 * @example
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, age: 28 }];
 * filter(arr, 'name');
 * // => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 */
export function filter<T>(arr: readonly T[], propertyToCheck: string): T[];

/**
 * Filters items from a object and returns an array of elements that match the given predicate function.
 *
 * @template T
 * @param {T} object - The object to iterate over.
 * @param {(value: T[keyof T], key: keyof T, object: T) => unknown} doesMatch - The function invoked per iteration.
 * @returns {T[]} - Returns a new array of elements that satisfy the given predicate function.
 *
 * @example
 * const obj = { item1: { a: 0 }, item2: { a: 1 }, item3: { a: 0 } }
 * filter(obj, value => value.a)
 * // => [{ a: 1 }]
 *
 * const obj = { a: 1, b: 2, c: 3 };
 * filter(obj, value => value > 2)
 * // => [3]
 */
export function filter<T extends Record<string, unknown>>(
  object: T,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): T[];

/**
 * Filters elements in a object that match the properties of the given partial object.
 *
 * @template T
 * @param {T} object - The object to iterate over.
 * @param {Partial<T[keyof T]>} doesMatch - The partial object to match
 * @returns {T[]} - Returns a new array of elements that match the given properties.pair.
 *
 * @example
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * filter(obj, { name: 'Bob' });
 * // => [{ id: 2, name: 'Bob' }]
 */
export function filter<T extends Record<string, unknown>>(object: T, doesMatch: Partial<T[keyof T]>): T[];

/**
 * Filters elements in a arr that match the given key-value pair.
 *
 * @template T
 * @param {T} object - The object to iterate over.
 * @param {[keyof T, unknown]} doesMatchProperty - The key-value pair to match.
 * @returns {T[]} - Returns a new array of elements that match the given key-value pair.
 *
 * @example
 * const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
 * filter(obj, ['name', 'Alice']);
 * // => [{ id: 1, name: 'Alice' }]
 */
export function filter<T extends Record<string, unknown>>(object: T, doesMatchProperty: [keyof T, unknown]): T[];

/**
 * Filters the object, returning elements that contain the given property name.
 *
 * @template T
 * @param {T} object - The object to iterate over.
 * @param {string} propertyToCheck - The property name to check.
 * @returns {T[]} - Returns a new array of elements that match the given property name.
 *
 * @example
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' }, c: { id: 3, age: 28 } };
 * filter(obj, 'name');
 * // => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 */
export function filter<T extends Record<string, unknown>>(object: T, propertyToCheck: string): T[];

/**
 * Iterates over the collection and filters elements based on the given predicate.
 * If a function is provided, it is invoked for each element in the collection.
 *
 * @template T
 * @param {T[] | Record<any, any>} source - The array or object to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string} [predicate=identity] - The function invoked per iteration.
 * @returns {T[]} - Returns a new array of filtered elements that satisfy the predicate.
 *
 * @example
 * filter([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
 * // => [{ a: 1 }, { a: 2 }]
 *
 * filter([{ a: 1 }, { a: 2 }, { b: 1 }], { b: 1 });
 * // => [{ b: 1 }]
 *
 * filter({ item1: { a: 0, b: true }, item2: { a: 1, b: true }, item3: { a: 2, b: false }}, { b: false })
 * // => [{ a: 2, b: false }]
 *
 * filter([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => [{ a: 2 }]
 */
export function filter<T>(
  source: T[] | Record<any, any>,
  predicate?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | string
): T[] {
  if (!predicate) {
    predicate = identity;
  }

  const collection = isArray(source) ? source : Object.values(source);

  switch (typeof predicate) {
    case 'function': {
      if (!Array.isArray(source)) {
        const result: T[] = [];
        const entries: any[] = Object.entries(source);

        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const key = entry[0];
          const value = entry[1];

          if (predicate(value, key, source)) {
            result.push(value);
          }
        }

        return result;
      }

      return collection.filter(predicate);
    }
    case 'object': {
      return isArray(predicate)
        ? collection.filter(matchesProperty(predicate[0], predicate[1]))
        : collection.filter(matches(predicate));
    }
    case 'string': {
      return collection.filter(property(predicate));
    }
  }
}
