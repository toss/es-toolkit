import { uniq as uniqToolkit } from '../array/uniq.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';

type Comparator<T> = (a: T, b: T) => boolean;

/**
 * This method is like `uniq`, except that it accepts a `comparator` which is used to determine the equality of elements.
 *
 * It creates a duplicate-free version of an array, in which only the first occurrence of each element is kept.
 * If a `comparator` is provided, it will be invoked with two arguments: `(arrVal, othVal)` to compare elements.
 * If no comparator is provided, shallow equality is used.
 *
 * The order of result values is determined by the order they appear in the input array.
 *
 * @template T - The type of elements in the array.
 * @param arr  - The array to process.
 * @param [comparator] - Optional function to compare elements for equality.
 * @returns A new array with only unique values based on the comparator.
 *
 * @example
 * const array = [1, 2, 2, 3];
 * const result = uniqWith(array);
 * // result will be [1, 2, 3]
 *
 * const array = [1, 2, 3];
 * const result = uniqWith(array, (a, b) => a % 2 === b % 2)
 * // result will be [1, 2]
 */
export function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[] {
  if (!isArrayLike(arr)) {
    return [];
  }

  if (typeof comparator !== 'function') {
    return uniqToolkit(arr);
  }

  const result: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    let isUniq = true;

    for (let j = 0; j < result.length; j++) {
      if (comparator(item, result[j])) {
        isUniq = false;
        break;
      }
    }

    if (isUniq) {
      result.push(item);
    }
  }

  return result;
}
