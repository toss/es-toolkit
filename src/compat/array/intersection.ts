import { uniq } from '../../array';
import { intersection as intersectionToolkit } from '../../array/intersection';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject';

export function intersection<T>(...arrays: Array<ArrayLike<T> | null | undefined>): T[] {
  if (arrays.length === 0) {
    return [];
  }

  if (!isArrayLikeObject(arrays[0])) {
    return [];
  }

  let result: T[] = uniq(Array.from(arrays[0]));
  
  for (let i = 1; i < normalizedArrays.length; i++) {
    if (!isArrayLikeObject(arrays[i])) {
      return [];
    }
    
    result = intersectionToolkit(result, Array.from(arrays[i]));
  }

  return result;
}
