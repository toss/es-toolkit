import { differenceBy } from './differenceBy.ts';
import { intersectionBy } from './intersectionBy.ts';
import { last } from './last.ts';
import { unionBy } from './unionBy.ts';
import { windowed } from '../../array/windowed.ts';
import { identity } from '../../function/identity';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee';

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays after applying the iteratee function to each element.
 *
 * This function takes multiple arrays and an iteratee function (or property key) to
 * compare the elements after transforming them. It returns a new array containing elements that are present
 * in exactly one of the arrays after applying the iteratee to each element.
 *
 * @template T1, T2
 * @param {ArrayLike<T1> | null | undefined} array - The first array to compare.
 * @param {ArrayLike<T2>} values - The second array to compare.
 * @param {(value: T1 | T2) => unknown | string} iteratee - The iteratee invoked on each element
 *  for comparison. It can also be a property key to compare based on that property.
 * @returns {Array<T1 | T2>} A new array containing elements that are present in exactly one of the arrays
 *  after applying the iteratee.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
 * const result = xorBy(array1, array2, 'x');
 * // result will be [{ x: 1 }, { x: 4 }] since these elements are unique to their respective arrays.
 *
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
 * const result = xorBy(array1, array2, value => value.x);
 * // result will be [{ x: 1 }, { x: 4 }] since these elements are unique to their respective arrays.
 */
export function xorBy<T1, T2>(
  array: ArrayLike<T1> | null | undefined,
  values: ArrayLike<T2>,
  iteratee: ((value: T1 | T2) => unknown) | string
): Array<T1 | T2>;

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays after applying the iteratee function to each element.
 *
 * This function takes multiple arrays and an iteratee function (or property key) to
 * compare the elements after transforming them. It returns a new array containing elements that are present
 * in exactly one of the arrays after applying the iteratee to each element.
 *
 * @template T1, T2, T3
 * @param {ArrayLike<T1> | null | undefined} array - The first array to compare.
 * @param {ArrayLike<T2>} values1 - The second array to compare.
 * @param {ArrayLike<T3>} values2 - The third array to compare.
 * @param {(value: T1 | T2 | T3) => unknown | string} iteratee - The iteratee invoked on each element
 *  for comparison. It can also be a property key to compare based on that property.
 * @returns {Array<T1 | T2 | T3>} A new array containing elements that are present in exactly one of the arrays
 *  after applying the iteratee.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const array3 = [{ x: 3 }, { x: 4 }];
 * const result = xorBy(array1, array2, array3, 'x');
 * // result will be [{ x: 1 }, { x: 4 }] since these elements are unique to their respective arrays.
 *
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const array3 = [{ x: 3 }, { x: 4 }];
 * const result = xorBy(array1, array2, array3, value => value.x);
 * // result will be [{ x: 1 }, { x: 4 }] since these elements are unique to their respective arrays.
 */
export function xorBy<T1, T2, T3>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  iteratee: ((value: T1 | T2 | T3) => unknown) | string
): Array<T1 | T2 | T3>;

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays after applying the iteratee function to each element.
 *
 * This function takes multiple arrays and an iteratee function (or property key) to
 * compare the elements after transforming them. It returns a new array containing elements that are present
 * in exactly one of the arrays after applying the iteratee to each element.
 *
 * @template T1, T2, T3, T4
 * @param {ArrayLike<T1> | null | undefined} array - The first array to compare.
 * @param {ArrayLike<T2>} values1 - The second array to compare.
 * @param {ArrayLike<T3>} values2 - The third array to compare.
 * @param {...(ArrayLike<T4> | ((value: T1 | T2 | T3 | T4) => unknown) | string)} values - Additional arrays to compare, or the iteratee function.
 * @returns {Array<T1 | T2 | T3 | T4>} A new array containing elements that are present in exactly one of the arrays
 *  after applying the iteratee.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const array3 = [{ x: 3 }, { x: 4 }];
 * const array4 = [{ x: 4 }, { x: 5 }];
 * const result = xorBy(array1, array2, array3, array4, 'x');
 * // result will be [{ x: 1 }, { x: 5 }] since these elements are unique to their respective arrays.
 *
 * const array1 = [{ x: 1 }, { x: 2 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const array3 = [{ x: 3 }, { x: 4 }];
 * const array4 = [{ x: 4 }, { x: 5 }];
 * const result = xorBy(array1, array2, array3, array4, value => value.x);
 * // result will be [{ x: 1 }, { x: 5 }] since these elements are unique to their respective arrays.
 */
export function xorBy<T1, T2, T3, T4>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  ...values: Array<ArrayLike<T4> | ((value: T1 | T2 | T3 | T4) => unknown) | string>
): Array<T1 | T2 | T3 | T4>;

/**
 * Computes the symmetric difference between two arrays using a custom mapping function.
 * The symmetric difference is the set of elements which are in either of the arrays,
 * but not in their intersection, determined by the result of the mapping function.
 *
 * @template T - Type of elements in the input arrays.
 * @template U - Type of the values returned by the mapping function.
 *
 * @param {...(ArrayLike<T> | null | undefined | PropertyKey | Partial<T> | ((value: T) => unknown))} values - The arrays to inspect, or the function to map array elements to comparison values.
 * @returns {T[]} An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the values returned by the mapping function.
 *
 * @example
 * // Custom mapping function for objects with an 'id' property
 * const idMapper = obj => obj.id;
 * xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
 * // Returns [{ id: 1 }, { id: 3 }]
 */
export function xorBy<T>(
  ...values: Array<ArrayLike<T> | null | undefined | PropertyKey | Partial<T> | ((value: T) => unknown)>
): T[];

/**
 * Computes the symmetric difference between two arrays using a custom mapping function.
 * The symmetric difference is the set of elements which are in either of the arrays,
 * but not in their intersection, determined by the result of the mapping function.
 *
 * @template T - Type of elements in the input arrays.
 * @template U - Type of the values returned by the mapping function.
 *
 * @param {...(ArrayLike<T> | null | undefined | PropertyKey | Partial<T> | ((value: T) => unknown))} values - The arrays to inspect, or the function to map array elements to comparison values.
 * @returns {T[]} An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the values returned by the mapping function.
 *
 * @example
 * // Custom mapping function for objects with an 'id' property
 * const idMapper = obj => obj.id;
 * xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
 * // Returns [{ id: 1 }, { id: 3 }]
 */
export function xorBy<T>(
  ...values: Array<ArrayLike<T> | null | undefined | PropertyKey | Partial<T> | ((value: T) => unknown)>
): T[] {
  const lastValue = last(values);

  let mapper = identity;

  if (!isArrayLikeObject(lastValue) && lastValue != null) {
    mapper = iteratee(lastValue);
    values = values.slice(0, -1);
  }

  const arrays = values.filter(isArrayLikeObject) as T[][];

  const union = unionBy(...arrays, mapper);
  const intersections = windowed(arrays, 2).map(([arr1, arr2]) => intersectionBy(arr1, arr2, mapper));

  return differenceBy(union, unionBy(...intersections, mapper), mapper);
}
