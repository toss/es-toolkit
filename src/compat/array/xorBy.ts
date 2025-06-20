import { differenceBy } from './differenceBy.ts';
import { intersectionBy } from './intersectionBy.ts';
import { last } from './last.ts';
import { unionBy } from './unionBy.ts';
import { windowed } from '../../array/windowed.ts';
import { identity } from '../../function/identity.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The arrays to inspect.
 * @param {ValueIteratee<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of values.
 *
 * @example
 * xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
 * // => [1.2, 4.3]
 *
 * @example
 * xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 2 }]
 */
export function xorBy<T>(arrays: ArrayLike<T> | null | undefined, iteratee?: ValueIteratee<T>): T[];

/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ValueIteratee<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of values.
 *
 * @example
 * xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
 * // => [1.2, 4.3]
 */
export function xorBy<T>(
  arrays: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): T[];

/**
 * This method is like `xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays3 - The third array to inspect.
 * @param {...Array<ValueIteratee<T> | ArrayLike<T> | null | undefined>} iteratee - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of values.
 *
 * @example
 * xorBy([1.2, 2.3], [3.4, 4.5], [5.6, 6.7], Math.floor);
 * // => [1.2, 3.4, 5.6]
 */
export function xorBy<T>(
  arrays: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  arrays3: ArrayLike<T> | null | undefined,
  ...iteratee: Array<ValueIteratee<T> | ArrayLike<T> | null | undefined>
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
export function xorBy<T>(...values: Array<ArrayLike<T> | null | undefined | ValueIteratee<T>>): T[] {
  const lastValue = last(values);

  let mapper = identity;

  if (!isArrayLikeObject(lastValue) && lastValue != null) {
    mapper = iteratee(lastValue);
    values = values.slice(0, -1);
  }

  const arrays = values.filter(isArrayLikeObject) as [any];

  const union = unionBy(...arrays, mapper);
  const intersections = windowed(arrays, 2).map(([arr1, arr2]) => intersectionBy(arr1, arr2, mapper)) as [any];

  return differenceBy(union, unionBy(...intersections, mapper), mapper) as T[];
}
