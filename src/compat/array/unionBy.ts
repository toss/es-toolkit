import { last } from '../../array/last.ts';
import { uniq } from '../../array/uniq.ts';
import { uniqBy } from '../../array/uniqBy.ts';
import { flattenArrayLike } from '../_internal/flattenArrayLike.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';

type Iteratee<T> = PropertyKey | Partial<T> | ((value: T) => unknown);

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
  const validArray = values.filter(isArrayLikeObject);
  const flattened = flattenArrayLike<T>(validArray);

  if (isArrayLikeObject(lastValue) || lastValue == null) {
    return uniq(flattened);
  }

  return uniqBy(flattened, iteratee(lastValue));
}
