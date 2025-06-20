import { filter } from './filter.ts';
import { identity } from '../../function/identity.ts';
import { ListIterateeCustom } from '../_internal/ListIteratee.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import type { StringIterator } from '../_internal/StringIterator.ts';
import { negate } from '../function/negate.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Iterates over the collection and rejects elements based on the given predicate.
 * If a function is provided, it is invoked for each element in the collection.
 *
 * @param {string | null | undefined} collection The string to iterate over
 * @param {StringIterator<boolean>} [predicate] The function invoked per iteration
 * @returns {string[]} Returns a new array of characters that do not satisfy the predicate
 * @example
 * reject('abc', char => char === 'b')
 * // => ['a', 'c']
 */
export function reject(collection: string | null | undefined, predicate?: StringIterator<boolean>): string[];

/**
 * Iterates over the collection and rejects elements based on the given predicate.
 * If a function is provided, it is invoked for each element in the collection.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} collection The array-like to iterate over
 * @param {ListIterateeCustom<T, boolean>} [predicate] The function invoked per iteration
 * @returns {T[]} Returns a new array of elements that do not satisfy the predicate
 * @example
 * reject([1, 2, 3], num => num % 2 === 0)
 * // => [1, 3]
 *
 * reject([{ a: 1 }, { a: 2 }, { b: 1 }], 'a')
 * // => [{ b: 1 }]
 */
export function reject<T>(collection: ArrayLike<T> | null | undefined, predicate?: ListIterateeCustom<T, boolean>): T[];

/**
 * Iterates over the collection and rejects elements based on the given predicate.
 * If a function is provided, it is invoked for each element in the collection.
 *
 * @template T
 * @param {T | null | undefined} collection The object to iterate over
 * @param {ObjectIterateeCustom<T, boolean>} [predicate] The function invoked per iteration
 * @returns {Array<T[keyof T]>} Returns a new array of elements that do not satisfy the predicate
 * @example
 * reject({ a: 1, b: 2, c: 3 }, value => value % 2 === 0)
 * // => [1, 3]
 *
 * reject({ item1: { a: 0, b: true }, item2: { a: 1, b: true }, item3: { a: 2, b: false }}, { b: false })
 * // => [{ a: 0, b: true }, { a: 1, b: true }]
 */
export function reject<T extends object>(
  collection: T | null | undefined,
  predicate?: ObjectIterateeCustom<T, boolean>
): Array<T[keyof T]>;

/**
 * Iterates over the collection and rejects elements based on the given predicate.
 * If a function is provided, it is invoked for each element in the collection.
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The array or object to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} [predicate=identity] - The function invoked per iteration.
 * @returns {T[]} - Returns a new array of elements that do not satisfy the predicate.
 *
 * @example
 * reject([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
 * // => [{ b: 1 }]
 *
 * reject([{ a: 1 }, { a: 2 }, { b: 1 }], { b: 1 });
 * // => [{ a: 1 }, { a: 2 }]
 *
 * reject({ item1: { a: 0, b: true }, item2: { a: 1, b: true }, item3: { a: 2, b: false }}, { b: false })
 * // => [{ a: 0, b: true }, { a: 1, b: true }]
 *
 * reject([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => [{ a: 1 }, { a: 3 }]
 */
export function reject<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  predicate: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey = identity
): T[] {
  return filter(source, negate(iteratee(predicate)));
}
