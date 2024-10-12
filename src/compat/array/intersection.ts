import { uniq } from '../../array';
import { intersection as intersectionToolkit } from '../../array/intersection';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject';

export function intersection<T>(...arrays: Array<ArrayLike<T> | null | undefined>): T[] {
  if (arrays.length === 0 || !isArrayLikeObject(arrays[0])) {
    return [];
  }

  const normalizedArrays = arrays.map(array => {
    if (!isArrayLikeObject(array)) {
      return [];
    }

    return Array.from(array);
  });

  let result: T[] = uniq(normalizedArrays[0]);
  for (let i = 1; i < normalizedArrays.length; i++) {
    result = intersectionToolkit(result, normalizedArrays[i]);
  }

  return result;
}
