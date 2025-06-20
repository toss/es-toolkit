import { identity } from '../../function/identity.ts';
import { ListIterateeCustom, ListIteratorTypeGuard } from '../_internal/ListIteratee.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import { ObjectIteratorTypeGuard } from '../_internal/ObjectIterator.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Finds the first element in an array-like object that matches a type guard predicate.
 *
 * @param collection - The array-like object to search
 * @param predicate - The type guard function to test each element
 * @param fromIndex - The index to start searching from
 * @returns The first element that matches the type guard, or undefined if none found
 *
 * @example
 * find([1, '2', 3], (x): x is number => typeof x === 'number')
 * // => 1
 */
export function find<T, U extends T>(
  collection: ArrayLike<T> | null | undefined,
  predicate: ListIteratorTypeGuard<T, U>,
  fromIndex?: number
): U | undefined;

/**
 * Finds the first element in an array-like object that matches a predicate.
 *
 * @param collection - The array-like object to search
 * @param predicate - The function or shorthand to test each element
 * @param fromIndex - The index to start searching from
 * @returns The first matching element, or undefined if none found
 *
 * @example
 * find([1, 2, 3], x => x > 2)
 * // => 3
 *
 * find([{ a: 1 }, { a: 2 }], { a: 2 })
 * // => { a: 2 }
 */
export function find<T>(
  collection: ArrayLike<T> | null | undefined,
  predicate?: ListIterateeCustom<T, boolean>,
  fromIndex?: number
): T | undefined;

/**
 * Finds the first value in an object that matches a type guard predicate.
 *
 * @param collection - The object to search
 * @param predicate - The type guard function to test each value
 * @param fromIndex - The index to start searching from
 * @returns The first value that matches the type guard, or undefined if none found
 *
 * @example
 * find({ a: 1, b: '2', c: 3 }, (x): x is number => typeof x === 'number')
 * // => 1
 */
export function find<T extends object, U extends T[keyof T]>(
  collection: T | null | undefined,
  predicate: ObjectIteratorTypeGuard<T, U>,
  fromIndex?: number
): U | undefined;

/**
 * Finds the first value in an object that matches a predicate.
 *
 * @param collection - The object to search
 * @param predicate - The function or shorthand to test each value
 * @param fromIndex - The index to start searching from
 * @returns The first matching value, or undefined if none found
 *
 * @example
 * find({ a: 1, b: 2 }, x => x > 1)
 * // => 2
 *
 * find({ a: { x: 1 }, b: { x: 2 } }, { x: 2 })
 * // => { x: 2 }
 */
export function find<T extends object>(
  collection: T | null | undefined,
  predicate?: ObjectIterateeCustom<T, boolean>,
  fromIndex?: number
): T[keyof T] | undefined;

/**
 * Finds the first item in an object that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The source array or object to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} doesMatch - The criteria to match. It can be a function, a partial object, a key-value pair, or a property name.
 * @param {number} [fromIndex=0] - The index to start the search from, defaults to 0.
 * @returns {T | undefined} - The first property value that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * const result = find(obj, 'name');
 * console.log(result); // { id: 1, name: 'Alice' }
 */
export function find<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  _doesMatch:
    | ((item: T, index: number, arr: any) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey = identity,
  fromIndex = 0
): T | undefined {
  if (!source) {
    return undefined;
  }
  if (fromIndex < 0) {
    fromIndex = Math.max(source.length + fromIndex, 0);
  }

  const doesMatch = iteratee(_doesMatch);
  if (typeof doesMatch === 'function' && !Array.isArray(source)) {
    const keys = Object.keys(source) as Array<keyof T>;

    for (let i = fromIndex; i < keys.length; i++) {
      const key = keys[i];
      const value = source[key] as T;

      if (doesMatch(value, key as number, source)) {
        return value;
      }
    }

    return undefined;
  }

  const values = Array.isArray(source) ? source.slice(fromIndex) : Object.values(source).slice(fromIndex);
  return values.find(doesMatch);
}
