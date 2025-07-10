import { identity } from '../../function/identity.ts';
import { ListIterateeCustom } from '../_internal/ListIterateeCustom.ts';
import { ListIteratorTypeGuard } from '../_internal/ListIteratorTypeGuard.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import { ObjectIteratorTypeGuard } from '../_internal/ObjectIterator.ts';
import { values as valuesToolkit } from '../object/values.ts';
import { iteratee } from '../util/iteratee.ts';
import { toInteger } from '../util/toInteger.ts';

/**
 * Finds the last element in a collection that satisfies the predicate.
 *
 * @template T, S
 * @param {ArrayLike<T> | null | undefined} collection - The collection to search.
 * @param {ListIteratorTypeGuard<T, S>} predicate - The predicate function with type guard.
 * @param {number} [fromIndex] - The index to start searching from.
 * @returns {S | undefined} The last element that satisfies the predicate.
 *
 * @example
 * const users = [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }, { user: 'pebbles', age: 18 }];
 * findLast(users, (o): o is { user: string; age: number } => o.age < 40);
 * // => { user: 'pebbles', age: 18 }
 */
export function findLast<T, S extends T>(
  collection: ArrayLike<T> | null | undefined,
  predicate: ListIteratorTypeGuard<T, S>,
  fromIndex?: number
): S | undefined;

/**
 * Finds the last element in a collection that satisfies the predicate.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} collection - The collection to search.
 * @param {ListIterateeCustom<T, boolean>} [predicate] - The predicate function, partial object, property-value pair, or property name.
 * @param {number} [fromIndex] - The index to start searching from.
 * @returns {T | undefined} The last element that satisfies the predicate.
 *
 * @example
 * const users = [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }, { user: 'pebbles', age: 18 }];
 * findLast(users, o => o.age < 40);
 * // => { user: 'pebbles', age: 18 }
 *
 * findLast(users, { age: 36 });
 * // => { user: 'barney', age: 36 }
 *
 * findLast(users, ['age', 18]);
 * // => { user: 'pebbles', age: 18 }
 *
 * findLast(users, 'age');
 * // => { user: 'fred', age: 40 }
 */
export function findLast<T>(
  collection: ArrayLike<T> | null | undefined,
  predicate?: ListIterateeCustom<T, boolean>,
  fromIndex?: number
): T | undefined;

/**
 * Finds the last element in an object that satisfies the predicate with type guard.
 *
 * @template T, S
 * @param {T | null | undefined} collection - The object to search.
 * @param {ObjectIteratorTypeGuard<T, S>} predicate - The predicate function with type guard.
 * @param {number} [fromIndex] - The index to start searching from.
 * @returns {S | undefined} The last element that satisfies the predicate.
 *
 * @example
 * const obj = { a: 1, b: 'hello', c: 3 };
 * findLast(obj, (value): value is string => typeof value === 'string');
 * // => 'hello'
 */
export function findLast<T extends object, S extends T[keyof T]>(
  collection: T | null | undefined,
  predicate: ObjectIteratorTypeGuard<T, S>,
  fromIndex?: number
): S | undefined;

/**
 * Finds the last element in an object that satisfies the predicate.
 *
 * @template T
 * @param {T | null | undefined} collection - The object to search.
 * @param {ObjectIterateeCustom<T, boolean>} [predicate] - The predicate function, partial object, property-value pair, or property name.
 * @param {number} [fromIndex] - The index to start searching from.
 * @returns {T[keyof T] | undefined} The last element that satisfies the predicate.
 *
 * @example
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2 }, c: { id: 3, name: 'Bob' } };
 * findLast(obj, o => o.id > 1);
 * // => { id: 3, name: 'Bob' }
 *
 * findLast(obj, { name: 'Bob' });
 * // => { id: 3, name: 'Bob' }
 *
 * findLast(obj, 'name');
 * // => { id: 3, name: 'Bob' }
 */
export function findLast<T extends object>(
  collection: T | null | undefined,
  predicate?: ObjectIterateeCustom<T, boolean>,
  fromIndex?: number
): T[keyof T] | undefined;

/**
 * Finds the last item in an object that has a specific property, where the property name is provided as a PropertyKey.
 *
 * @template T
 * @param {ArrayLike<T> | Record<any, any> | null | undefined} source - The source array or object to search through.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} doesMatch - The criteria to match. It can be a function, a partial object, a key-value pair, or a property name.
 * @param {number} [fromIndex] - The index to start the search from, defaults to source.length-1 for arrays or Object.keys(source).length-1 for objects.
 * @returns {T | undefined} - The last property value that has the specified property, or `undefined` if no match is found.
 *
 * @example
 * // Using a property name
 * const obj = { a: { id: 1, name: 'Alice' }, b: { id: 2 }, c: { id: 3, name: 'Bob' } };
 * const result = findLast(obj, 'name');
 * console.log(result); // { id: 3, name: 'Bob' }
 */
export function findLast<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  _doesMatch:
    | ((item: T, index: number, arr: any) => unknown)
    | Partial<T>
    | [keyof T, unknown]
    | PropertyKey = identity,
  fromIndex?: number
): T | undefined {
  if (!source) {
    return undefined;
  }

  const length = Array.isArray(source) ? source.length : Object.keys(source).length;

  fromIndex = toInteger(fromIndex ?? length - 1);

  if (fromIndex < 0) {
    fromIndex = Math.max(length + fromIndex, 0);
  } else {
    fromIndex = Math.min(fromIndex, length - 1);
  }

  const doesMatch = iteratee(_doesMatch);

  if (typeof doesMatch === 'function' && !Array.isArray(source)) {
    const keys = Object.keys(source) as Array<keyof T>;

    for (let i = fromIndex; i >= 0; i--) {
      const key = keys[i];
      const value = source[key] as T;

      if (doesMatch(value, key as number, source)) {
        return value;
      }
    }

    return undefined;
  }

  const values = Array.isArray(source) ? source.slice(0, fromIndex + 1) : valuesToolkit(source).slice(0, fromIndex + 1);
  for (let i = values.length - 1; i >= 0; i--) {
    if (doesMatch(values[i], i, values)) {
      return values[i];
    }
  }
  return undefined;
}
