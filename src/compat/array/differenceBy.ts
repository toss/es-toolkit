import { differenceBy as differenceByToolkit } from '../../array/differenceBy.ts';
import { flatten } from '../../array/flatten.ts';
import { last } from '../../array/last.ts';
import { isFunction } from '../../predicate/isFunction.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { identity } from '../_internal/identity.ts';
import { initial } from '../../array/initial.ts';
import { isNil } from '../../predicate/isNil.ts';
import { isUndefined } from '../../predicate/isUndefined.ts';
import { property } from '../object/property.ts';

/**
 * Computes the difference between the initial array-like and another array-like after mapping their elements
 * through a provided iteratee function or property key.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T1, T2
 * @param {ArrayLike<T1> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {ArrayLike<T2>} values - The array-like to compare against.
 * @param {((value: T1 | T2) => unknown) | PropertyKey} iteratee - The iteratee function or property key to map elements.
 * @returns {T1[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-like.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const result = differenceBy(array1, array2, 'id');
 * // result will be [{ id: 1 }, { id: 3 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const result = differenceBy(array1, array2, item => item.id);
 * // result will be [{ id: 1 }, { id: 3 }]
 */
export function differenceBy<T1, T2>(
  array: ArrayLike<T1> | null | undefined,
  values: ArrayLike<T2>,
  iteratee: ((value: T1 | T2) => unknown) | PropertyKey
): T1[];

/**
 * Computes the difference between the initial array-like and two subsequent array-likes after mapping their elements
 * through a provided iteratee function or property key.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T1, T2, T3
 * @param {ArrayLike<T1> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {ArrayLike<T2>} values1 - The first array-like to compare against.
 * @param {ArrayLike<T3>} values2 - The second array-like to compare against.
 * @param {((value: T1 | T2 | T3) => unknown) | PropertyKey} iteratee - The iteratee function or property key to map elements.
 * @returns {T1[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-likes.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const result = differenceBy(array1, array2, array3, 'id');
 * // result will be [{ id: 1 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const result = differenceBy(array1, array2, array3, item => item.id);
 * // result will be [{ id: 1 }]
 */
export function differenceBy<T1, T2, T3>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  iteratee: ((value: T1 | T2 | T3) => unknown) | PropertyKey
): T1[];

/**
 * Computes the difference between the initial array-like and three subsequent array-likes after mapping their elements
 * through a provided iteratee function or property key.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T1, T2, T3, T4
 * @param {ArrayLike<T1> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {ArrayLike<T2>} values1 - The first array-like to compare against.
 * @param {ArrayLike<T3>} values2 - The second array-like to compare against.
 * @param {ArrayLike<T4>} values3 - The third array-like to compare against.
 * @param {((value: T1 | T2 | T3 | T4) => unknown) | PropertyKey} iteratee - The iteratee function or property key to map elements.
 * @returns {T1[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-likes.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const result = differenceBy(array1, array2, array3, array4, 'id');
 * // result will be [{ id: 1 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const result = differenceBy(array1, array2, array3, array4, item => item.id);
 * // result will be [{ id: 1 }]
 */
export function differenceBy<T1, T2, T3, T4>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  values3: ArrayLike<T4>,
  iteratee: ((value: T1 | T2 | T3 | T4) => unknown) | PropertyKey
): T1[];

/**
 * Computes the difference between the initial array-like and four subsequent array-likes after mapping their elements
 * through a provided iteratee function or property key.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T1, T2, T3, T4, T5
 * @param {ArrayLike<T1> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {ArrayLike<T2>} values1 - The first array-like to compare against.
 * @param {ArrayLike<T3>} values2 - The second array-like to compare against.
 * @param {ArrayLike<T4>} values3 - The third array-like to compare against.
 * @param {ArrayLike<T5>} values4 - The fourth array-like to compare against.
 * @param {((value: T1 | T2 | T3 | T4 | T5) => unknown) | PropertyKey} iteratee - The iteratee function or property key to map elements.
 * @returns {T1[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-likes.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const array5 = [{ id: 5 }];
 * const result = differenceBy(array1, array2, array3, array4, array5, 'id');
 * // result will be [{ id: 1 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const array5 = [{ id: 5 }];
 * const result = differenceBy(array1, array2, array3, array4, array5, item => item.id);
 * // result will be [{ id: 1 }]
 */
export function differenceBy<T1, T2, T3, T4, T5>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  values3: ArrayLike<T4>,
  values4: ArrayLike<T5>,
  iteratee: ((value: T1 | T2 | T3 | T4 | T5) => unknown) | PropertyKey
): T1[];

