import { identity } from '../../function/identity.ts';
import { isFunction } from '../../predicate/isFunction.ts';
import { forEach } from '../array/forEach.ts';
import { isBuffer } from '../predicate/isBuffer.ts';
import { isObject } from '../predicate/isObject.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';
import { iteratee as createIteratee } from '../util/iteratee.ts';

/**
 * Traverses array values and creates a new array by accumulating them in the desired form.
 *
 * If no initial value is provided for `accumulator`, it creates a new array with the same prototype.
 *
 * The traversal is interrupted when the `iteratee` function returns `false`.
 *
 * @template T - The type of array.
 * @template U - The type of accumulator.
 * @param {readonly T[]} object - The array to iterate over.
 * @param {(accumulator: U, value: T, index: number, array: readonly T[]) => unknown} [iteratee] - The function called for each iteration.
 * @param {U} [accumulator] - The initial value.
 * @returns {U} Returns the accumulated value.
 *
 * @example
 * const array = [2, 3, 4];
 * transform(array, (acc, value) => { acc += value; return value % 2 === 0; }, 0) // => 5
 */
export function transform<T, U>(
  object: readonly T[],
  iteratee?: (acc: U, curr: T, index: number, arr: readonly T[]) => void,
  accumulator?: U
): U;

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * If no initial value is provided for `accumulator`, it creates a new array or object with the same prototype.
 *
 * The traversal is interrupted when the `iteratee` function returns `false`.
 *
 * @template T - The type of object.
 * @template U - The type of accumulator.
 * @param {Record<string, T>} object - The object to iterate over.
 * @param {(accumulator: U, value: T, key: string, object: Record<string, T>) => unknown} [iteratee] - The function called for each iteration.
 * @param {U} [accumulator] - The initial value.
 * @returns {U} Returns the accumulated value.
 *
 * @example
 * const obj = { 'a': 1, 'b': 2, 'c': 1 };
 * transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
 */
export function transform<T, U>(
  object: Record<string, T>,
  iteratee?: (acc: U, curr: T, key: string, dict: Record<string, T>) => void,
  accumulator?: U
): U;

/**
 * Traverses object values and creates a new object by accumulating them in the desired form.
 *
 * If no initial value is provided for `accumulator`, it creates a new array or object with the same prototype.
 *
 * The traversal is interrupted when the `iteratee` function returns `false`.
 *
 * @template T - The type of object.
 * @template U - The type of accumulator.
 * @param {readonly T[] | T} object - The object to iterate over.
 * @param {(accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown} [iteratee] - The function called for each iteration.
 * @param {U} [accumulator] - The initial value.
 * @returns {U} Returns the accumulated value.
 *
 * @example
 * const obj = { 'a': 1, 'b': 2, 'c': 1 };
 * transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
 */
export function transform<T extends object, U>(
  object: T,
  iteratee?: (acc: U, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void,
  accumulator?: U
): U;

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
