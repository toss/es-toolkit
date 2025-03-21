import { uniqWith as uniqWithToolkit } from '../../array/uniqWith.ts';
import { uniq as uniqToolkit } from '../array/uniq.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

type Comparator<T> = (a: T, b: T) => boolean;

export function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  return typeof comparator === 'function' ? uniqWithToolkit(Array.from(arr), comparator) : uniqToolkit(Array.from(arr));
}
