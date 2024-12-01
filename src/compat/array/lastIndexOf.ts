import { isArrayLike } from '../predicate/isArrayLike';

export function lastIndexOf<T>(array: ArrayLike<T> | null | undefined, searchElement: T, fromIndex?: number): number {
  if (!isArrayLike(array) || array.length === 0) {
    return -1;
  }

  const length = array.length;

  let index = fromIndex ?? length - 1;
  if (fromIndex != null) {
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1);
  }

  return Array.from(array).lastIndexOf(searchElement, index);
}
