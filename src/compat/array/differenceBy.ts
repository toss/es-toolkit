import { differenceBy as differenceByToolkit } from '../../array/differenceBy.ts';
import { flatten } from '../../array/flatten.ts';
import { last } from '../../array/last.ts';
import { isFunction } from '../../predicate/isFunction.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';
import { identity } from '../_internal/identity.ts';
import { initial } from '../../array/initial.ts';

/**
 * Computes the difference between the initial array and multiple subsequent arrays after mapping their elements
 * through a provided iteratee function or property key.
 *
 * This function takes an initial array, multiple arrays to compare against, and optionally, an iteratee function
 * or property key. It returns a new array containing the elements from the initial array that are not present in
 * the subsequent arrays, based on the identity calculated by the iteratee function or property key.
 *
 * If no iteratee function or property key is provided, the identity function is used by default. If the last
 * argument is an array-like object, it is treated as the final array to compare against, and the identity function
 * will be used as the default iteratee. If the last argument is an iteratee function or property key, that will be
 * used to map the elements.
 *
 * @template T
 * @param {T[]} arr - The initial array from which to derive the difference.
 * @param {...T[][], T[] | ((value: T) => unknown) | keyof T} values - One or more arrays to compare against,
 *   and optionally an iteratee function or property key. The last argument can be a function, a property key,
 *   or an array (if the iteratee is not provided).
 * @returns {T[]} A new array containing the elements from the initial array that do not have a corresponding
 *   mapped identity in the subsequent arrays.
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const array3 = [{ id: 3 }];
 * const result = differenceBy(array1, array2, array3, item => item.id);
 * // result will be [{ id: 1 }]
 *
 * @example
 * const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const array2 = [{ id: 2 }, { id: 4 }];
 * const result = differenceBy(array1, array2, 'id');
 * // result will be [{ id: 1 }, { id: 3 }]
 *
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [2, 4];
 * const array3 = [3];
 * const result = differenceBy(array1, array2, array3);
 * // result will be [1]
 */
export function differenceBy<T>(
  arr: readonly T[],
  ...values: [...Array<readonly T[]>, readonly T[] | ((value: T) => unknown) | keyof T]
): T[] {
  const lastValue = last(values);
  const iteratee = isArrayLikeObject(lastValue) ? identity : lastValue;
  const subsequentArrays = isArrayLikeObject(lastValue) ? values : initial(values);

  return differenceByToolkit(
    arr,
    flatten(subsequentArrays) as readonly T[],
    isFunction(iteratee) ? iteratee : value => value[iteratee as keyof typeof value]
  );
}
