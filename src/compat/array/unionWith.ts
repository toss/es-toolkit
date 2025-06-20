import { last } from '../../array/last.ts';
import { uniq } from '../../array/uniq.ts';
import { uniqWith } from '../../array/uniqWith.ts';
import { flattenArrayLike } from '../_internal/flattenArrayLike.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

/**
 * This method is like `union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The arrays to inspect.
 * @param {(a: T, b: T) => boolean} [comparator] - The comparator invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 * unionWith(objects, others, isEqual);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
export function unionWith<T>(arrays: ArrayLike<T> | null | undefined, comparator?: (a: T, b: T) => boolean): T[];

/**
 * This method is like `union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {(a: T, b: T) => boolean} [comparator] - The comparator invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionWith([1, 2], [2, 3], (a, b) => a === b);
 * // => [1, 2, 3]
 */
export function unionWith<T>(
  arrays: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  comparator?: (a: T, b: T) => boolean
): T[];

/**
 * This method is like `union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays3 - The third array to inspect.
 * @param {...Array<(a: T, b: T) => boolean | ArrayLike<T> | null | undefined>} comparator - The comparator invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionWith([1], [2], [3], (a, b) => a === b);
 * // => [1, 2, 3]
 */
export function unionWith<T>(
  arrays: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  arrays3: ArrayLike<T> | null | undefined,
  ...comparator: Array<((a: T, b: T) => boolean) | ArrayLike<T> | null | undefined>
): T[];

/**
 * This function takes multiple arrays and returns a new array containing only the unique values
 * from all input arrays, preserving the order of their first occurrence.
 * A comparator function can be provided for comparison and it output values from the first possible array
 *
 * @template T - The type of elements in the arrays.
 * @param {...(ArrayLike<T> | null | undefined | Comparator<T, U>)} values - The arrays to inspect, or the comparator function.
 * @returns {T[]} Returns the new array of combined unique values.
 *
 * @example
 * const objects = [
 *   { x: 1, y: 2 },
 *   { x: 2, y: 1 },
 * ];
 * const others = [
 *   { x: 1, y: 1 },
 *   { x: 1, y: 2 },
 * ];
 * // Returns [objects[0], objects[1], others[0]]
 * unionWith(objects, others, isEqual);
 *
 * @example
 * const objects = [{ x: 1, y: 1 }];
 * const others = [{ x: 1, y: 2 }];
 * // Returns [{ x: 1, y: 1 }]
 * unionWith(objects, others, (a, b) => a.x === b.x);
 */

export function unionWith<T>(...values: Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>): T[] {
  const lastValue = last(values);
  const flattened = flattenArrayLike<T>(values);

  if (isArrayLikeObject(lastValue) || lastValue == null) {
    return uniq(flattened);
  }

  return uniqWith(flattened, lastValue);
}
