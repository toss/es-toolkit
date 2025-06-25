import { intersectionBy as intersectionByToolkit } from '../../array/intersectionBy.ts';
import { last } from '../../array/last.ts';
import { uniq } from '../../array/uniq.ts';
import { identity } from '../../function/identity.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { property } from '../object/property.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * Creates an array of unique values that are included in all given arrays, using an iteratee to compute equality.
 *
 * @template T, U
 * @param {ArrayLike<T> | null} array - The array to inspect.
 * @param {ArrayLike<U>} values - The values to compare.
 * @param {ValueIteratee<T | U>} iteratee - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [2.1]
 */
export function intersectionBy<T, U>(
  array: ArrayLike<T> | null,
  values: ArrayLike<U>,
  iteratee: ValueIteratee<T | U>
): T[];

/**
 * Creates an array of unique values that are included in all given arrays, using an iteratee to compute equality.
 *
 * @template T, U, V
 * @param {ArrayLike<T> | null} array - The array to inspect.
 * @param {ArrayLike<U>} values1 - The first values to compare.
 * @param {ArrayLike<V>} values2 - The second values to compare.
 * @param {ValueIteratee<T | U | V>} iteratee - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * intersectionBy([2.1, 1.2], [2.3, 3.4], [2.5], Math.floor);
 * // => [2.1]
 */
export function intersectionBy<T, U, V>(
  array: ArrayLike<T> | null,
  values1: ArrayLike<U>,
  values2: ArrayLike<V>,
  iteratee: ValueIteratee<T | U | V>
): T[];

/**
 * Creates an array of unique values that are included in all given arrays, using an iteratee to compute equality.
 *
 * @template T, U, V, W
 * @param {ArrayLike<T> | null | undefined} array - The array to inspect.
 * @param {ArrayLike<U>} values1 - The first values to compare.
 * @param {ArrayLike<V>} values2 - The second values to compare.
 * @param {...Array<ArrayLike<W> | ValueIteratee<T | U | V | W>>} values - The other arrays to compare, and the iteratee to use.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * intersectionBy([2.1, 1.2], [2.3, 3.4], [2.5], [2.6, 1.7], Math.floor);
 * // => [2.1]
 */
export function intersectionBy<T, U, V, W>(
  array: ArrayLike<T> | null | undefined,
  values1: ArrayLike<U>,
  values2: ArrayLike<V>,
  ...values: Array<ArrayLike<W> | ValueIteratee<T | U | V | W>>
): T[];

/**
 * Creates an array of unique values that are included in all given arrays.
 *
 * @template T
 * @param {ArrayLike<T> | null} [array] - The array to inspect.
 * @param {...Array<ArrayLike<T>>} values - The values to compare.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * intersectionBy([2, 1], [2, 3]);
 * // => [2]
 */
export function intersectionBy<T>(array?: ArrayLike<T> | null, ...values: Array<ArrayLike<T>>): T[];

/**
 * Creates an array of unique values that are included in all given arrays, using an iteratee to compute equality.
 *
 * @template T
 * @param {...Array<ArrayLike<T> | ValueIteratee<T>>} values - The arrays to compare and the iteratee to use.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [2.1]
 */
export function intersectionBy<T>(...values: Array<ArrayLike<T> | ValueIteratee<T>>): T[];

/**
 * Returns the intersection of multiple arrays after applying the iteratee function to their elements.
 *
 * This function takes multiple arrays and an optional iteratee function (or property key)
 * to compare the elements after transforming them. It returns a new array containing the elements from
 * the first array that are present in all subsequent arrays after applying the iteratee to each element.
 * If no iteratee is provided, the identity function is used.
 *
 * If the first array is `null` or `undefined`, an empty array is returned.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The first array to compare.
 * @param {...(ArrayLike<T> | ((value: T) => unknown) | string)} values - The arrays to compare, or the iteratee function.
 * @returns {T[]} A new array containing the elements from the first array that are present
 *  in all subsequent arrays after applying the iteratee.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const result = intersectionBy(array1, array2, 'x');
 * // result will be [{ x: 2 }, { x: 3 }] since these elements have the same `x` property.
 *
 * @example
 * const array1 = [1.1, 2.2, 3.3];
 * const array2 = [2.3, 3.3];
 * const result = intersectionBy(array1, array2, Math.floor);
 * // result will be [2.3, 3.3] since it shares the same integer part when `Math.floor` is applied.
 */
export function intersectionBy<T>(array: any, ...values: any[]): T[] {
  if (!isArrayLikeObject(array)) {
    return [];
  }

  const lastValue = last(values);
  if (lastValue === undefined) {
    return Array.from(array) as T[];
  }

  let result = uniq(Array.from(array));

  const count = isArrayLikeObject(lastValue) ? values.length : values.length - 1;

  for (let i = 0; i < count; ++i) {
    const value = values[i];

    if (!isArrayLikeObject(value)) {
      return [];
    }

    if (isArrayLikeObject(lastValue)) {
      result = intersectionByToolkit(result, Array.from(value), identity);
    } else if (typeof lastValue === 'function') {
      result = intersectionByToolkit(result, Array.from(value), value => lastValue(value));
    } else if (typeof lastValue === 'string') {
      result = intersectionByToolkit(result, Array.from(value), property(lastValue));
    }
  }

  return result as T[];
}
