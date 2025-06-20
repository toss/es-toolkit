import { ValueIteratee } from 'lodash';
import { identity } from '../../function/identity.ts';
import { mapValues as mapValuesToolkit } from '../../object/mapValues.ts';
import { ArrayIterator } from '../_internal/ArrayIterator.ts';
import { ObjectIterator } from '../_internal/ObjectIterator.ts';
import { StringIterator } from '../_internal/StringIterator.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Creates a new object by mapping each character in a string to a value.
 * @param obj - The string to iterate over
 * @param callback - The function invoked per character
 * @returns A new object with numeric keys and mapped values
 * @example
 * mapValues('abc', (char) => char.toUpperCase())
 * // => { '0': 'A', '1': 'B', '2': 'C' }
 */
export function mapValues<T>(obj: string | null | undefined, callback: StringIterator<T>): Record<number, T>;

/**
 * Creates a new object by mapping each element in an array to a value.
 * @param array - The array to iterate over
 * @param callback - The function invoked per element
 * @returns A new object with numeric keys and mapped values
 * @example
 * mapValues([1, 2], (num) => num * 2)
 * // => { '0': 2, '1': 4 }
 */
export function mapValues<T, U>(array: T[], callback: ArrayIterator<T, U>): Record<number, U>;

/**
 * Creates a new object by mapping each property value in an object to a new value.
 * @param obj - The object to iterate over
 * @param callback - The function invoked per property
 * @returns A new object with the same keys and mapped values
 * @example
 * mapValues({ a: 1, b: 2 }, (num) => num * 2)
 * // => { a: 2, b: 4 }
 */
export function mapValues<T extends object, U>(
  obj: T | null | undefined,
  callback: ObjectIterator<T, U>
): { [P in keyof T]: U };

/**
 * Creates a new object by checking each value against a matcher object.
 * @param obj - The object to iterate over
 * @param iteratee - The object to match against
 * @returns A new object with boolean values indicating matches
 * @example
 * mapValues({ a: { x: 1 }, b: { x: 2 } }, { x: 2 })
 * // => { a: false, b: true }
 */
export function mapValues<T>(
  obj: Record<string, T> | Record<number, T> | null | undefined,
  iteratee: object
): Record<string, boolean>;

/**
 * Creates a new object by checking each value against a matcher object.
 * @param obj - The object to iterate over
 * @param iteratee - The object to match against
 * @returns A new object with boolean values indicating matches
 * @example
 * mapValues({ a: { x: 1 }, b: { x: 2 } }, { x: 2 })
 * // => { a: false, b: true }
 */
export function mapValues<T extends object>(obj: T | null | undefined, iteratee: object): { [P in keyof T]: boolean };

/**
 * Creates a new object by extracting a property from each value.
 * @param obj - The object to iterate over
 * @param iteratee - The property key to extract
 * @returns A new object with extracted property values
 * @example
 * mapValues({ a: { x: 1 }, b: { x: 2 } }, 'x')
 * // => { a: 1, b: 2 }
 */
export function mapValues<T, K extends keyof T>(
  obj: Record<string, T> | Record<number, T> | null | undefined,
  iteratee: K
): Record<string, T[K]>;

/**
 * Creates a new object by extracting values at a path from each value.
 * @param obj - The object to iterate over
 * @param iteratee - The path to extract
 * @returns A new object with extracted values
 * @example
 * mapValues({ a: { x: { y: 1 } }, b: { x: { y: 2 } } }, 'x.y')
 * // => { a: 1, b: 2 }
 */
export function mapValues<T>(
  obj: Record<string, T> | Record<number, T> | null | undefined,
  iteratee: string
): Record<string, any>;

/**
 * Creates a new object by extracting values at a path from each value.
 * @param obj - The object to iterate over
 * @param iteratee - The path to extract
 * @returns A new object with extracted values
 * @example
 * mapValues({ a: { x: { y: 1 } }, b: { x: { y: 2 } } }, 'x.y')
 * // => { a: 1, b: 2 }
 */
export function mapValues<T extends object>(obj: T | null | undefined, iteratee: string): { [P in keyof T]: any };

/**
 * Creates a new object from a string using identity function.
 * @param obj - The string to convert
 * @returns A new object with characters as values
 * @example
 * mapValues('abc')
 * // => { '0': 'a', '1': 'b', '2': 'c' }
 */
export function mapValues(obj: string | null | undefined): Record<number, string>;

/**
 * Creates a new object using identity function.
 * @param obj - The object to clone
 * @returns A new object with the same values
 * @example
 * mapValues({ a: 1, b: 2 })
 * // => { a: 1, b: 2 }
 */
export function mapValues<T>(obj: Record<string, T> | Record<number, T> | null | undefined): Record<string, T>;

/**
 * Creates a new object using identity function.
 * @param obj - The object to clone
 * @returns A new object with the same values
 * @example
 * mapValues({ a: 1, b: 2 })
 * // => { a: 1, b: 2 }
 */
export function mapValues<T extends object>(obj: T): T;

/**
 * Creates a new object using identity function.
 * @param obj - The object to clone
 * @returns A new object with the same values, or empty object if input is null/undefined
 * @example
 * mapValues({ a: 1, b: 2 })
 * // => { a: 1, b: 2 }
 * mapValues(null)
 * // => {}
 */
export function mapValues<T extends object>(obj: T | null | undefined): Partial<T>;

/**
 * Creates a new object with the same keys as the given object, but with values generated
 * by running each own enumerable property of the object through the iteratee function.
 *
 * @template T - The type of the object.
 * @template K - The type of the keys in the object.
 * @template V - The type of the new values generated by the iteratee function.
 *
 * @param {T} object - The object to iterate over.
 * @param {(value: T[K], key: K, object: T) => V | PropertyKey | readonly PropertyKey[] | null | undefined} [getNewValue] -
 *        The function invoked per own enumerable property, or a path to generate new values.
 * @returns {Record<K, V>} - Returns the new mapped object.
 *
 * @example
 * // Example usage:
 * const obj = { a: 1, b: 2 };
 * const result = mapValues(obj, (value) => value * 2);
 * console.log(result); // { a: 2, b: 4 }
 */
export function mapValues(object: any, getNewValue: ValueIteratee<any> = identity): Record<string, any> {
  if (object == null) {
    return {};
  }

  return mapValuesToolkit(object, iteratee(getNewValue));
}
