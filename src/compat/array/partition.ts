import { isArray } from '../predicate/isArray.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * `predicate` returns truthy for, the second of which contains elements
 * `predicate` returns falsy for.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to iterate over.
 * @param {(item: T, index: number, arr: readonly T[]) => unknown} doesMatch - The function invoked per iteration.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * partition([1, 2, 3], n => n % 2 === 0)
 * // => [[2], [1, 3]]
 */
export function partition<T>(
  arr: ArrayLike<T> | null | undefined,
  doesMatch?: (item: T, index: number, arr: readonly T[]) => unknown
): [T[], T[]];

/**
 * Creates an array of elements split into two groups based on the properties of the given partial object.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to iterate over.
 * @param {Partial<T>} doesMatch - A partial object that specifies the properties to match.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * partition(arr, { name: 'Bob' });
 * // => [[{ id: 2, name: 'Bob' }], [{ id: 1, name: 'Alice' }]]
 */
export function partition<T>(arr: ArrayLike<T> | null | undefined, doesMatch: Partial<T>): [T[], T[]];

/**
 * Creates an array of elements split into two groups based on the given key-value pair.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to iterate over.
 * @param {[keyof T, unknown]} doesMatchProperty - The key-value pair to match.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * partition(arr, ['name', 'Alice']);
 * // => [[{ id: 1, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]
 */
export function partition<T>(arr: ArrayLike<T> | null | undefined, doesMatchProperty: [keyof T, unknown]): [T[], T[]];

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * that have the given property name, the second of which contains elements that don't.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arr - The array to iterate over.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const arr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, age: 28 }];
 * partition(arr, 'name');
 * // => [[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], [{ id: 3, age: 28 }]]
 */
export function partition<T>(arr: ArrayLike<T> | null | undefined, propertyToCheck: PropertyKey): [T[], T[]];

/**
 * Creates an array of elements split into two groups based on the predicate function.
 *
 * @template T
 * @param {T | null | undefined} object - The object to iterate over.
 * @param {(value: T[keyof T], key: keyof T, object: T) => unknown} doesMatch - The function invoked per iteration.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const obj = { item1: { a: 0 }, item2: { a: 1 }, item3: { a: 0 } }
 * partition(obj, value => value.a)
 * // => [[{ a: 1 }], [{ a: 0 }, { a: 0 }]]
 *
 * const obj = { a: 1, b: 2, c: 3 };
 * partition(obj, value => value > 2)
 * // => [[3], [1, 2]]
 */
export function partition<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatch: (value: T[keyof T], key: keyof T, object: T) => unknown
): [T[], T[]];

/**
 * Creates an array of elements split into two groups based on the properties of the given partial object.
 *
 * @template T
 * @param {T | null | undefined} object - The object to iterate over.
 * @param {Partial<T[keyof T]>} doesMatch - The partial object to match
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } };
 * partition(obj, { name: 'Bob' });
 * // => [[{ id: 2, name: 'Bob' }], [{ id: 1, name: 'Alice' }]]
 */
export function partition<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatch: Partial<T[keyof T]>
): [T[], T[]];

/**
 * Creates an array of elements split into two groups based on the given key-value pair.
 *
 * @template T
 * @param {T | null | undefined} object - The object to iterate over.
 * @param {[keyof T[keyof T], unknown]} doesMatchProperty - The key-value pair to match.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const obj = { alice: { id: 1, name: 'Alice' }, bob: { id: 2, name: 'Bob' } };
 * partition(obj, ['name', 'Alice']);
 * // => [[{ id: 1, name: 'Alice' }], [{ id: 2, name: 'Bob' }]]
 */
export function partition<T extends Record<string, unknown>>(
  object: T | null | undefined,
  doesMatchProperty: [keyof T[keyof T], unknown]
): [T[], T[]];

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * that have the given property name, the second of which contains elements that don't.
 *
 * @template T
 * @param {T | null | undefined} object - The object to iterate over.
 * @param {PropertyKey} propertyToCheck - The property name to check.
 * @returns {[T[], T[]]} - Returns the array of grouped elements.
 *
 * @example
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' }, c: { id: 3, age: 28 } };
 * partition(obj, 'name');
 * // => [[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], [{ id: 3, age: 28 }]]
 */
export function partition<T extends Record<string, unknown>>(
  object: T | null | undefined,
  propertyToCheck: PropertyKey
): [T[], T[]];

/**
 * Creates an array of elements split into two groups, the first of which contains elements
 * `predicate` returns truthy for, the second of which contains elements
 * `predicate` returns falsy for. The predicate is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The array or object to iterate over.
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
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  predicate?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey
): [T[], T[]] {
  if (!source) {
    return [[], []];
  }

  const collection = isArray(source) ? source : Object.values(source);

  predicate = iteratee(predicate);

  const matched: T[] = [];
  const unmatched: T[] = [];

  if (!isArray(source)) {
    const keys = Object.keys(source) as Array<keyof T>;
    const length = isArrayLike(source) ? source.length : keys.length;

    for (let i = 0; i < length; i++) {
      const key = keys[i];
      const value = source[key] as T;

      if (predicate(value, key as number, source)) {
        matched.push(value);
      } else {
        unmatched.push(value);
      }
    }

    return [matched, unmatched];
  }

  for (let i = 0; i < collection.length; i++) {
    const value = collection[i];
    if (predicate(value, i, source)) {
      matched.push(value);
    } else {
      unmatched.push(value);
    }
  }

  return [matched, unmatched];
}
