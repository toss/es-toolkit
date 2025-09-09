import { last } from './last.ts';
import { intersectionWith as intersectionWithToolkit } from '../../array/intersectionWith.ts';
import { uniq as uniqToolkit } from '../array/uniq.ts';
import { eq } from '../util/eq.ts';

/**
 * Creates an array of unique values that are included in all given arrays, using a comparator function for equality comparisons.
 *
 * @template T, U
 * @param {ArrayLike<T> | null | undefined} array - The array to inspect.
 * @param {ArrayLike<U>} values - The values to compare.
 * @param {(a: T, b: T | U) => boolean} comparator - The comparator invoked per element.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * intersectionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
 * // => [{ 'x': 1, 'y': 2 }]
 */
export function intersectionWith<T, U>(
  array: ArrayLike<T> | null | undefined,
  values: ArrayLike<U>,
  comparator: (a: T, b: T | U) => boolean
): T[];

/**
 * Creates an array of unique values that are included in all given arrays, using a comparator function for equality comparisons.
 *
 * @template T, U, V
 * @param {ArrayLike<T> | null | undefined} array - The array to inspect.
 * @param {ArrayLike<U>} values1 - The first values to compare.
 * @param {ArrayLike<V>} values2 - The second values to compare.
 * @param {(a: T, b: T | U | V) => boolean} comparator - The comparator invoked per element.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others1 = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * const others2 = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }];
 * intersectionWith(objects, others1, others2, (a, b) => a.x === b.x && a.y === b.y);
 * // => [{ 'x': 1, 'y': 2 }]
 */
export function intersectionWith<T, U, V>(
  array: ArrayLike<T> | null | undefined,
  values1: ArrayLike<U>,
  values2: ArrayLike<V>,
  comparator: (a: T, b: T | U | V) => boolean
): T[];

/**
 * Creates an array of unique values that are included in all given arrays, using a comparator function for equality comparisons.
 *
 * @template T, U, V, W
 * @param {ArrayLike<T> | null | undefined} array - The array to inspect.
 * @param {ArrayLike<U>} values1 - The first values to compare.
 * @param {ArrayLike<V>} values2 - The second values to compare.
 * @param {...Array<ArrayLike<W> | (a: T, b: T | U | V | W) => boolean>} values - The other arrays to compare, and the comparator to use.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others1 = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * const others2 = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }];
 * const others3 = [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }];
 * intersectionWith(objects, others1, others2, others3, (a, b) => a.x === b.x && a.y === b.y);
 * // => [{ 'x': 1, 'y': 2 }]
 */
export function intersectionWith<T, U, V, W>(
  array: ArrayLike<T> | null | undefined,
  values1: ArrayLike<U>,
  values2: ArrayLike<V>,
  ...values: Array<ArrayLike<W> | ((a: T, b: T | U | V | W) => boolean)>
): T[];

/**
 * Creates an array of unique values that are included in all given arrays.
 *
 * @template T
 * @param {ArrayLike<T> | null} [array] - The array to inspect.
 * @param {...Array<ArrayLike<T> | (a: T, b: never) => boolean>} values - The values to compare.
 * @returns {T[]} Returns the new array of intersecting values.
 *
 * @example
 * intersectionWith([2, 1], [2, 3]);
 * // => [2]
 */
export function intersectionWith<T>(
  array?: ArrayLike<T> | null,
  ...values: Array<ArrayLike<T> | ((a: T, b: never) => boolean)>
): T[];

/**
 * Returns the intersection of multiple arrays based on a custom equality function.
 *
 * @template T - The type of elements in the arrays
 * @param {ArrayLike<T> | null | undefined} firstArr - The first array to compare
 * @param {...(ArrayLike<T> | null | undefined | ((x: T, y: T) => boolean))} otherArrs - Additional arrays and optional equality function
 * @returns {T[]} Elements from first array that match in all arrays
 *
 * @example
 * const arr1 = [{id: 1}, {id: 2}];
 * const arr2 = [{id: 2}, {id: 3}];
 * const result = intersectionWith(arr1, arr2, (a, b) => a.id === b.id);
 * // result is [{id: 2}]
 */
export function intersectionWith<T>(firstArr: ArrayLike<T> | null | undefined, ...otherArrs: any[]): T[] {
  if (firstArr == null) {
    return [];
  }

  const _comparator = last(otherArrs);
  let comparator = eq as (x: T, y: T) => boolean;
  let uniq: (arr: T[]) => T[] = uniqToolkit;

  if (typeof _comparator === 'function') {
    comparator = _comparator;
    uniq = uniqPreserve0;
    otherArrs.pop();
  }

  let result = uniq(Array.from(firstArr));

  for (let i = 0; i < otherArrs.length; ++i) {
    const otherArr = otherArrs[i] as ArrayLike<T>;

    if (otherArr == null) {
      return [];
    }

    result = intersectionWithToolkit(result, Array.from(otherArr), comparator);
  }

  return result;
}

/**
 * This function is to preserve the sign of `-0`, which is a behavior in lodash.
 */
function uniqPreserve0<T>(arr: T[]): T[] {
  const result = [];
  const added = new Set();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (added.has(item)) {
      continue;
    }

    result.push(item);
    added.add(item);
  }

  return result;
}
