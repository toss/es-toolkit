import { unzip as unzipToolkit } from '../../array/unzip.ts';
import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

export function unzip<T>(array: T[][] | ArrayLike<ArrayLike<T>> | null | undefined): T[][] {
  if (!isArrayLikeObject(array) || !array.length) {
    return [];
  }
  if (Array.isArray(array)) {
    return unzipToolkit(array);
  }
  return unzipToolkit(Array.from(array, value => Array.from(value)));
}
