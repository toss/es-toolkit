import { differenceBy } from '../../array/differenceBy.ts';
import { intersectionBy } from '../../array/intersectionBy.ts';
import { last } from '../../array/last.ts';
import { unionBy } from '../../array/unionBy.ts';
import { uniq } from '../../array/uniq.ts';
import { uniqBy } from '../../array/uniqBy.ts';
import { identity } from '../../function/identity.ts';
import { flattenArrayLike } from '../_internal/flattenArrayLike.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { iteratee } from '../util/iteratee.ts';
import { toArray } from '../util/toArray.ts';

type Mapper<T> = PropertyKey | Partial<T> | ((value: T) => unknown);

/**
 * Computes the symmetric difference between two arrays using a custom mapping function.
 * The symmetric difference is the set of elements which are in either of the arrays,
 * but not in their intersection, determined by the result of the mapping function.
 *
 * @template T - Type of elements in the input arrays.
 * @template U - Type of the values returned by the mapping function.
 *
 * @param {...(ArrayLike<T> | null | undefined | Mapper<T>)} values - The arrays to inspect, or the function to map array elements to comparison values.
 * @returns {T[]} An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the values returned by the mapping function.
 *
 * @example
 * // Custom mapping function for objects with an 'id' property
 * const idMapper = obj => obj.id;
 * xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
 * // Returns [{ id: 1 }, { id: 3 }]
 */
export function xorBy<T>(...values: Array<ArrayLike<T> | null | undefined | Mapper<T>>): T[] {
  const lastValue = last(values);
  const arrays = values.filter(isArrayLikeObject).map(toArray).map(uniq);
  const flatten = flattenArrayLike<T>(arrays);
  const mapper = isArrayLikeObject(lastValue) || lastValue == null ? identity : iteratee(lastValue);

  const union = uniqBy(flatten, mapper);
  let intersection = Array<T>();

  for (let i = 0; i < arrays.length; ++i) {
    for (let j = i + 1; j < arrays.length; ++j) {
      intersection = unionBy(intersection, intersectionBy(arrays[i], arrays[j], mapper), mapper);
    }
  }

  return differenceBy(union, intersection, mapper) as T[];
}
