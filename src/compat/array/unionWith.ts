import { last } from '../../array/last.ts';
import { uniq } from '../../array/uniq.ts';
import { uniqWith } from '../../array/uniqWith.ts';
import { flattenArrayLike } from '../_internal/flattenArrayLike.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

type Comparator<T> = (x: T, y: T) => boolean;

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

export function unionWith<T>(...values: Array<ArrayLike<T> | null | undefined | Comparator<T>>): T[] {
  const lastValue = last(values);
  const validArray = values.filter(isArrayLikeObject);
  const flattened = flattenArrayLike<T>(validArray);

  if (isArrayLikeObject(lastValue) || lastValue == null) {
    return uniq(flattened);
  }

  return uniqWith(flattened, lastValue);
}
