/**
 * @name uniq
 * @description
 * `uniq` removes duplicated elements from the array given as an argument.
 *
 * It filters out elements with the same value, so duplicates of data types like Objects are not checked.
 *
 * @example
 * ```ts
 * uniq([1, 1, 2, 3, 5, 5, 7, 'foo', 'bar', 'bar']);
 * // [1, 2, 3, 5, 7, 'foo', 'bar']
 * ```
 */
export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
