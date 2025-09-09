import { keysIn } from './keysIn.ts';
import { range } from '../../math/range.ts';
import { getSymbolsIn } from '../_internal/getSymbolsIn.ts';
import { ValueKeyIteratee } from '../_internal/ValueKeyIteratee.ts';
import { identity } from '../function/identity.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isSymbol } from '../predicate/isSymbol.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * @template T
 * @param {Record<string, T> | null | undefined} object - The source object.
 * @param {ValueKeyIteratee<T>} predicate - The function invoked per property.
 * @returns {Record<string, T>} Returns the new object.
 *
 * @example
 * omitBy({ 'a': 1, 'b': '2', 'c': 3 }, isString);
 * // => { 'a': 1, 'c': 3 }
 */
export function omitBy<T>(
  object: Record<string, T> | null | undefined,
  predicate?: ValueKeyIteratee<T>
): Record<string, T>;

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * @template T
 * @param {Record<number, T> | null | undefined} object - The source object.
 * @param {ValueKeyIteratee<T>} predicate - The function invoked per property.
 * @returns {Record<number, T>} Returns the new object.
 *
 * @example
 * omitBy({ 0: 1, 1: '2', 2: 3 }, isString);
 * // => { 0: 1, 2: 3 }
 */
export function omitBy<T>(
  object: Record<number, T> | null | undefined,
  predicate?: ValueKeyIteratee<T>
): Record<number, T>;

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * @template T
 * @param {T | null | undefined} object - The source object.
 * @param {ValueKeyIteratee<T[keyof T]>} predicate - The function invoked per property.
 * @returns {Partial<T>} Returns the new object.
 *
 * @example
 * omitBy({ 'a': 1, 'b': '2', 'c': 3 }, isString);
 * // => { 'a': 1, 'c': 3 }
 */
export function omitBy<T extends object>(
  object: T | null | undefined,
  predicate: ValueKeyIteratee<T[keyof T]>
): Partial<T>;

/**
 * Creates a new object composed of the properties that do not satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns false.
 *
 * @template T - The type of object.
 * @param {T} obj - The object to omit properties from.
 * @param {(value: T[keyof T], key: keyof T, obj: T) => boolean} shouldOmit - A predicate function that determines
 * whether a property should be omitted. It takes the property's value, key, and the source object as arguments and returns `true`
 * if the property should be omitted, and `false` otherwise.
 * @returns {Partial<T>} Returns the new object.
 *
 * @example
 * const obj = { a: 1, b: 'omit', c: 3 };
 * const shouldOmit = (value) => typeof value === 'string';
 * const result = omitBy(obj, shouldOmit);
 * // result will be { a: 1, c: 3 }
 */
export function omitBy<T, S extends T>(
  object: Record<string, T> | Record<number, T> | object | null | undefined,
  shouldOmit?: ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>
): Record<string, S> | Record<number, S> | Partial<T> {
  if (object == null) {
    return {};
  }

  const result: Partial<T> = {};

  const predicate = createIteratee(shouldOmit ?? identity);

  const keys = isArrayLike(object)
    ? range(0, object.length)
    : ([...keysIn(object), ...getSymbolsIn(object)] as Array<keyof T>);
  for (let i = 0; i < keys.length; i++) {
    const key = (isSymbol(keys[i]) ? keys[i] : keys[i].toString()) as keyof T;
    const value = object[key as keyof typeof object];

    if (!predicate(value, key, object)) {
      result[key] = value;
    }
  }

  return result;
}
