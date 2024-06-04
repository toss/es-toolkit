import { uniq } from './uniq';
import { uniqWith } from './uniqWith';

/**
 * The `uniqBy` function takes an array as its first argument and a 'converter' function as the second. It maps the array elements using the converter function, then removes any duplicates.
 *
 * It filters out elements with the same value, meaning it does not check for duplicates in data types like Objects.
 *
 * @example
 * ```ts
 * uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
 * // [1.2, 2.1, 3.3, 5.7, 7.19]
 * ```
 */
export function uniqBy<T, U>(arr: T[], converter: (item: T) => U): T[] {
  return uniqWith(arr, (item1, item2) => converter(item1) === converter(item2));
}
