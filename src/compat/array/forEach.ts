import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { ArrayIterator } from '../_internal/ArrayIterator.ts';
import { ListIterator } from '../_internal/ListIterator.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';
import { StringIterator } from '../_internal/StringIterator.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Iterates over elements of array and invokes iteratee for each element.
 *
 * @template T
 * @param collection - The array to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns array.
 *
 * @example
 * forEach([1, 2], value => console.log(value));
 * // => Logs `1` then `2`.
 */
export function forEach<T>(collection: T[], iteratee?: ArrayIterator<T, any>): T[];

/**
 * Iterates over characters of string and invokes iteratee for each character.
 *
 * @param collection - The string to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns string.
 *
 * @example
 * forEach('abc', char => console.log(char));
 * // => Logs 'a', 'b', then 'c'.
 */
export function forEach(collection: string, iteratee?: StringIterator<any>): string;

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 *
 * @template T
 * @param collection - The collection to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns collection.
 *
 * @example
 * forEach({ 0: 'a', 1: 'b', length: 2 }, value => console.log(value));
 * // => Logs 'a' then 'b'.
 */
export function forEach<T>(collection: ArrayLike<T>, iteratee?: ListIterator<T, any>): ArrayLike<T>;

/**
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 *
 * @template T
 * @param collection - The object to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns object.
 *
 * @example
 * forEach({ a: 1, b: 2 }, (value, key) => console.log(key));
 * // => Logs 'a' then 'b'.
 */
export function forEach<T extends object>(collection: T, iteratee?: ObjectIterator<T, any>): T;

/**
 * Iterates over elements of array and invokes iteratee for each element.
 *
 * @template T, U
 * @param collection - The array to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns the array.
 *
 * @example
 * forEach([1, 2], value => console.log(value));
 * // => Logs `1` then `2`.
 */
export function forEach<T, U extends T[] | null | undefined>(
  collection: U & (T[] | null | undefined),
  iteratee?: ArrayIterator<T, any>
): U;

/**
 * Iterates over characters of string and invokes iteratee for each character.
 *
 * @template T
 * @param collection - The string to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns the string.
 *
 * @example
 * forEach('abc', char => console.log(char));
 * // => Logs 'a', 'b', then 'c'.
 */
export function forEach<T extends string | null | undefined>(collection: T, iteratee?: StringIterator<any>): T;

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 *
 * @template T, L
 * @param collection - The collection to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns the collection.
 *
 * @example
 * forEach({ 0: 'a', 1: 'b', length: 2 }, value => console.log(value));
 * // => Logs 'a' then 'b'.
 */
export function forEach<T, L extends ArrayLike<T> | null | undefined>(
  collection: L & (ArrayLike<T> | null | undefined),
  iteratee?: ListIterator<T, any>
): L;

/**
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 *
 * @template T
 * @param collection - The object to iterate over.
 * @param [iteratee] - The function invoked per iteration.
 * @returns Returns the object.
 *
 * @example
 * forEach({ a: 1, b: 2 }, (value, key) => console.log(key));
 * // => Logs 'a' then 'b'.
 */
export function forEach<T extends object>(
  collection: T | null | undefined,
  iteratee?: ObjectIterator<T, any>
): T | null | undefined;

/**
 * Iterates over each element of the object invoking the provided callback function for each property.
 *
 * @template T - The type of object.
 * @param object - The object to iterate over.
 * @param [callback] - The function invoked for each property.
 * The callback function receives three arguments:
 *  - 'value': The current property being processed in the object.
 *  - 'key': The key of the current property being processed in the object.
 *  - 'object': The object 'forEach' was called upon.
 * @returns Returns the original object.
 *
 * @example
 * forEach({'a': 1, 'b': 2 }, (value, key, object) => console.log(value, key));
 * // Output:
 * // 1 'a'
 * // 2 'b'
 */
export function forEach<T>(
  collection: ArrayLike<T> | Record<any, any> | string | null | undefined,
  callback: (item: any, index: any, arr: any) => unknown = identity
): ArrayLike<T> | Record<any, any> | string | null | undefined {
  if (!collection) {
    return collection;
  }

  const keys: PropertyKey[] = isArrayLike(collection) ? range(0, collection.length) : Object.keys(collection);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (collection as any)[key];

    const result = callback(value, key, collection);

    if (result === false) {
      break;
    }
  }

  return collection;
}
