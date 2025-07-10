import { identity } from '../../function/identity.ts';
import { ListIterateeCustom } from '../_internal/ListIterateeCustom.ts';
import { ObjectIterateeCustom } from '../_internal/ObjectIteratee.ts';
import { property } from '../object/property.ts';
import { values as valuesToolkit } from '../object/values.ts';
import { matches } from '../predicate/matches.ts';
import { matchesProperty } from '../predicate/matchesProperty.ts';

/**
 * Checks if predicate returns truthy for any element of collection.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} collection - The collection to iterate over.
 * @param {ListIterateeCustom<T, boolean>} [predicate] - The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
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
 * @param {T | null | undefined} collection - The object to iterate over.
 * @param {ObjectIterateeCustom<T, boolean>} [predicate] - The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
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
 * @param {ArrayLike<T> | Record<string, any> | null | undefined} source The source to iterate over.
 * @param {((item: T, index: number, arr: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey} [predicate=identity] The function invoked per iteration.
 * If a property name or an object is provided it will be used to create a predicate function.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
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
  if (guard != null) {
    predicate = undefined;
  }

  if (!predicate) {
    predicate = identity;
  }

  const values = Array.isArray(source) ? source : valuesToolkit(source);

  switch (typeof predicate) {
    case 'function': {
      if (!Array.isArray(source)) {
        const keys = Object.keys(source) as Array<keyof T>;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = source[key];

          if (predicate(value as T, key as number, source)) {
            return true;
          }
        }

        return false;
      }

      for (let i = 0; i < source.length; i++) {
        if (predicate(source[i] as T, i, source)) {
          return true;
        }
      }
      return false;
    }
    case 'object': {
      if (Array.isArray(predicate) && predicate.length === 2) {
        const key = predicate[0];
        const value = predicate[1];

        const matchFunc = matchesProperty(key, value);
        if (Array.isArray(source)) {
          for (let i = 0; i < source.length; i++) {
            if (matchFunc(source[i])) {
              return true;
            }
          }
          return false;
        }
        return values.some(matchFunc);
      } else {
        const matchFunc = matches(predicate);
        if (Array.isArray(source)) {
          for (let i = 0; i < source.length; i++) {
            if (matchFunc(source[i])) {
              return true;
            }
          }
          return false;
        }
        return values.some(matchFunc);
      }
    }
    case 'number':
    case 'symbol':
    case 'string': {
      const propFunc = property(predicate);
      if (Array.isArray(source)) {
        for (let i = 0; i < source.length; i++) {
          if (propFunc(source[i])) {
            return true;
          }
        }
        return false;
      }
      return values.some(propFunc);
    }
  }
}
