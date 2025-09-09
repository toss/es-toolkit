import { last } from '../../array/last.ts';
import { uniq } from '../../array/uniq.ts';
import { uniqBy } from '../../array/uniqBy.ts';
import { flattenArrayLike } from '../_internal/flattenArrayLike.ts';
import { ValueIteratee } from '../_internal/ValueIteratee.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';

type Iteratee<T> = PropertyKey | Partial<T> | ((value: T) => unknown);

/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays - The arrays to inspect.
 * @param {ValueIteratee<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * @example
 * unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
export function unionBy<T>(arrays: ArrayLike<T> | null | undefined, iteratee?: ValueIteratee<T>): T[];

/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays1 - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ValueIteratee<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 */
export function unionBy<T>(
  arrays1: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): T[];

/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays1 - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays3 - The third array to inspect.
 * @param {ValueIteratee<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], [3.4], Math.floor);
 * // => [2.1, 1.2, 3.4]
 */
export function unionBy<T>(
  arrays1: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  arrays3: ArrayLike<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): T[];

/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays1 - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays3 - The third array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays4 - The fourth array to inspect.
 * @param {ValueIteratee<T>} [iteratee] - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], [3.4], [4.5], Math.floor);
 * // => [2.1, 1.2, 3.4, 4.5]
 */
export function unionBy<T>(
  arrays1: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  arrays3: ArrayLike<T> | null | undefined,
  arrays4: ArrayLike<T> | null | undefined,
  iteratee?: ValueIteratee<T>
): T[];

/**
 * This method is like `union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @template T
 * @param {ArrayLike<T> | null | undefined} arrays1 - The first array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays2 - The second array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays3 - The third array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays4 - The fourth array to inspect.
 * @param {ArrayLike<T> | null | undefined} arrays5 - The fifth array to inspect.
 * @param {...Array<ValueIteratee<T> | ArrayLike<T> | null | undefined>} iteratee - The iteratee invoked per element.
 * @returns {T[]} Returns the new array of combined values.
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], [3.4], [4.5], [5.6], Math.floor);
 * // => [2.1, 1.2, 3.4, 4.5, 5.6]
 */
export function unionBy<T>(
  arrays1: ArrayLike<T> | null | undefined,
  arrays2: ArrayLike<T> | null | undefined,
  arrays3: ArrayLike<T> | null | undefined,
  arrays4: ArrayLike<T> | null | undefined,
  arrays5: ArrayLike<T> | null | undefined,
  ...iteratee: Array<ValueIteratee<T> | ArrayLike<T> | null | undefined>
): T[];

/**
 * This function takes multiple arrays and returns a new array containing only the unique values
 * from all input arrays, preserving the order of their first occurrence.
 * An iteratee function can be provided for comparison and it output values from the first possible array
 *
 * @template T - The type of elements in the arrays.
 * @param {...(ArrayLike<T> | null | undefined | Iteratee<T>)} values - The arrays to inspect, or the iteratee function.
 * @returns {T[]} Returns the new array of combined unique values.
 *
 * @example
 * // Returns [2.1, 1.2]
 * unionBy([2.1], [1.2, 2.3], Math.floor);
 *
 * @example
 * // Returns [{ x: 1 }, { x: 2 }]
 * unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
 *
 * @example
 * // Returns [{ x: 1, y: 1 }]
 * unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], 'x');
 */

export function unionBy<T>(...values: Array<ArrayLike<T> | null | undefined | Iteratee<T>>): T[] {
  const lastValue = last(values);
  const flattened = flattenArrayLike(values as Array<ArrayLike<T>>);

  if (isArrayLikeObject(lastValue) || lastValue == null) {
    return uniq(flattened);
  }

  return uniqBy(flattened, iteratee(lastValue));
}
