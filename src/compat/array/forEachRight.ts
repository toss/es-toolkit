import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { ArrayIterator } from '../_internal/ArrayIterator.ts';
import { StringIterator } from '../_internal/StringIterator.ts';
import { ListIterator } from '../_internal/ListIterator.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';

/**
 * Iterates over elements of array from right to left and invokes iteratee for each element.
 *
 * @template T
 * @param {T[]} collection - The array to iterate over.
 * @param {ArrayIterator<T, any>} [iteratee] - The function invoked per iteration.
 * @returns {T[]} Returns array.
 *
 * @example
 * forEachRight([1, 2], value => console.log(value));
 * // => Logs `2` then `1`.
 */
export function forEachRight<T>(collection: T[], iteratee?: ArrayIterator<T, any>): T[];

/**
 * Iterates over characters of string from right to left and invokes iteratee for each character.
 *
 * @param {string} collection - The string to iterate over.
 * @param {StringIterator<any>} [iteratee] - The function invoked per iteration.
 * @returns {string} Returns string.
 *
 * @example
 * forEachRight('abc', char => console.log(char));
 * // => Logs 'c', 'b', then 'a'.
 */
export function forEachRight(collection: string, iteratee?: StringIterator<any>): string;

/**
 * Iterates over elements of collection from right to left and invokes iteratee for each element.
 *
 * @template T
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {ListIterator<T, any>} [iteratee] - The function invoked per iteration.
 * @returns {ArrayLike<T>} Returns collection.
 *
 * @example
 * forEachRight({ 0: 'a', 1: 'b', length: 2 }, value => console.log(value));
 * // => Logs 'b' then 'a'.
 */
export function forEachRight<T>(collection: ArrayLike<T>, iteratee?: ListIterator<T, any>): ArrayLike<T>;

/**
 * Iterates over own enumerable string keyed properties of an object from right to left and invokes iteratee for each property.
 *
 * @template T
 * @param {T} collection - The object to iterate over.
 * @param {ObjectIterator<T, any>} [iteratee] - The function invoked per iteration.
 * @returns {T} Returns object.
 *
 * @example
 * forEachRight({ a: 1, b: 2 }, (value, key) => console.log(key));
 * // => Logs 'b' then 'a'.
 */
export function forEachRight<T extends object>(collection: T, iteratee?: ObjectIterator<T, any>): T;

/**
 * Iterates over elements of array from right to left and invokes iteratee for each element.
 *
 * @template T, U
 * @param {U & (T[] | null | undefined)} collection - The array to iterate over.
 * @param {ArrayIterator<T, any>} [iteratee] - The function invoked per iteration.
 * @returns {U} Returns the array.
 *
 * @example
 * forEachRight([1, 2], value => console.log(value));
 * // => Logs `2` then `1`.
 */
export function forEachRight<T, U extends T[] | null | undefined>(collection: U & (T[] | null | undefined), iteratee?: ArrayIterator<T, any>): U;

/**
 * Iterates over characters of string from right to left and invokes iteratee for each character.
 *
 * @template T
 * @param {T} collection - The string to iterate over.
 * @param {StringIterator<any>} [iteratee] - The function invoked per iteration.
 * @returns {T} Returns the string.
 *
 * @example
 * forEachRight('abc', char => console.log(char));
 * // => Logs 'c', 'b', then 'a'.
 */
export function forEachRight<T extends string | null | undefined>(collection: T, iteratee?: StringIterator<any>): T;

/**
 * Iterates over elements of collection from right to left and invokes iteratee for each element.
 *
 * @template T, L
 * @param {L & (ArrayLike<T> | null | undefined)} collection - The collection to iterate over.
 * @param {ListIterator<T, any>} [iteratee] - The function invoked per iteration.
 * @returns {L} Returns the collection.
 *
 * @example
 * forEachRight({ 0: 'a', 1: 'b', length: 2 }, value => console.log(value));
 * // => Logs 'b' then 'a'.
 */
export function forEachRight<T, L extends ArrayLike<T> | null | undefined>(collection: L & (ArrayLike<T> | null | undefined), iteratee?: ListIterator<T, any>): L;

/**
 * Iterates over own enumerable string keyed properties of an object from right to left and invokes iteratee for each property.
 *
 * @template T
 * @param {T | null | undefined} collection - The object to iterate over.
 * @param {ObjectIterator<T, any>} [iteratee] - The function invoked per iteration.
 * @returns {T | null | undefined} Returns the object.
 *
 * @example
 * forEachRight({ a: 1, b: 2 }, (value, key) => console.log(key));
 * // => Logs 'b' then 'a'.
 */
export function forEachRight<T extends object>(collection: T | null | undefined, iteratee?: ObjectIterator<T, any>): T | null | undefined;

/**
 * Iterates over elements of 'array' from right to left and invokes 'callback' for each element.
 *
 * @template T - The type of object.
 * @param {T} object - The object to iterate over.
 * @param {(value: T[keyof T], key: keyof T, object: T) => unknown} [callback] - The function invoked for each property.
 * The callback function receives three arguments:
 *  - 'value': The current property being processed in the object.
 *  - 'key': The key of the current property being processed in the object.
 *  - 'object': The object 'forEachRight' was called upon.
 * @returns {T} Returns the original object.
 *
 * @example
 * forEachRight({'a': 1, 'b': 2 }, (value, key, object) => console.log(value, key));
 * // Output:
 * // 2 'b'
 * // 1 'a'
 */
export function forEachRight<T>(
  collection: ArrayLike<T> | Record<any, any> | string | null | undefined,
  callback: (item: any, index: any, arr: any) => unknown = identity
): ArrayLike<T> | Record<any, any> | string | null | undefined {
  if (!collection) {
    return collection;
  }

  const keys: PropertyKey[] = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);

  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    const value = (collection as any)[key];

    const result = callback(value, key, collection);

    if (result === false) {
      break;
    }
  }

  return collection;
}
