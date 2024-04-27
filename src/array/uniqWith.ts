import { uniq } from "./uniq";

/**
 * The `uniqWith` function takes an array as its first argument and a 'comparator' function as the second.
 *
 * It evaluates the elements of the array using the comparator function, and if true is returned, it considers those elements as duplicates and removes them.
 *
 * @example
 * ```ts
 * uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => );
 * // [1, 2, 3, 5, 7]
 * ```
 */
export function uniqWith<T>(
  arr: T[],
  comparator: (item1: T, item2: T) => boolean
): T[] {
  const result: T[] = [];

  for (const element of arr) {
    const isUniq = result.find((v) => comparator(v, element)) == null;
    if (isUniq) {
      result.push(element);
    }
  }

  return result;
}