/**
 * Computes the difference between the initial array-like and five subsequent array-likes after mapping their elements
 * through a provided iteratee function or property key.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T1, T2, T3, T4, T5, T6
 * @param {ArrayLike<T1> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {ArrayLike<T2>} values1 - The first array-like to compare against.
 * @param {ArrayLike<T3>} values2 - The second array-like to compare against.
 * @param {ArrayLike<T4>} values3 - The third array-like to compare against.
 * @param {ArrayLike<T5>} values4 - The fourth array-like to compare against.
 * @param {ArrayLike<T6>} values5 - The fifth array-like to compare against.
 * @param {((value: T1 | T2 | T3 | T4 | T5 | T6) => unknown) | PropertyKey} iteratee - The iteratee function or property key to map elements.
 * @returns {T1[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-likes.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const array5 = [{ id: 5 }];
 * const array6 = [{ id: 6 }];
 * const result = differenceBy(array1, array2, array3, array4, array5, array6, 'id');
 * // result will be [{ id: 1 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const array5 = [{ id: 5 }];
 * const array6 = [{ id: 6 }];
 * const result = differenceBy(array1, array2, array3, array4, array5, array6, item => item.id);
 * // result will be [{ id: 1 }]
 */
export function differenceBy<T1, T2, T3, T4, T5, T6>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  values3: ArrayLike<T4>,
  values4: ArrayLike<T5>,
  values5: ArrayLike<T6>,
  iteratee: ((value: T1 | T2 | T3 | T4 | T5 | T6) => unknown) | PropertyKey
): T1[];

/**
 * Computes the difference between the initial array-like and six or more subsequent array-likes after mapping their elements
 * through a provided iteratee function or property key.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T1, T2, T3, T4, T5, T6, T7
 * @param {ArrayLike<T1> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {ArrayLike<T2>} values1 - The first array-like to compare against.
 * @param {ArrayLike<T3>} values2 - The second array-like to compare against.
 * @param {ArrayLike<T4>} values3 - The third array-like to compare against.
 * @param {ArrayLike<T5>} values4 - The fourth array-like to compare against.
 * @param {ArrayLike<T6>} values5 - The fifth array-like to compare against.
 * @param {ArrayLike<T7>} values6 - The sixth array-like to compare against.
 * @param {...(Array<ArrayLike<T7> | ((value: T1 | T2 | T3 | T4 | T5 | T6 | T7) => unknown) | PropertyKey>)} values - Additional array-likes or iteratee.
 * @returns {T1[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-likes.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const array5 = [{ id: 5 }];
 * const array6 = [{ id: 6 }];
 * const array7 = [{ id: 7 }];
 * const result = differenceBy(array1, array2, array3, array4, array5, array6, array7, 'id');
 * // result will be [{ id: 1 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }];
 * const array3 = [{ id: 3 }];
 * const array4 = [{ id: 4 }];
 * const array5 = [{ id: 5 }];
 * const array6 = [{ id: 6 }];
 * const array7 = [{ id: 7 }];
 * const result = differenceBy(array1, array2, array3, array4, array5, array6, array7, item => item.id);
 * // result will be [{ id: 1 }]
 */
export function differenceBy<T1, T2, T3, T4, T5, T6, T7>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  values3: ArrayLike<T4>,
  values4: ArrayLike<T5>,
  values5: ArrayLike<T6>,
  ...values: Array<ArrayLike<T7> | ((value: T1 | T2 | T3 | T4 | T5 | T6 | T7) => unknown) | PropertyKey>
): T1[];

/**
 * Computes the difference between the initial array-like and subsequent array-likes.
 *
 * If the array is `null` or `undefined`, an empty array (`[]`) will be returned.
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} array - The initial array-like from which to derive the difference.
 * @param {...Array<ArrayLike<T>>} values - One or more array-likes to compare against.
 * @returns {T[]} A new array containing the elements from the initial array-like that do not have a corresponding
 *   mapped identity in the subsequent array-likes.
 *
 * @example
 * const array1 = [1, 2, 3];
 * const result = differenceBy(array1);
 * // result will be [1, 2, 3]
 *
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [2, 4];
 * const result = differenceBy(array1, array2);
 * // result will be [1, 3]
 *
 * @example
 * const array1 = [1, 2, 3, 4];
 * const array2 = [3, 4];
 * const array3 = [1, 2];
 * const result = differenceBy(array1, array2, array3);
 * // result will be []
 */
export function differenceBy<T>(array: ArrayLike<T> | null | undefined, ...values: Array<ArrayLike<T>>): T[];

export function differenceBy<T>(
  array: ArrayLike<T> | null | undefined,
  ...values: Array<ArrayLike<T> | ((value: T) => unknown) | PropertyKey>
): T[] {
  if (isNil(array)) {
    return [];
  }

  const lastValue = last(values);
  if (isUndefined(lastValue)) {
    return Array.from(array);
  }

  const isLastValueArrayLikeObject = isArrayLikeObject(lastValue);
  const iteratee = isLastValueArrayLikeObject ? identity : lastValue;
  const subsequentArrayLikes = (isLastValueArrayLikeObject ? values : initial(values)) as ArrayLike<T>[];
  const subsequentArrays = subsequentArrayLikes.map(arrayLike => Array.from(arrayLike));

  return differenceByToolkit(
    Array.from(array),
    flatten(subsequentArrays),
    isFunction(iteratee) ? iteratee : property(iteratee as PropertyKey)
  );
}
