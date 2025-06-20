import { flatten } from './flatten.ts';
import { map } from './map.ts';
import { identity } from '../../function/identity.ts';
import { ListIterator } from '../_internal/ListIterator.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

type RecursiveArray<T> = Array<T | RecursiveArray<T>>;

/**
 * Creates a flattened array of values by running each element through iteratee and flattening the mapped results up to depth times.
 *
 * @template T
 * @param {Record<string, RecursiveArray<T> | T> | Record<number, RecursiveArray<T> | T> | null | undefined} collection - The collection to iterate over.
 * @returns {T[]} Returns the new flattened array.
 *
 * @example
 * const obj = { a: [[1, 2]], b: [[[3]]] };
 * flatMapDepth(obj);
 * // => [1, 2, [3]]
 */
export function flatMapDepth<T>(
  collection: Record<string, RecursiveArray<T> | T> | Record<number, RecursiveArray<T> | T> | null | undefined
): T[];

/**
 * Creates a flattened array of values by running each element through iteratee and flattening the mapped results up to depth times.
 *
 * @template T, R
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over.
 * @param {ListIterator<T, RecursiveArray<R> | R>} iteratee - The function invoked per iteration.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {R[]} Returns the new flattened array.
 *
 * @example
 * function duplicate(n) {
 *   return [[n, n]];
 * }
 *
 * flatMapDepth([1, 2], duplicate, 2);
 * // => [1, 1, 2, 2]
 */
export function flatMapDepth<T, R>(
  collection: ArrayLike<T> | null | undefined,
  iteratee: ListIterator<T, RecursiveArray<R> | R>,
  depth?: number
): R[];

/**
 * Creates a flattened array of values by running each element through iteratee and flattening the mapped results up to depth times.
 *
 * @template T, R
 * @param {T | null | undefined} collection - The object to iterate over.
 * @param {ObjectIterator<T, RecursiveArray<R> | R>} iteratee - The function invoked per iteration.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {R[]} Returns the new flattened array.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * flatMapDepth(obj, (value, key) => [[key, value]], 2);
 * // => ['a', 1, 'b', 2]
 */
export function flatMapDepth<T extends object, R>(
  collection: T | null | undefined,
  iteratee: ObjectIterator<T, RecursiveArray<R> | R>,
  depth?: number
): R[];

/**
 * Creates a flattened array of values by running each element through iteratee and flattening the mapped results up to depth times.
 *
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {string} iteratee - The property name to use as iteratee.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {any[]} Returns the new flattened array.
 *
 * @example
 * const users = [
 *   { user: 'barney', hobbies: [['hiking'], ['coding']] },
 *   { user: 'fred', hobbies: [['reading']] }
 * ];
 * flatMapDepth(users, 'hobbies', 2);
 * // => ['hiking', 'coding', 'reading']
 */
export function flatMapDepth(collection: object | null | undefined, iteratee: string, depth?: number): any[];

/**
 * Creates a flattened array of values by running each element through iteratee and flattening the mapped results up to depth times.
 *
 * @param {object | null | undefined} collection - The collection to iterate over.
 * @param {object} iteratee - The object properties to match.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {boolean[]} Returns the new flattened array.
 *
 * @example
 * const users = [
 *   { user: 'barney', active: [[true], [false]] },
 *   { user: 'fred', active: [[false]] }
 * ];
 * flatMapDepth(users, { active: [[false]] });
 * // => [false]
 */
export function flatMapDepth(collection: object | null | undefined, iteratee: object, depth?: number): boolean[];

/**
 * Creates a flattened array of values by running each element through iteratee and flattening the mapped results up to depth times.
 *
 * @template T, R
 * @param {Record<string, ArrayLike<T | RecursiveArray<T>> | T> | Record<number, ArrayLike<T | RecursiveArray<T>> | T> | ArrayLike<T> | object | null | undefined} collection - The array or object to iterate over.
 * @param {((value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R) | ((value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R) | string | object} [iteratee] - The function that produces the new array elements.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {T[] | R[] | any[] | boolean[]} A new array that has been flattened up to the specified depth.
 *
 * @example
 * flatMapDepth([1, 2, 3], n => [[n, n]], 2);
 * // => [1, 1, 2, 2, 3, 3]
 */
export function flatMapDepth<T, R>(
  collection:
    | Record<string, ArrayLike<T | RecursiveArray<T>> | T>
    | Record<number, ArrayLike<T | RecursiveArray<T>> | T>
    | ArrayLike<T>
    | object
    | null
    | undefined,
  iteratee:
    | ((value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | RecursiveArray<R>> | R)
    | ((value: T[keyof T], key: string, object: T) => ArrayLike<R | RecursiveArray<R>> | R)
    | string
    | object = identity,
  depth = 1
): T[] | R[] | any[] | boolean[] {
  if (collection == null) {
    return [];
  }

  const iterateeFn = createIteratee(iteratee);
  const mapped = map(collection, iterateeFn);

  return flatten(mapped, depth);
}
