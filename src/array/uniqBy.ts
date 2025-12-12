/**
 * Returns a new array containing only the unique elements from the original array,
 * based on either:
 *
 * - the value of a given property key, or
 * - the value returned by the selector function.
 *
 * When duplicates are found, the first occurrence is kept and the rest are discarded.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of the value returned by the selector.
 * @param {readonly T[]} arr - The array to process.
 * @param {((item: T) => U) | keyof T} selector - Either:
 *  - a function that selects the value used to determine uniqueness, or
 *  - a property key of `T` used to determine uniqueness.
 * @returns {T[]} A new array containing only the unique elements from the original array.
 *
 * @example
 * // Using a selector function
 * uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
 * // [1.2, 2.1, 3.2, 5.7, 7.19]
 * @example
 * // Using a property key
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 * ];
 *
 * uniqBy(array, 'category');
 * // [
 * //   { category: 'fruit', name: 'apple' },
 * //   { category: 'vegetable', name: 'carrot' },
 * // ]
 */
export function uniqBy<T, U>(arr: readonly T[], selector: ((item: T) => U) | keyof T): T[] {
  const map = new Map<U | T[keyof T], T>();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    const key = typeof selector === 'function' ? selector(item) : item[selector];

    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}
