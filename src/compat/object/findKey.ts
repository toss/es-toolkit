import { property } from './property.ts';
import { findKey as findKeyToolkit } from '../../object/findKey.ts';
import { isObject } from '../predicate/isObject.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Finds the key of the first element predicate returns truthy for.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean} conditionToFind - The function invoked per iteration.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findKey(users, o => o.age < 40);
 * // => 'barney'
 */
export function findKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;

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
export function findKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  objectToFind: Partial<T[keyof T]>
): keyof T | undefined;

/**
 * Finds the key of the first element that matches the given property and value.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {[keyof T[keyof T], any]} propertyToFind - The property and value to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'age': 36 }, 'fred': { 'age': 40 } };
 * const result = findKey(users, ['age', 36]);
 * // => 'barney'
 */
export function findKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  propertyToFind: [keyof T[keyof T], any]
): keyof T | undefined;

/**
 * Finds the key of the first element that has a truthy value for the given property.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {keyof T[keyof T]} propertyToFind - The property to check.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 *
 * @example
 * const users = { 'barney': { 'active': true }, 'fred': { 'active': false } };
 * const result = findKey(users, 'active');
 * // => 'barney'
 */
export function findKey<T extends Record<any, any>>(
  obj: T | null | undefined,
  propertyToFind: keyof T[keyof T]
): keyof T | undefined;

/**
 * Finds the key of the first element that matches the given predicate.
 *
 * This function determines the type of the predicate and delegates the search
 * to the appropriate helper function. It supports predicates as functions, objects,
 * arrays, or strings.
 *
 * @template T - The type of the object.
 * @param {T | null | undefined} obj - The object to inspect.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean | Partial<T[keyof T]> | [keyof T[keyof T], any] | keyof T[keyof T]} predicate - The predicate to match.
 * @returns {keyof T | undefined} Returns the key of the matched element, else `undefined`.
 */
export function findKey<T extends Record<any, any>>(
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

  return findKeyImpl(obj, predicate);
}

function findKeyImpl<T extends Record<any, any>>(
  obj: T,
  predicate:
    | ((value: T[keyof T], key: keyof T, obj: T) => boolean)
    | Partial<T[keyof T]>
    | [keyof T[keyof T], any]
    | keyof T[keyof T]
) {
  if (typeof predicate === 'function') {
    return findKeyToolkit(obj, predicate);
  }

  if (typeof predicate === 'object') {
    if (Array.isArray(predicate)) {
      const key = predicate[0];
      const value = predicate[1];

      return findKeyToolkit(obj, matchesProperty(key, value));
    }

    return findKeyToolkit(obj, matches(predicate));
  }

  if (typeof predicate === 'string') {
    return findKeyToolkit(obj, property(predicate));
  }
}
