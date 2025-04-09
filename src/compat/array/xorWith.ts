import { differenceWith } from '../../array/differenceWith.ts';
import { intersectionWith } from '../../array/intersectionWith.ts';
import { last } from '../../array/last.ts';
import { unionWith } from '../../array/unionWith.ts';
import { uniq } from '../../array/uniq.ts';
import { uniqWith } from '../../array/uniqWith.ts';
import { isEqual } from '../../predicate/isEqual.ts';
import { flattenArrayLike } from '../_internal/flattenArrayLike.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';
import { toArray } from '../util/toArray.ts';

type Comparator<T> = (x: T, y: T) => boolean;

/**
 * Computes the symmetric difference between two arrays using a custom equality function.
 * The symmetric difference is the set of elements which are in either of the arrays,
 * but not in their intersection.
 *
 * @template T - Type of elements in the input arrays.
 *
 * @param {...(ArrayLike<T> | null | undefined | Comparator<T, U>)} values - The arrays to inspect, or the comparator function.
 * @returns {T[]} An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the custom equality function.
 *
 * @example
 * // Custom equality function for objects with an 'id' property
 * const areObjectsEqual = (a, b) => a.id === b.id;
 * xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], areObjectsEqual);
 * // Returns [{ id: 1 }, { id: 3 }]
 */
export function xorWith<T>(...values: Array<ArrayLike<T> | null | undefined | Comparator<T>>): T[] {
  const lastValue = last(values);
  const arrays = values.filter(isArrayLikeObject).map(toArray).map(uniq);
  const flatten = flattenArrayLike<T>(arrays);
  const comparator = isArrayLikeObject(lastValue) || lastValue == null ? isEqual : iteratee(lastValue);

  const union = uniqWith(flatten, comparator);
  let intersection = Array<T>();

  for (let i = 0; i < arrays.length; ++i) {
    for (let j = i + 1; j < arrays.length; ++j) {
      intersection = unionWith(intersection, intersectionWith(arrays[i], arrays[j], comparator), comparator);
    }
  }

  return differenceWith(union, intersection, comparator) as T[];
}
