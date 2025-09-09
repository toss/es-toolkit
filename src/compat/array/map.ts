import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { ArrayIterator } from '../_internal/ArrayIterator.ts';
import { ListIterator } from '../_internal/ListIterator.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';
import { TupleIterator } from '../_internal/TupleIterator.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee as iterateeToolkit } from '../util/iteratee.ts';

/**
 * Maps each element in a tuple to a new tuple of values using an iteratee.
 *
 * @param {T} collection - The tuple to iterate over
 * @param {TupleIterator<T, U>} iteratee - The function invoked per iteration
 * @returns {{ [K in keyof T]: U }} - Returns the new mapped tuple
 *
 * @example
 * // Using a transformation function on a tuple
 * const tuple = [1, 'hello', true] as const;
 * map(tuple, value => String(value)); // => ['1', 'hello', 'true']
 */
export function map<T extends readonly [unknown, ...unknown[]], U>(
  collection: T,
  iteratee: TupleIterator<T, U>
): { [K in keyof T]: U };

/**
 * Maps each element in an array to a new array using an iteratee.
 *
 * @param {T[] | null | undefined} collection - The array to iterate over
 * @param {ArrayIterator<T, U>} iteratee - The function invoked per iteration
 * @returns {U[]} - Returns the new mapped array
 *
 * @example
 * // Using a transformation function on an array
 * const array = [1, 2, 3];
 * map(array, x => x * 2); // => [2, 4, 6]
 */
export function map<T, U>(collection: T[] | null | undefined, iteratee: ArrayIterator<T, U>): U[];

/**
 * Maps each element in an array-like object to a new array using an iteratee.
 *
 * @param {ArrayLike<T> | null | undefined} collection - The array-like object to iterate over
 * @param {ListIterator<T, U>} iteratee - The function invoked per iteration
 * @returns {U[]} - Returns the new mapped array
 *
 * @example
 * // Using a transformation function on an array-like object
 * const arrayLike = { length: 2, 0: 'a', 1: 'b' };
 * map(arrayLike, x => x.toUpperCase()); // => ['A', 'B']
 */
export function map<T, U>(collection: ArrayLike<T> | null | undefined, iteratee: ListIterator<T, U>): U[];

/**
 * Maps each value in an object to a new array.
 *
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The object to iterate over
 * @returns {T[]} - Returns an array of the object's values
 *
 * @example
 * // Converting an object's values to an array
 * const obj = { a: 1, b: 2, c: 3 };
 * map(obj); // => [1, 2, 3]
 */
export function map<T>(collection: Record<string, T> | Record<number, T> | null | undefined): T[];

/**
 * Maps each element in an object to a new array using an iteratee.
 *
 * @param {T | null | undefined} collection - The object to iterate over
 * @param {ObjectIterator<T, U>} iteratee - The function invoked per iteration
 * @returns {U[]} - Returns the new mapped array
 *
 * @example
 * // Using a transformation function on an object
 * const obj = { a: 1, b: 2 };
 * map(obj, (value, key) => `${key}:${value}`); // => ['a:1', 'b:2']
 */
export function map<T extends object, U>(collection: T | null | undefined, iteratee: ObjectIterator<T, U>): U[];

/**
 * Maps each element in an object to a new array by plucking the specified property.
 *
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The object to iterate over
 * @param {K} iteratee - The property to pluck from each element
 * @returns {Array<T[K]>} - Returns the new array of plucked values
 *
 * @example
 * // Plucking a property from each object
 * const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
 * map(users, 'name'); // => ['John', 'Jane']
 */
export function map<T, K extends keyof T>(
  collection: Record<string, T> | Record<number, T> | null | undefined,
  iteratee: K
): Array<T[K]>;

/**
 * Maps each element in an object to a new array by plucking the specified string property.
 *
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The object to iterate over
 * @param {string} [iteratee] - The string property to pluck from each element
 * @returns {any[]} - Returns the new array of plucked values
 *
 * @example
 * // Plucking a nested property
 * const users = [{ info: { name: 'John' } }, { info: { name: 'Jane' } }];
 * map(users, 'info.name'); // => ['John', 'Jane']
 */
export function map<T>(collection: Record<string, T> | Record<number, T> | null | undefined, iteratee?: string): any[];

/**
 * Maps each element in an object to a new array by matching against a source object.
 *
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The object to iterate over
 * @param {object} [iteratee] - The object to match against
 * @returns {boolean[]} - Returns an array of boolean values indicating matches
 *
 * @example
 * // Matching against a source object
 * const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
 * map(users, { age: 30 }); // => [true, false]
 */
export function map<T>(
  collection: Record<string, T> | Record<number, T> | null | undefined,
  iteratee?: object
): boolean[];

export function map(
  collection: any[] | ArrayLike<any> | Record<any, any> | null | undefined,
  _iteratee?: ((value: any, index: PropertyKey, collection: any) => any) | PropertyKey | object | null
): any[] {
  if (!collection) {
    return [];
  }

  const keys: PropertyKey[] =
    isArrayLike(collection) || Array.isArray(collection) ? range(0, collection.length) : Object.keys(collection);

  const iteratee = iterateeToolkit(_iteratee ?? identity);

  const result: any[] = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (collection as any)[key];

    result[i] = iteratee(value, key, collection);
  }

  return result;
}
