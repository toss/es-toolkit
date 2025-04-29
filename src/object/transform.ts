import { isArray, isBuffer, isNil, isObject, isTypedArray } from '../compat/index.ts';
import { range } from '../math/index.ts';

/**
 * Transforms an array to a new accumulator array which is the result of running each element thru `iteratee`.
 * The iteratee is invoked with four arguments: (accumulator, value, index, array).
 * If `accumulator` is not provided, a new array with the same `[[Prototype]]` will be used.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @template T - The type of array.
 * @template U - The type of accumulator.
 * @param {readonly T[]} object - The object to iterate over.
 * @param {((accumulator: U, value: T, index: number, object: readonly T[]) => unknown) | undefined | null} iteratee - The function invoked per iteration.
 * @param {U | undefined | null} accumulator - The initial accumulator value.
 * @returns {U | undefined | null} Returns the accumulated value.
 *
 * @example
 * const array = [2, 3, 4];
 * transform(array, (acc, value) => { acc += value; return value % 2 === 0; }, 0) // => 5
 */
export function transform<T, U>(
  object?: readonly T[],
  iteratee?: ((accumulator: U, value: T, index: number, object: readonly T[]) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;

/**
 * Transforms an object to a new accumulator object which is the result of running each property thru `iteratee`.
 * The iteratee is invoked with four arguments: (accumulator, value, key, object).
 * If `accumulator` is not provided, a new object with the same `[[Prototype]]` will be used.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @template T - The type of object.
 * @template U - The type of accumulator.
 * @param {T} object - The object to iterate over.
 * @param {((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null} iteratee - The function invoked per iteration.
 * @param {U} accumulator - The initial accumulator value.
 * @returns {U} Returns the accumulated value.
 *
 * @example
 * const obj = { 'a': 1, 'b': 2, 'c': 1 };
 * transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
 */
export function transform<T extends object, U>(
  object?: T,
  iteratee?: ((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;

/**
 * Transforms a collection to a new accumulator object which is the result of running each element thru `iteratee`,
 * with each invocation potentially mutating the `accumulator` object.
 * If `accumulator` is not provided, a new object with the same `[[Prototype]]` will be used for objects,
 * or a new array for array-like objects.
 * The iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @template T - The type of object.
 * @template U - The type of accumulator.
 * @param {readonly T[] | T | null | undefined} object - The object to iterate over.
 * @param {((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null} iteratee - The function invoked per iteration.
 * @param {U | undefined | null} accumulator - The initial value.
 * @returns {U | undefined | null} Returns the accumulated value.
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
  object?: readonly T[] | T | null | undefined,
  iteratee?:
    | ((accumulator: U, value: T | T[keyof T], key: any, object: readonly T[] | T) => unknown)
    | undefined
    | null,
  accumulator?: U | undefined | null
): U | undefined | null {
  const isArr = isArray(object);
  const isArrLike = isArr || isBuffer(object) || isTypedArray(object);

  if (isNil(accumulator)) {
    const Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = (isArr && Ctor ? Ctor() : []) as U;
    } else if (isObject(object)) {
      accumulator = (typeof Ctor === 'function' ? Object.create(Object.getPrototypeOf(object)) : {}) as U;
    } else {
      accumulator = {} as U;
    }
  }

  if (isNil(iteratee) || isNil(object)) {
    return accumulator;
  }

  const keys: PropertyKey[] = isArrLike ? range(0, (object as ArrayLike<T>).length) : Object.keys(object as object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (object as Record<PropertyKey, any>)[key];

    const result = iteratee(accumulator!, value, key, object);

    if (result === false) {
      break;
    }
  }

  return accumulator;
}
