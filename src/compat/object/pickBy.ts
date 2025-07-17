import { keysIn } from './keysIn.ts';
import { range } from '../../math/range.ts';
import { getSymbolsIn } from '../_internal/getSymbolsIn.ts';
import { ValueKeyIteratee } from '../_internal/ValueKeyIteratee.ts';
import { ValueKeyIterateeTypeGuard } from '../_internal/ValueKeyIterateeTypeGuard.ts';
import { identity } from '../function/identity.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isSymbol } from '../predicate/isSymbol.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * @template T - The type of object values.
 * @template S - The type of filtered values.
 * @param {Record<string, T> | null | undefined} object - The source object.
 * @param {ValueKeyIterateeTypeGuard<T, S>} predicate - The function invoked per property.
 * @returns {Record<string, S>} Returns the new filtered object.
 *
 * @example
 * const users = {
 *   'fred': { 'user': 'fred', 'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 * pickBy(users, ({ age }) => age < 40);
 * // => { 'pebbles': { 'user': 'pebbles', 'age': 1 } }
 */
export function pickBy<T, S extends T>(
  object: Record<string, T> | null | undefined,
  predicate: ValueKeyIterateeTypeGuard<T, S>
): Record<string, S>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * @template T - The type of object values.
 * @template S - The type of filtered values.
 * @param {Record<number, T> | null | undefined} object - The source object.
 * @param {ValueKeyIterateeTypeGuard<T, S>} predicate - The function invoked per property.
 * @returns {Record<number, S>} Returns the new filtered object.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * pickBy(array, (value) => value % 2 === 0);
 * // => { 1: 2, 3: 4 }
 */
export function pickBy<T, S extends T>(
  object: Record<number, T> | null | undefined,
  predicate: ValueKeyIterateeTypeGuard<T, S>
): Record<number, S>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * @template T - The type of object values.
 * @param {Record<string, T> | null | undefined} object - The source object.
 * @param {ValueKeyIteratee<T>} [predicate] - The function invoked per property.
 * @returns {Record<string, T>} Returns the new filtered object.
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * pickBy(object, (value) => typeof value === 'string');
 * // => { 'b': '2' }
 */
export function pickBy<T>(
  object: Record<string, T> | null | undefined,
  predicate?: ValueKeyIteratee<T>
): Record<string, T>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * @template T - The type of object values.
 * @param {Record<number, T> | null | undefined} object - The source object.
 * @param {ValueKeyIteratee<T>} [predicate] - The function invoked per property.
 * @returns {Record<number, T>} Returns the new filtered object.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * pickBy(array, (value) => value > 2);
 * // => { 2: 3, 3: 4 }
 */
export function pickBy<T>(
  object: Record<number, T> | null | undefined,
  predicate?: ValueKeyIteratee<T>
): Record<number, T>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * @template T - The type of object.
 * @param {T | null | undefined} object - The source object.
 * @param {ValueKeyIteratee<T[keyof T]>} [predicate] - The function invoked per property.
 * @returns {Partial<T>} Returns the new filtered object.
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * pickBy(object, (value) => typeof value === 'string');
 * // => { 'b': '2' }
 */
export function pickBy<T extends object>(
  object: T | null | undefined,
  predicate?: ValueKeyIteratee<T[keyof T]>
): Partial<T>;

/**
 * Creates a new object composed of the properties that satisfy the predicate function.
 *
 * This function takes an object and a predicate function, and returns a new object that
 * includes only the properties for which the predicate function returns true.
 *
 * @template T - The type of object.
 * @param {Record<string, T> | Record<number, T> | object | null | undefined} obj - The object to pick properties from.
 * @param {ValueKeyIterateeTypeGuard<T, S> | ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>} [shouldPick] - A predicate function that determines
 * whether a property should be picked. It takes the property's key and value as arguments and returns `true`
 * if the property should be picked, and `false` otherwise.
 * @returns {Record<string, S> | Record<number, S> | Partial<T>} A new object with the properties that satisfy the predicate function.
 *
 * @example
 * const obj = { a: 1, b: 'pick', c: 3 };
 * const shouldPick = (value) => typeof value === 'string';
 * const result = pickBy(obj, shouldPick);
 * // result will be { b: 'pick' }
 */
export function pickBy<T, S extends T>(
  obj: Record<string, T> | Record<number, T> | object | null | undefined,
  shouldPick?: ValueKeyIterateeTypeGuard<T, S> | ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>
): Record<string, S> | Record<number, S> | Partial<T> {
  if (obj == null) {
    return {};
  }

  const predicate = createIteratee(shouldPick ?? identity);

  const result: Partial<T> = {};

  const keys = isArrayLike(obj) ? range(0, obj.length) : ([...keysIn(obj), ...getSymbolsIn(obj)] as Array<keyof T>);
  for (let i = 0; i < keys.length; i++) {
    const key = (isSymbol(keys[i]) ? keys[i] : keys[i].toString()) as keyof T;
    const value = obj[key as keyof typeof obj];

    if (predicate(value, key, obj)) {
      result[key] = value;
    }
  }

  return result;
}
