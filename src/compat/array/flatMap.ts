import { flattenDepth } from './flattenDepth.ts';
import { map } from './map.ts';
import { isNil } from '../../predicate/isNil.ts';
import { ListIterator } from '../_internal/ListIterator.ts';
import { Many } from '../_internal/Many.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @template T
 * @param {Record<string, Many<T>> | Record<number, Many<T>> | null | undefined} collection - The collection to iterate over.
 * @returns {T[]} Returns the new flattened array.
 *
 * @example
 * const obj = { a: [1, 2], b: [3, 4] };
 * flatMap(obj);
 * // => [1, 2, 3, 4]
 */
export function flatMap<T>(collection: Record<string, Many<T>> | Record<number, Many<T>> | null | undefined): T[];

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @returns {any[]} Returns the new flattened array.
 *
 * @example
 * flatMap({ a: 1, b: 2 });
 * // => [1, 2]
 */
export function flatMap(collection: object | null | undefined): any[];

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @template T, R
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over.
 * @param {ListIterator<T, Many<R>>} iteratee - The function invoked per iteration.
 * @returns {R[]} Returns the new flattened array.
 *
 * @example
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
export function flatMap<T, R>(collection: ArrayLike<T> | null | undefined, iteratee: ListIterator<T, Many<R>>): R[];

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @template T, R
 * @param {T | null | undefined} collection - The object to iterate over.
 * @param {ObjectIterator<T, Many<R>>} iteratee - The function invoked per iteration.
 * @returns {R[]} Returns the new flattened array.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * flatMap(obj, (value, key) => [key, value]);
 * // => ['a', 1, 'b', 2]
 */
export function flatMap<T extends object, R>(
  collection: T | null | undefined,
  iteratee: ObjectIterator<T, Many<R>>
): R[];

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {string} iteratee - The property name to use as iteratee.
 * @returns {any[]} Returns the new flattened array.
 *
 * @example
 * const users = [
 *   { user: 'barney', hobbies: ['hiking', 'coding'] },
 *   { user: 'fred', hobbies: ['reading'] }
 * ];
 * flatMap(users, 'hobbies');
 * // => ['hiking', 'coding', 'reading']
 */
export function flatMap(collection: object | null | undefined, iteratee: string): any[];

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {object} iteratee - The object properties to match.
 * @returns {boolean[]} Returns the new flattened array.
 *
 * @example
 * const users = [
 *   { user: 'barney', age: 36, active: true },
 *   { user: 'fred', age: 40, active: false }
 * ];
 * flatMap(users, { active: false });
 * // => [false]
 */
export function flatMap(collection: object | null | undefined, iteratee: object): boolean[];

/**
 * Creates a flattened array of values by running each element in collection through iteratee and flattening the mapped results.
 *
 * @template R
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {any} [iteratee] - The function invoked per iteration.
 * @returns {R[]} Returns the new flattened array.
 *
 * @example
 * flatMap([1, 2], n => [n, n * 2]);
 * // => [1, 2, 2, 4]
 */
export function flatMap<R = any>(collection: object | null | undefined, iteratee?: any): R[] {
  if (isNil(collection)) {
    return [];
  }

  // eslint-disable-next-line
  // @ts-ignore
  const mapped = isNil(iteratee) ? map(collection) : map(collection, iteratee);

  return flattenDepth(mapped, 1) as R[];
}
