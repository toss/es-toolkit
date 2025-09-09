import { identity } from '../../function/identity.ts';
import { isFunction } from '../../predicate/isFunction.ts';
import { forEach } from '../array/forEach.ts';
import { isBuffer } from '../predicate/isBuffer.ts';
import { isObject } from '../predicate/isObject.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * @template T - The type of object.
 * @template R - The type of accumulator.
 * @param {readonly T[]} object - The array to iterate over.
 * @param {(acc: R, curr: T, index: number, arr: T[]) => void} iteratee - The function invoked per iteration.
 * @param {R} [accumulator] - The initial value.
 * @returns {R} Returns the accumulated value.
 *
 * @example
 * const array = [2, 3, 4];
 * transform(array, (acc, value) => { acc.push(value * 2); }, []);
 * // => [4, 6, 8]
 */
export function transform<T, R>(
  object: readonly T[],
  iteratee: (acc: R, curr: T, index: number, arr: T[]) => void,
  accumulator?: R
): R;

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * @template T - The type of object.
 * @template R - The type of accumulator.
 * @param {Record<string, T>} object - The object to iterate over.
 * @param {(acc: R, curr: T, key: string, dict: Record<string, T>) => void} iteratee - The function invoked per iteration.
 * @param {R} [accumulator] - The initial value.
 * @returns {R} Returns the accumulated value.
 *
 * @example
 * const obj = { 'a': 1, 'b': 2, 'c': 1 };
 * transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
export function transform<T, R>(
  object: Record<string, T>,
  iteratee: (acc: R, curr: T, key: string, dict: Record<string, T>) => void,
  accumulator?: R
): R;

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * @template T - The type of object.
 * @template R - The type of accumulator.
 * @param {T} object - The object to iterate over.
 * @param {(acc: R, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void} iteratee - The function invoked per iteration.
 * @param {R} [accumulator] - The initial value.
 * @returns {R} Returns the accumulated value.
 *
 * @example
 * const obj = { x: 1, y: 2, z: 3 };
 * transform(obj, (acc, value, key) => { acc[key] = value * 2; }, {});
 * // => { x: 2, y: 4, z: 6 }
 */
export function transform<T extends object, R>(
  object: T,
  iteratee: (acc: R, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void,
  accumulator?: R
): R;

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * @param {any[]} object - The array to iterate over.
 * @returns {any[]} Returns the accumulated value.
 *
 * @example
 * const array = [1, 2, 3];
 * transform(array);
 * // => [1, 2, 3]
 */
export function transform(object: any[]): any[];

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * @param {object} object - The object to iterate over.
 * @returns {Record<string, any>} Returns the accumulated value.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * transform(obj);
 * // => { a: 1, b: 2 }
 */
export function transform(object: object): Record<string, any>;

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * If no initial value is provided for `accumulator`, it creates a new array or object with the same prototype.
 *
The traversal is interrupted when the `iteratee` function returns `false`.
 *
 * @template T - The type of object.
 * @template U - The type of accumulator.
 * @param {readonly T[] | T} object - The object to iterate over.
 * @param {(accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown} [iteratee] - The function invoked per iteration.
 * @param {U} [accumulator] - The initial value.
 * @returns {U} Returns the accumulated value.
 *
 * @example
 * // Transform an array
 * const array = [2, 3, 4];
 * transform(array, (acc, value) => { acc += value; return value % 2 === 0; }, 0) // => 5
 *
 * @example
 * // Transform an object
 * const obj = { 'a': 1, 'b': 2, 'c': 1 };
 * transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
 */
export function transform<T, U>(
  object?: readonly T[] | T,
  iteratee: (accumulator: U, value: T | T[keyof T], key: any, object: readonly T[] | T) => unknown = identity,
  accumulator?: U
): U | any[] | Record<string, any> {
  const isArrayOrBufferOrTypedArray = Array.isArray(object) || isBuffer(object) || isTypedArray(object);

  iteratee = createIteratee(iteratee);

  if (accumulator == null) {
    if (isArrayOrBufferOrTypedArray) {
      accumulator = [] as U;
    } else if (isObject(object) && isFunction(object.constructor)) {
      accumulator = Object.create(Object.getPrototypeOf(object));
    } else {
      accumulator = {} as U;
    }
  }

  if (object == null) {
    return accumulator as U;
  }

  forEach(object, (value, key, object) => iteratee(accumulator as U, value as T, key, object));

  return accumulator as U;
}
