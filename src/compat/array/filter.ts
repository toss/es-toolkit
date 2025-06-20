import { identity } from '../../function/identity.ts';
import { ListIterateeCustom, ListIteratorTypeGuard } from '../_internal/ListIteratee.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import { ObjectIteratorTypeGuard } from '../_internal/ObjectIterator.ts';
import { StringIterator } from '../_internal/StringIterator.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Filters characters in a string based on the predicate function.
 *
 * @param collection - The string to filter
 * @param predicate - The function to test each character
 * @returns An array of characters that pass the predicate test
 *
 * @example
 * filter('123', char => char === '2')
 * // => ['2']
 */
export function filter(collection: string | null | undefined, predicate?: StringIterator<boolean>): string[];

/**
 * Filters elements in an array-like object using a type guard predicate.
 *
 * @param collection - The array-like object to filter
 * @param predicate - The type guard function to test each element
 * @returns An array of elements that are of type U
 *
 * @example
 * filter([1, '2', 3], (x): x is number => typeof x === 'number')
 * // => [1, 3]
 */
export function filter<T, U extends T>(
  collection: ArrayLike<T> | null | undefined,
  predicate: ListIteratorTypeGuard<T, U>
): U[];

/**
 * Filters elements in an array-like object based on the predicate.
 *
 * @param collection - The array-like object to filter
 * @param predicate - The function or shorthand to test each element
 * @returns An array of elements that pass the predicate test
 *
 * @example
 * filter([1, 2, 3], x => x > 1)
 * // => [2, 3]
 *
 * filter([{ a: 1 }, { a: 2 }], { a: 1 })
 * // => [{ a: 1 }]
 */
export function filter<T>(collection: ArrayLike<T> | null | undefined, predicate?: ListIterateeCustom<T, boolean>): T[];

/**
 * Filters values in an object using a type guard predicate.
 *
 * @param collection - The object to filter
 * @param predicate - The type guard function to test each value
 * @returns An array of values that are of type U
 *
 * @example
 * filter({ a: 1, b: '2', c: 3 }, (x): x is number => typeof x === 'number')
 * // => [1, 3]
 */
export function filter<T extends object, U extends T[keyof T]>(
  collection: T | null | undefined,
  predicate: ObjectIteratorTypeGuard<T, U>
): U[];

/**
 * Filters values in an object based on the predicate.
 *
 * @param collection - The object to filter
 * @param predicate - The function or shorthand to test each value
 * @returns An array of values that pass the predicate test
 *
 * @example
 * filter({ a: 1, b: 2 }, x => x > 1)
 * // => [2]
 *
 * filter({ a: { x: 1 }, b: { x: 2 } }, { x: 1 })
 * // => [{ x: 1 }]
 */
export function filter<T extends object>(
  collection: T | null | undefined,
  predicate?: ObjectIterateeCustom<T, boolean>
): Array<T[keyof T]>;

/**
 * Iterates over the collection and filters elements based on the given predicate.
 * If a function is provided, it is invoked for each element in the collection.
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The array or object to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} [predicate=identity] - The function invoked per iteration.
 * @returns {T[]} - Returns a new array of filtered elements that satisfy the predicate.
 *
 * @example
 * filter([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
 * // => [{ a: 1 }, { a: 2 }]
 *
 * filter([{ a: 1 }, { a: 2 }, { b: 1 }], { b: 1 });
 * // => [{ b: 1 }]
 *
 * filter({ item1: { a: 0, b: true }, item2: { a: 1, b: true }, item3: { a: 2, b: false }}, { b: false })
 * // => [{ a: 2, b: false }]
 *
 * filter([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => [{ a: 2 }]
 */
export function filter<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  predicate: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey = identity
): T[] {
  if (!source) {
    return [];
  }

  predicate = iteratee(predicate);

  if (!Array.isArray(source)) {
    const result: T[] = [];
    const keys = Object.keys(source) as Array<keyof T>;
    const length = isArrayLike(source) ? source.length : keys.length;

    for (let i = 0; i < length; i++) {
      const key = keys[i];
      const value = source[key] as T;

      if (predicate(value, key as number, source)) {
        result.push(value);
      }
    }

    return result;
  }

  const result: T[] = [];
  const length = source.length;

  for (let i = 0; i < length; i++) {
    const value = source[i];
    if (predicate(value, i, source)) {
      result.push(value);
    }
  }

  return result;
}
