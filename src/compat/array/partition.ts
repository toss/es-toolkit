import { identity } from '../../function/identity.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { ValueIteratorTypeGuard } from '../_internal/ValueIteratorTypeGuard.ts';
import { values as valuesToolkit } from '../object/values.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * predicate returns truthy for, while the second of which contains elements predicate returns falsey for.
 * The predicate is invoked with one argument: (value).
 *
 * @template T, U
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over.
 * @param {(value: T) => value is U} callback - The function invoked per iteration.
 * @returns {[U[], Array<Exclude<T, U>>]} Returns the array of grouped elements.
 *
 * @example
 * partition([1, 2, 3, 4], n => n % 2 === 0);
 * // => [[2, 4], [1, 3]]
 */
export function partition<T, U extends T>(
  collection: ArrayLike<T> | null | undefined,
  callback: ValueIteratorTypeGuard<T, U>
): [U[], Array<Exclude<T, U>>];

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * predicate returns truthy for, while the second of which contains elements predicate returns falsey for.
 * The predicate is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over.
 * @param {((value: T) => unknown) | PropertyKey | [PropertyKey, any] | Partial<T>} callback - The function invoked per iteration.
 * @returns {[T[], T[]]} Returns the array of grouped elements.
 *
 * @example
 * partition([1, 2, 3, 4], n => n % 2 === 0);
 * // => [[2, 4], [1, 3]]
 */
export function partition<T>(collection: ArrayLike<T> | null | undefined, callback: ValueIteratee<T>): [T[], T[]];

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * predicate returns truthy for, while the second of which contains elements predicate returns falsey for.
 * The predicate is invoked with one argument: (value).
 *
 * @template T
 * @param {T | null | undefined} collection - The collection to iterate over.
 * @param {((value: T[keyof T]) => unknown) | PropertyKey | [PropertyKey, any] | Partial<T[keyof T]>} callback - The function invoked per iteration.
 * @returns {[Array<T[keyof T]>, Array<T[keyof T]>]} Returns the array of grouped elements.
 *
 * @example
 * partition({ a: 1, b: 2, c: 3 }, n => n % 2 === 0);
 * // => [[2], [1, 3]]
 */
export function partition<T extends object>(
  collection: T | null | undefined,
  callback: ValueIteratee<T[keyof T]>
): [Array<T[keyof T]>, Array<T[keyof T]>];

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * `predicate` returns truthy for, the second of which contains elements
 * `predicate` returns falsy for. The predicate is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | T | null | undefined} source - The array or object to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} [predicate=identity] - The function invoked per iteration.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * partition([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
 * // => [[{ a: 1 }, { a: 2 }], [{ b: 1 }]]
 *
 * partition([{ a: 1 }, { a: 2 }, { b: 1 }], { b: 1 });
 * // => [[{ b: 1 }], [{ a: 1 }, { a: 2 }]]
 *
 * partition({ item1: { a: 0, b: true }, item2: { a: 1, b: true }, item3: { a: 2, b: false }}, { b: false })
 * // => [[{ a: 2, b: false }], [{ a: 0, b: true }, { a: 1, b: true }]]
 *
 * partition([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => [[{ a: 2 }], [{ a: 1 }, { a: 3 }]]
 */
export function partition<T>(
  source: ArrayLike<T> | T | null | undefined,
  predicate: ((value: T) => unknown) | Partial<T> | [PropertyKey, any] | PropertyKey = identity
): [T[], T[]] {
  if (!source) {
    return [[], []];
  }

  const collection = isArrayLike(source) ? source : valuesToolkit(source);

  predicate = iteratee(predicate);

  const matched: T[] = [];
  const unmatched: T[] = [];

  for (let i = 0; i < collection.length; i++) {
    const value = collection[i] as T;

    if (predicate(value)) {
      matched.push(value);
    } else {
      unmatched.push(value);
    }
  }

  return [matched, unmatched];
}
