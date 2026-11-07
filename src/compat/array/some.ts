import { identity } from '../../function/identity.ts';
import { isIterateeCall } from '../_internal/isIterateeCall.ts';
import { ListIterateeCustom } from '../_internal/ListIterateeCustom.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Checks if predicate returns truthy for any element of collection.
 *
 * @template T
 * @param collection - The collection to iterate over.
 * @param [predicate] - The function invoked per iteration.
 * @returns Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some([null, 0, 'yes', false], Boolean);
 * // => true
 */
export function some<T>(
  collection: ArrayLike<T> | null | undefined,
  predicate?: ListIterateeCustom<T, boolean>
): boolean;

/**
 * Checks if predicate returns truthy for any element of collection.
 *
 * @template T
 * @param collection - The object to iterate over.
 * @param [predicate] - The function invoked per iteration.
 * @returns Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some({ 'a': 0, 'b': 1, 'c': 0 }, function(n) { return n > 0; });
 * // => true
 */
export function some<T extends object>(
  collection: T | null | undefined,
  predicate?: ObjectIterateeCustom<T, boolean>
): boolean;

/**
 * Checks if there is an element in an array that matches the given predicate.
 *
 * Iteration is stopped once there is an element that matches `predicate`.
 *
 * @template T
 * @param source The source to iterate over.
 * @param [predicate=identity] The function invoked per iteration.
 * If a property name or an object is provided it will be used to create a predicate function.
 * @returns Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 * some([1, 2, 3, 4], n => n % 2 === 0);
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], ['a', 2]);
 * // => true
 *
 * some([{ a: 1 }, { a: 2 }, { a: 3 }], 'a');
 * // => true
 *
 * some({ a: 1, b: 2, c: 3 }, n => n % 2 === 0);
 * // => true
 *
 * some({ a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } }, { name: 'Bob' });
 * // => true
 *
 * some({ a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } }, ['name', 'Alice']);
 * // => true
 *
 * some({ a: { id: 1, name: 'Alice' }, b: { id: 2, name: 'Bob' } }, 'name');
 * // => true
 */
export function some<T>(
  source: ArrayLike<T> | Record<any, any> | null | undefined,
  predicate?: ((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey,
  guard?: unknown
): boolean {
  if (!source) {
    return false;
  }
  if (guard && isIterateeCall(source, predicate, guard)) {
    predicate = undefined;
  }

  const doesMatch = iteratee(predicate ?? identity);

  if (!isArrayLike(source)) {
    const keys = Object.keys(source) as Array<keyof typeof source>;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (doesMatch(source[key], key, source)) {
        return true;
      }
    }

    return false;
  }

  for (let i = 0; i < source.length; i++) {
    if (doesMatch((source as ArrayLike<T>)[i], i, source)) {
      return true;
    }
  }

  return false;
}
