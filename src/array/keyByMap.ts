/**
 * Maps each element of an array into a `Map` based on a key-generating function.
 *
 * Unlike {@link keyBy}, the keys can be of any type (including object
 * references), since a `Map` preserves key identity. If multiple elements
 * generate the same key, the last one is used as the value. See issue #1278.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys (any type, including objects).
 * @param arr - The array of elements to be mapped.
 * @param getKeyFromItem - A function that generates a key from an element, its index, and the array.
 * @returns A `Map` where keys are mapped to each element of an array.
 *
 * @example
 * const array = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
 * const result = keyByMap(array, item => item.id);
 * // result.get(2) === { id: 2, name: 'b' }
 *
 * @group array
 */
export function keyByMap<T, K>(
  arr: readonly T[],
  getKeyFromItem: (item: T, index: number, array: readonly T[]) => K
): Map<K, T> {
  const result = new Map<K, T>();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKeyFromItem(item, i, arr);
    result.set(key, item);
  }

  return result;
}
