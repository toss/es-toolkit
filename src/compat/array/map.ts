import { identity } from '../../function/identity.ts';
import { isEqual } from '../../predicate/isEqual.ts';

/**
 * Maps each element in an array to a new array of values using an iteratee.
 *
 * @template T
 * @template U
 * @param {T[] | null | undefined} collection - The collection to iterate over.
 * @param {(value: T, index: number, collection: T[]) => U} iteratee - The function invoked per iteration.
 * @returns {U[]} - Returns the new mapped array.
 *
 * @example
 * map([1, 2], String) // => ['1', '2']
 */
export function map<T, U>(
  collection: T[] | null | undefined,
  iteratee: (value: T, index: number, collection: T[]) => U
): U[];

/**
 *
 * Maps each element in an array-like object to a new array of values using an iteratee.
 *
 * @template T
 * @template U
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over.
 * @param {(value: T, index: number, collection: ArrayLike<T>) => U} iteratee - The function invoked per iteration.
 * @returns {U[]} - Returns the new mapped array.
 *
 * @example
 * map('123', Number) // => [1, 2, 3]
 */
export function map<T, U>(
  collection: ArrayLike<T> | null | undefined,
  iteratee: (value: T, index: number, collection: ArrayLike<T>) => U
): U[];

/**
 *
 * Maps each element in an object to a new array of values using the object's values.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The collection to iterate over.
 * @param {null | undefined} iteratee - Will use the identity function if null or undefined.
 * @returns {T[]} - Returns the new mapped array.
 *
 * @example
 * map({ 'a': 1, 'b': 2 }) // => [1, 2]
 * map('abc') // => ['a', 'b', 'c']
 * map([1, 2, 3]) // => [1, 2, 3]
 */
export function map<T>(
  collection: Record<string, T> | Record<number, T> | null | undefined,
  iteratee?: null | undefined
): T[];

/**
 *
 * Maps each element in an object to a new array of values using an iteratee.
 *
 * @template T
 * @template U
 * @param {T | null | undefined} collection - The collection to iterate over.
 * @param {(value: T[keyof T], key: string, collection: T) => U} iteratee - The function invoked per iteration.
 * @returns {U[]} - Returns the new mapped array.
 *
 * @example
 * map({ 'a': 1, 'b': 2 }, String) // => ['1', '2']
 */
export function map<T extends object, U>(
  collection: T | null | undefined,
  iteratee: (value: T[keyof T], key: string, collection: T) => U
): U[];

/**
 *
 * Maps each element in an object to a new array of values using a key to map over.
 *
 * @template T
 * @template K
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The collection to iterate over.
 * @param {K} iteratee - The key to map over.
 * @returns {Array<T[K]>} - Returns the new mapped array.
 *
 * @example
 * var users = [
 *  { 'user': 'barney' },
 *  { 'user': 'fred' }
 * ];
 * map(users, 'user'); // => ['barney', 'fred']
 */
export function map<T, K extends keyof T>(
  collection: Record<string, T> | Record<number, T> | null | undefined,
  iteratee: K
): Array<T[K]>;

/**
 *
 * Maps each element in an object to a new array of values using a key to map over.
 *
 * @template T
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The collection to iterate over.
 * @param {string} iteratee - The key to map over.
 * @returns {any[]} - Returns the new mapped array.
 *
 * @example
 * var users = [
 *  { 'user': 'barney' },
 *  { 'user': 'fred' },
 *  false,
 * ];
 * map(users, 'user'); // => ['barney', 'fred', undefined]
 */
export function map<T>(collection: Record<string, T> | Record<number, T> | null | undefined, iteratee?: string): any[];

/**
 *
 * Maps each element in an object to a new array of values using an object to match.
 *
 * @param {Record<string, T> | Record<number, T> | null | undefined} collection - The collection to iterate over.
 * @param {object} iteratee - The object to match.
 * @returns {boolean[]} - Returns the new mapped array.
 *
 * @example
 * var users = [
 *  { 'user': 'barney' },
 *  { 'user': 'fred' },
 * ];
 * map(users, { 'user': 'barney' }); // => [true, false]
 */
export function map<T>(
  collection: Record<string, T> | Record<number, T> | null | undefined,
  iteratee?: object
): boolean[];

/**
 * Maps each element in a collection to a new array of values using an iteratee.
 *
 * @param {T[] | ArrayLike<T> | Record<string, T> | null | undefined} collection - The collection to iterate over.
 * @param {((value: any, index: number | string, collection: any) => any) | PropertyKey | object} iteratee - The function invoked per iteration or the key to map over.
 * @returns {any[]} - Returns the new mapped array.
 *
 * @example
 * // Using a transformation function
 * const array = [1, 2, 3];
 * map(array, value => value * 2); // => [2, 4, 6]
 *
 * @example
 * // Using a property key as the iteratee
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, 'a'); // => [1, 2, 3]
 *
 * @example
 * // Using an object as the iteratee
 * const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * map(objects, { a: 1 }); // => [true, false, false]
 *
 * @example
 * // No iteratee
 * const numbers = [1, 2, 3];
 * map(numbers); // => [1, 2, 3]
 *
 * @example
 * // Using an object as the collection
 * const obj = { a: 1, b: 2, c: 3 };
 * map(obj, (value, key) => `${key}: ${value}`); // => ['a: 1', 'b: 2', 'c: 3']
 */
export function map(
  collection: any[] | ArrayLike<any> | Record<any, any> | null | undefined,
  iteratee?: ((value: any, index: number | string, collection: any) => any) | PropertyKey | object | null
): any[] {
  if (!collection || (typeof collection !== 'object' && typeof collection !== 'string')) {
    return [];
  }
  if (!iteratee) {
    iteratee = identity;
  }
  switch (typeof iteratee) {
    case 'function': {
      if (!Array.isArray(collection)) {
        const keys = Object.keys(collection) as any[];
        return keys.map((key, index) => iteratee((collection as any)[key], index, collection));
      }
      return (collection as any[]).map(iteratee as any);
    }
    case 'number':
    case 'symbol':
    case 'string': {
      const key = iteratee as PropertyKey;
      return Object.values(collection).map((value: any) => value[key]);
    }
    case 'object': {
      return Object.values(collection).map((value: any) => isEqual(value, iteratee));
    }
  }
}
