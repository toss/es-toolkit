import { last } from './last.ts';
import { uniq } from '../../array/uniq.ts';
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
  const arrays = values.filter(isArrayLikeObject).map(toArray);
  const flatten = flattenArrayLike(arrays.map(uniq));
  const mapper = isArrayLikeObject(lastValue) || lastValue == null ? identity : iteratee(lastValue);

  const itemMap = new Map();

  for (let i = 0; i < flatten.length; ++i) {
    const mapped = mapper(flatten[i]);
    if (!itemMap.has(mapped)) {
      itemMap.set(mapped, flatten[i]);
    } else {
      itemMap.set(mapped, null);
    }
  }

  const result = [];

  for (const item of itemMap.values()) {
    if (item != null) {
      result.push(item);
    }
  }

  return result;
}
