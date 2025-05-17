import { property } from './property';
import { isObject } from '../predicate/isObject';
import { matches } from '../predicate/matches';
import { matchesProperty } from '../predicate/matchesProperty';

/**
 * Finds the key of the last element predicate returns truthy for.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean} conditionToFind - The function invoked per iteration.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findLastKey(users, o => o.age < 40);
 * // => 'barney'
 */
export function findLastKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;

/**
 * Finds the key of the last element that matches the given object.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {Partial<T[keyof T]>} objectToFind - The object to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findLastKey(users, { 'age': 36 });
 * // => 'barney'
 */
export function findLastKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  objectToFind: Partial<T[keyof T]>
): keyof T | undefined;

/**
 * Finds the key of the last element that matches the given property and value.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {[keyof T[keyof T], any]} propertyToFind - The property and value to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'active': true }, 'fred': { 'active': false } };
 * const result = findLastKey(users, ['active', false]);
 * // => 'fred'
 */
export function findLastKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  propertyToFind: [keyof T[keyof T], any]
): keyof T | undefined;

/**
 * Finds the key of the last element that has a truthy value for the given property.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {keyof T[keyof T]} propertyToFind - The property to check.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'active': true }, 'fred': { 'active': false }, 'pebbles': { 'active': true } };
 * const result = findLastKey(users, 'active');
 * // => 'pebbles'
 */
export function findLastKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  propertyToFind: keyof T[keyof T]
): keyof T | undefined;

/**
 * Finds the key of the last element that matches the given predicate.
 *
 * This function determines the type of the predicate and delegates the search
 * to the appropriate helper function. It supports predicates as functions, objects,
 * arrays, or strings.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean | Partial<T[keyof T]> | [keyof T[keyof T], any] | keyof T[keyof T]} predicate - The predicate to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = {
 *   barney: { age: 36, active: true },
 *   fred: { age: 40, active: false },
 *   pebbles: { age: 1, active: true }
 * };
 *
 * findLastKey(users, o => o.age < 40); // => 'pebbles'
 * findLastKey(users, { active: true }); // => 'pebbles'
 * findLastKey(users, ['active', false]); // => 'fred'
 * findLastKey(users, 'active'); // => 'pebbles'
 */
export function findLastKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  predicate:
    | ((value: T[keyof T], key: keyof T, obj: T) => boolean)
    | Partial<T[keyof T]>
    | [keyof T[keyof T], any]
    | keyof T[keyof T]
): keyof T | undefined {
  if (!isObject(obj)) {
    return undefined;
  }

  let iteratee: (value: T[keyof T], key: keyof T, obj: T) => boolean;

  if (typeof predicate === 'function') {
    iteratee = predicate;
  } else if (Array.isArray(predicate)) {
    iteratee = matchesProperty(predicate[0], predicate[1]);
  } else if (typeof predicate === 'object') {
    iteratee = matches(predicate);
  } else {
    iteratee = property(predicate);
  }

  const keys = Object.keys(obj) as Array<keyof T>;
  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    if (iteratee(obj[key], key, obj)) {
      return key;
    }
  }

  return undefined;
}
