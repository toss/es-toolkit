import { flatMapDepth } from './flatMapDepth.ts';
import { ListIterator } from '../_internal/ListIterator.ts';
import { ListOfRecursiveArraysOrValues } from '../_internal/ListOfRecursiveArraysOrValues.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';

/**
 * Creates a flattened array of values by running each element through iteratee and recursively flattening the mapped results.
 *
 * @template T
 * @param collection - The collection to iterate over.
 * @returns Returns the new deeply flattened array.
 *
 * @example
 * const obj = { a: [[1, 2]], b: [[[3]]] };
 * flatMapDeep(obj);
 * // => [1, 2, 3]
 */
export function flatMapDeep<T>(
  collection:
    | Record<string, ListOfRecursiveArraysOrValues<T> | T>
    | Record<number, ListOfRecursiveArraysOrValues<T> | T>
    | null
    | undefined
): T[];

/**
 * Creates a flattened array of values by running each element through iteratee and recursively flattening the mapped results.
 *
 * @template T, R
 * @param collection - The collection to iterate over.
 * @param iteratee - The function invoked per iteration.
 * @returns Returns the new deeply flattened array.
 *
 * @example
 * function duplicate(n) {
 *   return [[[n, n]]];
 * }
 *
 * flatMapDeep([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
export function flatMapDeep<T, R>(
  collection: ArrayLike<T> | null | undefined,
  iteratee: ListIterator<T, ListOfRecursiveArraysOrValues<R> | R>
): R[];

/**
 * Creates a flattened array of values by running each element through iteratee and recursively flattening the mapped results.
 *
 * @template T, R
 * @param collection - The object to iterate over.
 * @param iteratee - The function invoked per iteration.
 * @returns Returns the new deeply flattened array.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * flatMapDeep(obj, (value, key) => [[[key, value]]]);
 * // => ['a', 1, 'b', 2]
 */
export function flatMapDeep<T extends object, R>(
  collection: T | null | undefined,
  iteratee: ObjectIterator<T, ListOfRecursiveArraysOrValues<R> | R>
): R[];

/**
 * Creates a flattened array of values by running each element through iteratee and recursively flattening the mapped results.
 *
 * @param collection - The collection to iterate over.
 * @param iteratee - The property name to use as iteratee.
 * @returns Returns the new deeply flattened array.
 *
 * @example
 * const users = [
 *   { user: 'barney', hobbies: [['hiking', 'coding']] },
 *   { user: 'fred', hobbies: [['reading']] }
 * ];
 * flatMapDeep(users, 'hobbies');
 * // => ['hiking', 'coding', 'reading']
 */
export function flatMapDeep(collection: object | null | undefined, iteratee: string): any[];

/**
 * Creates a flattened array of values by running each element through iteratee and recursively flattening the mapped results.
 *
 * @param collection - The collection to iterate over.
 * @param iteratee - The object properties to match.
 * @returns Returns the new deeply flattened array.
 *
 * @example
 * const users = [
 *   { user: 'barney', active: [true, false] },
 *   { user: 'fred', active: [false] }
 * ];
 * flatMapDeep(users, { active: [false] });
 * // => [false]
 */
export function flatMapDeep(collection: object | null | undefined, iteratee: object): boolean[];

/**
 * Creates a flattened array of values by running each element through iteratee and recursively flattening the mapped results.
 *
 * @template T, R
 * @param collection - The array or object to iterate over.
 * @param [iteratee] - The function that produces the new array elements.
 * @returns A new array that has been deeply flattened.
 *
 * @example
 * flatMapDeep([1, 2, 3], n => [[n, n]]);
 * // => [1, 1, 2, 2, 3, 3]
 */
export function flatMapDeep<T, R>(
  collection:
    | Record<string, ArrayLike<T | ListOfRecursiveArraysOrValues<T>> | T>
    | Record<number, ArrayLike<T | ListOfRecursiveArraysOrValues<T>> | T>
    | ArrayLike<T>
    | object
    | null
    | undefined,
  iteratee?:
    | ((value: T, index: number, array: ArrayLike<T>) => ArrayLike<R | ListOfRecursiveArraysOrValues<R>> | R)
    | ((value: T[keyof T], key: string, object: T) => ArrayLike<R | ListOfRecursiveArraysOrValues<R>> | R)
    | string
    | object
): T[] | R[] | any[] | boolean[] {
  return flatMapDepth(collection, iteratee as any, Infinity);
}
