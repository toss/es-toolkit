import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { MemoListIterator } from '../_internal/MemoListIterator.ts';
import { MemoObjectIterator } from '../_internal/MemoObjectIterator.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Reduces an array to a single value using an iteratee function.
 *
 * @param {T[] | null | undefined} collection - The array to iterate over
 * @param {MemoListIterator<T, U, T[]>} callback - The function invoked per iteration
 * @param {U} accumulator - The initial value
 * @returns {U} Returns the accumulated value
 *
 * @example
 * const array = [1, 2, 3];
 * reduce(array, (acc, value) => acc + value, 0); // => 6
 */
export function reduce<T, U>(
  collection: T[] | null | undefined,
  callback: MemoListIterator<T, U, T[]>,
  accumulator: U
): U;

/**
 * Reduces an array-like object to a single value using an iteratee function.
 *
 * @param {ArrayLike<T> | null | undefined} collection - The array-like object to iterate over
 * @param {MemoListIterator<T, U, ArrayLike<T>>} callback - The function invoked per iteration
 * @param {U} accumulator - The initial value
 * @returns {U} Returns the accumulated value
 *
 * @example
 * const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
 * reduce(arrayLike, (acc, value) => acc + value, 0); // => 6
 */
export function reduce<T, U>(
  collection: ArrayLike<T> | null | undefined,
  callback: MemoListIterator<T, U, ArrayLike<T>>,
  accumulator: U
): U;

/**
 * Reduces an object to a single value using an iteratee function.
 *
 * @param {T | null | undefined} collection - The object to iterate over
 * @param {MemoObjectIterator<T[keyof T], U, T>} callback - The function invoked per iteration
 * @param {U} accumulator - The initial value
 * @returns {U} Returns the accumulated value
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * reduce(obj, (acc, value) => acc + value, 0); // => 6
 */
export function reduce<T extends object, U>(
  collection: T | null | undefined,
  callback: MemoObjectIterator<T[keyof T], U, T>,
  accumulator: U
): U;

/**
 * Reduces an array to a single value using an iteratee function.
 *
 * @param {T[] | null | undefined} collection - The array to iterate over
 * @param {MemoListIterator<T, T, T[]>} callback - The function invoked per iteration
 * @returns {T | undefined} Returns the accumulated value
 *
 * @example
 * const array = [1, 2, 3];
 * reduce(array, (acc, value) => acc + value); // => 6
 */
export function reduce<T>(collection: T[] | null | undefined, callback: MemoListIterator<T, T, T[]>): T | undefined;

/**
 * Reduces an array-like object to a single value using an iteratee function.
 *
 * @param {ArrayLike<T> | null | undefined} collection - The array-like object to iterate over
 * @param {MemoListIterator<T, T, ArrayLike<T>>} callback - The function invoked per iteration
 * @returns {T | undefined} Returns the accumulated value
 *
 * @example
 * const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
 * reduce(arrayLike, (acc, value) => acc + value); // => 6
 */
export function reduce<T>(
  collection: ArrayLike<T> | null | undefined,
  callback: MemoListIterator<T, T, ArrayLike<T>>
): T | undefined;

/**
 * Reduces an object to a single value using an iteratee function.
 *
 * @param {T | null | undefined} collection - The object to iterate over
 * @param {MemoObjectIterator<T[keyof T], T[keyof T], T>} callback - The function invoked per iteration
 * @returns {T[keyof T] | undefined} Returns the accumulated value
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * reduce(obj, (acc, value) => acc + value); // => 6
 */
export function reduce<T extends object>(
  collection: T | null | undefined,
  callback: MemoObjectIterator<T[keyof T], T[keyof T], T>
): T[keyof T] | undefined;

/**
 * Reduces a collection to a single value using an iteratee function.
 *
 * @param {T[] | ArrayLike<T> | Record<string, T> | null | undefined} collection - The collection to iterate over.
 * @param {((accumulator: any, value: any, index: PropertyKey, collection: any) => any) | PropertyKey | object} iteratee - The function invoked per iteration or the key to reduce over.
 * @param {any} initialValue - The initial value.
 * @returns {any} - Returns the accumulated value.
 *
 * @example
 * // Using a reducer function
 * const array = [1, 2, 3];
 * reduce(array, (acc, value) => acc + value, 0); // => 6
 *
 * @example
 * // Using a reducer function with initialValue
 * const array = [1, 2, 3];
 * reduce(array, (acc, value) => acc + value % 2 === 0, true); // => false
 *
 * @example
 * // Using an object as the collection
 * const obj = { a: 1, b: 2, c: 3 };
 * reduce(obj, (acc, value) => acc + value, 0); // => 6
 */
export function reduce(
  collection: ArrayLike<any> | Record<any, any> | null | undefined,
  iteratee: (accumulator: any, value: any, index: any, collection: any) => any = identity,
  accumulator?: any
): any {
  if (!collection) {
    return accumulator;
  }

  let keys: any[];
  let startIndex = 0;

  if (isArrayLike(collection)) {
    keys = range(0, collection.length);

    if (accumulator == null && collection.length > 0) {
      accumulator = collection[0];
      startIndex += 1;
    }
  } else {
    keys = Object.keys(collection);

    if (accumulator == null) {
      accumulator = (collection as any)[keys[0]];
      startIndex += 1;
    }
  }

  for (let i = startIndex; i < keys.length; i++) {
    const key = keys[i];
    const value = (collection as any)[key];

    accumulator = iteratee(accumulator, value, key, collection);
  }

  return accumulator;
}
