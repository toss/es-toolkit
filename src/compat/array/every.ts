import { identity } from '../../function/identity.ts';
import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { ListIterateeCustom } from '../_internal/ListIterateeCustom.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import { property } from '../object/property.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Checks if all elements in a collection pass the predicate check.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @template T - The type of elements in the collection
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over
 * @param {ListIterateeCustom<T, boolean>} [predicate=identity] - The function invoked per iteration
 * @returns {boolean} Returns true if all elements pass the predicate check, else false
 *
 * @example
 * // Using a function predicate
 * every([true, 1, null, 'yes'], Boolean)
 * // => false
 *
 * // Using property shorthand
 * const users = [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }]
 * every(users, 'age')
 * // => true
 *
 * // Using matches shorthand
 * every(users, { age: 36 })
 * // => false
 *
 * // Using matchesProperty shorthand
 * every(users, ['age', 36])
 * // => false
 */
export function every<T>(
  collection: ArrayLike<T> | null | undefined,
  predicate?: ListIterateeCustom<T, boolean>
): boolean;

/**
 * Checks if all elements in an object pass the predicate check.
 * The predicate is invoked with three arguments: (value, key, object).
 *
 * @template T - The type of the object
 * @param {T | null | undefined} collection - The object to iterate over
 * @param {ObjectIterateeCustom<T, boolean>} [predicate=identity] - The function invoked per iteration
 * @returns {boolean} Returns true if all elements pass the predicate check, else false
 *
 * @example
 * // Using a function predicate
 * every({ a: true, b: 1, c: null }, Boolean)
 * // => false
 *
 * // Using property shorthand
 * const users = {
 *   barney: { active: true, age: 36 },
 *   fred: { active: true, age: 40 }
 * }
 * every(users, 'active')
 * // => true
 *
 * // Using matches shorthand
 * every(users, { active: true })
 * // => true
 *
 * // Using matchesProperty shorthand
 * every(users, ['age', 36])
 * // => false
 */
export function every<T extends object>(
  collection: T | null | undefined,
  predicate?: ObjectIterateeCustom<T, boolean>
): boolean;

/**
 * Checks if every item in an object has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {T extends Record<string, unknown> ? T : never} object - The object to check through.
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The source array or object to check through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} doesMatch - The criteria to match. It can be a function, a partial object, a key-value pair, or a property name.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @param {unknown} guard - Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} - `true` if every property value has the specified property, or `false` if at least one does not match.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = every(obj, 'name');
 * console.log(result); // true
 */
export function every<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  doesMatch?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey,
  guard?: unknown
): boolean {
  if (!source) {
    return true;
  }

  if (guard && isIterateeCall(source, doesMatch, guard)) {
    doesMatch = undefined;
  }

  if (!doesMatch) {
    doesMatch = identity;
  }

  let predicate: (value: any, index: number, collection: any) => boolean;

  switch (typeof doesMatch) {
    case 'function': {
      predicate = doesMatch as any;
      break;
    }
    case 'object': {
      if (Array.isArray(doesMatch) && doesMatch.length === 2) {
        const key = doesMatch[0];
        const value = doesMatch[1];
        predicate = matchesProperty(key, value);
      } else {
        predicate = matches(doesMatch);
      }
      break;
    }
    case 'symbol':
    case 'number':
    case 'string': {
      predicate = property(doesMatch);
    }
  }

  if (!isArrayLike(source)) {
    const keys = Object.keys(source) as Array<keyof typeof source>;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = source[key];

      if (!predicate(value, key, source)) {
        return false;
      }
    }

    return true;
  }

  for (let i = 0; i < source.length; i++) {
    if (!predicate(source[i], i, source)) {
      return false;
    }
  }

  return true;
}
