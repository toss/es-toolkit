import { differenceWith } from './differenceWith.ts';
import { intersectionWith } from './intersectionWith.ts';
import { last } from './last.ts';
import { unionWith } from './unionWith.ts';
import { windowed } from '../../array/windowed.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays using a custom comparator function.
 *
 * This function takes multiple arrays and a comparator function to determine equality between elements.
 * It returns a new array containing elements that are present in exactly one of the arrays
 * as determined by the comparator function.
 *
 * @template T1, T2
 * @param {ArrayLike<T1> | null | undefined} array - The first array to compare.
 * @param {ArrayLike<T2>} values - The second array to compare.
 * @param {(a: T1 | T2, b: T1 | T2) => boolean} comparator - The comparator invoked per element to determine equality.
 * @returns {Array<T1 | T2>} A new array containing elements that are present in exactly one of the arrays
 *  as determined by the comparator.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
 * const result = xorWith(array1, array2, (a, b) => a.x === b.x);
 * // result will be [{ x: 1 }, { x: 4 }] since these elements are unique to their respective arrays.
 */
export function xorWith<T1, T2>(
  array: ArrayLike<T1> | null | undefined,
  values: ArrayLike<T2>,
  comparator: (a: T1 | T2, b: T1 | T2) => boolean
): Array<T1 | T2>;

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays using a custom comparator function.
 *
 * This function takes multiple arrays and a comparator function to determine equality between elements.
 * It returns a new array containing elements that are present in exactly one of the arrays
 * as determined by the comparator function.
 *
 * @template T1, T2, T3
 * @param {ArrayLike<T1> | null | undefined} array - The first array to compare.
 * @param {ArrayLike<T2>} values1 - The second array to compare.
 * @param {ArrayLike<T3>} values2 - The third array to compare.
 * @param {(a: T1 | T2 | T3, b: T1 | T2 | T3) => boolean} comparator - The comparator invoked per element to determine equality.
 * @returns {Array<T1 | T2 | T3>} A new array containing elements that are present in exactly one of the arrays
 *  as determined by the comparator.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const array3 = [{ x: 3 }, { x: 4 }];
 * const result = xorWith(array1, array2, array3, (a, b) => a.x === b.x);
 * // result will be [{ x: 1 }, { x: 4 }] since these elements are unique to their respective arrays.
 */
export function xorWith<T1, T2, T3>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  comparator: (a: T1 | T2 | T3, b: T1 | T2 | T3) => boolean
): Array<T1 | T2 | T3>;

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays using a custom comparator function.
 *
 * This function takes multiple arrays and a comparator function to determine equality between elements.
 * It returns a new array containing elements that are present in exactly one of the arrays
 * as determined by the comparator function.
 *
 * @template T1, T2, T3, T4
 * @param {ArrayLike<T1> | null | undefined} array - The first array to compare.
 * @param {ArrayLike<T2>} values1 - The second array to compare.
 * @param {ArrayLike<T3>} values2 - The third array to compare.
 * @param {...(ArrayLike<T4> | ((a: T1 | T2 | T3 | T4, b: T1 | T2 | T3 | T4) => boolean))} values - Additional arrays to compare, or the comparator function.
 * @returns {Array<T1 | T2 | T3 | T4>} A new array containing elements that are present in exactly one of the arrays
 *  as determined by the comparator.
 *
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }];
 * const array2 = [{ x: 2 }, { x: 3 }];
 * const array3 = [{ x: 3 }, { x: 4 }];
 * const array4 = [{ x: 4 }, { x: 5 }];
 * const result = xorWith(array1, array2, array3, array4, (a, b) => a.x === b.x);
 * // result will be [{ x: 1 }, { x: 5 }] since these elements are unique to their respective arrays.
 */
export function xorWith<T1, T2, T3, T4>(
  array: ArrayLike<T1> | null | undefined,
  values1: ArrayLike<T2>,
  values2: ArrayLike<T3>,
  ...values: Array<ArrayLike<T4> | ((a: T1 | T2 | T3 | T4, b: T1 | T2 | T3 | T4) => boolean)>
): Array<T1 | T2 | T3 | T4>;

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays using a custom comparator function.
 *
 * The symmetric difference is the set of elements which are in either of the arrays,
 * but not in their intersection, determined by the comparator function.
 *
 * @template T - Type of elements in the input arrays.
 *
 * @param {...(ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean))} values - The arrays to inspect, or the comparator function.
 * @returns {T[]} An array containing the elements that are present in exactly one of the arrays
 *  as determined by the comparator.
 *
 * @example
 * // Custom comparator function for objects with an 'id' property
 * const idComparator = (a, b) => a.id === b.id;
 * xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idComparator);
 * // Returns [{ id: 1 }, { id: 3 }]
 */
export function xorWith<T>(...values: Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>): T[];

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays using a custom comparator function.
 *
 * The symmetric difference is the set of elements which are in either of the arrays,
 * but not in their intersection, determined by the comparator function.
 *
 * @template T - Type of elements in the input arrays.
 *
 * @param {...(ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean))} values - The arrays to inspect, or the comparator function.
 * @returns {T[]} An array containing the elements that are present in exactly one of the arrays
 *  as determined by the comparator.
 *
 * @example
 * // Custom comparator function for objects with an 'id' property
 * const idComparator = (a, b) => a.id === b.id;
 * xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idComparator);
 * // Returns [{ id: 1 }, { id: 3 }]
 */
export function xorWith<T>(...values: Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>): T[] {
  const lastValue = last(values);

  let comparator = (a: T, b: T) => a === b;

  if (typeof lastValue === 'function') {
    comparator = lastValue as (a: T, b: T) => boolean;
    values = values.slice(0, -1);
  }

  const arrays = values.filter(isArrayLikeObject) as T[][];

  const union = unionWith(...arrays, comparator);
  const intersections = windowed(arrays, 2).map(([arr1, arr2]) => intersectionWith(arr1, arr2, comparator));

  return differenceWith(union, unionWith(...intersections, comparator), comparator);
}
