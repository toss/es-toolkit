/**
 * Groups elements of an array into a `Map` based on a key-generating function.
 *
 * Unlike {@link groupBy}, the keys can be of any type (including object
 * references), since a `Map` preserves key identity rather than coercing keys
 * to strings. See issue #1278.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys (any type, including objects).
 * @param arr - The array of elements to group.
 * @param getKeyFromItem - A function that generates a key from an element, its index, and the array.
 * @returns A `Map` whose keys are the generated keys and whose values are arrays of the corresponding elements.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 * ];
 * const result = groupByMap(array, item => item.category);
 * // result.get('fruit') === [{ category: 'fruit', name: 'apple' }, { category: 'fruit', name: 'banana' }]
 *
 * @group array
 */
export function groupByMap<T, K>(
  arr: readonly T[],
  getKeyFromItem: (item: T, index: number, array: readonly T[]) => K
): Map<K, T[]> {
  const result = new Map<K, T[]>();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKeyFromItem(item, i, arr);
    const group = result.get(key);
    if (group !== undefined) {
      group.push(item);
    } else {
      result.set(key, [item]);
    }
  }

  return result;
}
