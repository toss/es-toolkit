import { differenceWith } from './differenceWith.ts';
import { intersectionWith } from './intersectionWith.ts';
import { last } from './last.ts';
import { unionWith } from './unionWith.ts';
import { windowed } from '../../array/windowed.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * This method is like `xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The arrays to inspect.
 * @param {(a: T, b: T) => boolean} [comparator] - The comparator invoked per element.
 * @returns {T[]} Returns the new array of values.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * xorWith(objects, others, isEqual);
 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
export function xorWith<T>(arrays: ArrayLike<T> | null | undefined, comparator?: (a: T, b: T) => boolean): T[];

/**
 * This method is like `xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {(a: T, b: T) => boolean} [comparator] - The comparator invoked per element.
 * @returns {T[]} Returns the new array of values.
 *
 * @example
 * xorWith([1, 2], [2, 3], (a, b) => a === b);
 * // => [1, 3]
 */
export function xorWith<T>(
  arrays: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  comparator?: (a: T, b: T) => boolean
): T[];

/**
 * This method is like `xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays3 - The third array to inspect.
 * @param {...Array<(a: T, b: T) => boolean | ArrayLike<T> | null | undefined>} comparator - The comparator invoked per element.
 * @returns {T[]} Returns the new array of values.
 *
 * @example
 * xorWith([1], [2], [3], (a, b) => a === b);
 * // => [1, 2, 3]
 */
export function xorWith<T>(
  arrays: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  arrays3: ArrayLike<T> | null | undefined,
  ...comparator: Array<((a: T, b: T) => boolean) | ArrayLike<T> | null | undefined>
): T[];

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

  // eslint-disable-next-line
  // @ts-ignore
  const union = unionWith(...arrays, comparator);
  const intersections = windowed(arrays, 2).map(([arr1, arr2]) => intersectionWith(arr1, arr2, comparator));

  // eslint-disable-next-line
  // @ts-ignore
  return differenceWith(union, unionWith(...intersections, comparator), comparator);
}
