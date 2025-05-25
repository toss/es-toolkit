import { findKey as findKeyToolkit } from '../../object/findKey.ts';
import { isObject } from '../predicate/isObject.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Finds the key of the first element predicate returns truthy for.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => unknown} conditionToFind - The function invoked per iteration.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findKey(users, o => o.age < 40);
 * // => 'barney'
 */
export function findKey<T>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined;

/**
 * Finds the key of the first element that matches the given object.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {Partial<T[keyof T]>} objectToFind - The object to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findKey(users, { 'age': 36 });
 * // => 'barney'
 */
export function findKey<T>(obj: T | null | undefined, objectToFind: Partial<T[keyof T]>): string | undefined;

/**
 * Finds the key of the first element that matches the given property and value.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {[PropertyKey, any]} propertyToFind - The property and value to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findKey(users, ['age', 36]);
 * // => 'barney'
 */
export function findKey<T>(obj: T | null | undefined, propertyToFind: [PropertyKey, any]): string | undefined;

/**
 * Finds the key of the first element that has a truthy value for the given property.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {PropertyKey} propertyToFind - The property to check.
 * @returns {string | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'active': true }, 'fred': { 'active': false } };
 * const result = findKey(users, 'active');
 * // => 'barney'
 */
export function findKey<T>(obj: T | null | undefined, propertyToFind: PropertyKey): string | undefined;

/**
 * Finds the key of the first element that matches the given predicate.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {((value: T[keyof T], key: string, obj: T) => unknown) | PropertyKey | [PropertyKey, any] | Partial<T[keyof T]>} predicate - The predicate to match.
 * @returns {string | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * findKey(users, o => o.age < 40); //
 * // => 'barney'
 *
 * findKey(users, { 'age': 36 });
 * // => 'barney'
 *
 * findKey(users, ['age', 36]);
 * // => 'barney'
 *
 * findKey(users, 'age');
 * // => 'barney'
 */
export function findKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined;

/**
 * Finds the key of the first element that matches the given predicate.
 *
 * This function determines the type of the predicate and delegates the search
 * to the appropriate helper function. It supports predicates as functions, objects,
 * arrays, or strings.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean | Partial<T[keyof T]> | [PropertyKey, any] | PropertyKey} predicate - The predicate to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 */
export function findKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined {
  if (!isObject(obj)) {
    return undefined;
  }

  const iteratee = createIteratee(predicate);

  return findKeyToolkit(obj, iteratee) as string | undefined;
}
