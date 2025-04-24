import { identity } from '../../function/identity.ts';
import { range } from '../../math/range.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

/**
 * Reduces an array to a single value using an iteratee function.
 *
 * The `reduce()` function goes through each element in an array and applies a special function (called a "reducer") to them, one by one.
 * This function takes the result of the previous step and the current element to perform a calculation.
 * After going through all the elements, the function gives you one final result.
 *
 * When the `reduce()` function starts, there's no previous result to use.
 * If you provide an initial value, it starts with that.
 * If not, it uses the first element of the array and begins with the second element for the calculation.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {(accumulator: U, value: T, index: number, collection: readonly T[]) => U} iteratee - The function invoked per iteration.
 * @param {U} initialValue - The initial value.
 * @returns {U} - Returns the accumulated value.
 *
 * @example
 * const arrayLike = [1, 2, 3];
 * reduce(arrayLike, (acc, value) => acc && value % 2 === 0, true); // => false
 */
export function reduce<T, U>(
  collection: readonly T[],
  iteratee: (accumulator: U, value: T, index: number, collection: readonly T[]) => U,
  initialValue: U
): U;

/**
 * Reduces an array to a single value using an iteratee function.
 *
 * The `reduce()` function goes through each element in an array and applies a special function (called a "reducer") to them, one by one.
 * This function takes the result of the previous step and the current element to perform a calculation.
 * After going through all the elements, the function gives you one final result.
 *
 * When the `reduce()` function starts, there's no previous result to use.
 * If you provide an initial value, it starts with that.
 * If not, it uses the first element of the array and begins with the second element for the calculation.
 *
 * @param {readonly T[]} collection - The collection to iterate over.
 * @param {(accumulator: T, value: T, index: number, collection: readonly T[]) => T} iteratee - The function invoked per iteration.
 * @returns {T} - Returns the accumulated value.
 *
 * @example
 * const arrayLike = [1, 2, 3];
 * reduce(arrayLike, (acc, value) => acc + value); // => 6
 */
export function reduce<T>(
  collection: readonly T[],
  iteratee: (accumulator: T, value: T, index: number, collection: readonly T[]) => T
): T;

/**
 * Reduces an array to a single value using an iteratee function.
 *
 * The `reduce()` function goes through each element in an array and applies a special function (called a "reducer") to them, one by one.
 * This function takes the result of the previous step and the current element to perform a calculation.
 * After going through all the elements, the function gives you one final result.
 *
 * When the `reduce()` function starts, there's no previous result to use.
 * If you provide an initial value, it starts with that.
 * If not, it uses the first element of the array and begins with the second element for the calculation.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {(accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U} iteratee - The function invoked per iteration.
 * @param {U} initialValue - The initial value.
 * @returns {U} - Returns the accumulated value.
 *
 * @example
 * const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
 * reduce(arrayLike, (acc, value) => acc + value % 2 === 0, true); // => false
 */
export function reduce<T, U>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U,
  initialValue: U
): U;

/**
 * Reduces an array to a single value using an iteratee function.
 *
 * The `reduce()` function goes through each element in an array and applies a special function (called a "reducer") to them, one by one.
 * This function takes the result of the previous step and the current element to perform a calculation.
 * After going through all the elements, the function gives you one final result.
 *
 * When the `reduce()` function starts, there's no previous result to use.
 * If you provide an initial value, it starts with that.
 * If not, it uses the first element of the array and begins with the second element for the calculation.
 *
 * @param {ArrayLike<T>} collection - The collection to iterate over.
 * @param {(accumulator: U, value: T, index: number, collection: ArrayLike<T>) => U} iteratee - The function invoked per iteration.
 * @returns {T} - Returns the accumulated value.
 *
 * @example
 * const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
 * reduce(arrayLike, (acc, value) => acc + value); // => 6
 */
export function reduce<T>(
  collection: ArrayLike<T>,
  iteratee: (accumulator: T, value: T, index: number, collection: ArrayLike<T>) => T
): T;

/**
 * Reduces an object to a single value using an iteratee function.
 *
 * @param {T} collection - The object to iterate over.
 * @param {(accumulator: U, value: T[keyof T], key: string, collection: T) => U} iteratee - The function invoked per iteration.
 * @param {U} initialValue - The initial value.
 * @returns {U} - Returns the accumulated value.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * reduce(obj, (acc, value) => acc + value % 2 === 0, true); // => false
 */
export function reduce<T extends object, U>(
  collection: T,
  iteratee: (accumulator: U, value: T[keyof T], key: keyof T, collection: T) => U,
  initialValue: U
): U;

/**
 * Reduces an object to a single value using an iteratee function.
 *
 * @param {T} collection - The object to iterate over.
 * @param {(accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => U} iteratee - The function invoked per iteration.
 * @returns {T[keyof T]} - Returns the accumulated value.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * reduce(obj, (acc, value) => acc + value); // => 6
 */
export function reduce<T extends object>(
  collection: T,
  iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, collection: T) => T[keyof T]
): T[keyof T];

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
