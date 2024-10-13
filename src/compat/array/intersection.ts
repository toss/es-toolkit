import { uniq } from '../../array/uniq.ts';
import { intersection as intersectionToolkit } from '../../array/intersection.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

export function intersection<T>(...arrays: Array<ArrayLike<T> | null | undefined>): T[] {
  if (arrays.length === 0) {
    return [];
  }

  if (!isArrayLikeObject(arrays[0])) {
    return [];
  }

  let result: T[] = uniq(Array.from(arrays[0]));
  
  for (let i = 1; i < arrays.length; i++) {
    const array = arrays[i];
    
    if (!isArrayLikeObject(array)) {
      return [];
    }
    
    result = intersectionToolkit(result, Array.from(array));
  }

  return result;
}
