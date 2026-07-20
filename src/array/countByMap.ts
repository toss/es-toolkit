/**
 * Counts the occurrences of each item in an array into a `Map`, based on a
 * transformation function.
 *
 * Unlike {@link countBy}, the keys can be of any type (including object
 * references), since a `Map` preserves key identity. See issue #1278.
 *
 * @template T - The type of the items in the input array.
 * @template K - The type of keys (any type, including objects).
 * @param arr - The input array to count occurrences.
 * @param mapper - The transformation function that maps each item, its index, and the array to a key.
 * @returns A `Map` containing the transformed items as keys and the counts as values.
 *
 * @example
 * const array = ['a', 'b', 'c', 'a', 'b', 'a'];
 * const result = countByMap(array, x => x);
 * // result.get('a') === 3, result.get('b') === 2, result.get('c') === 1
 *
 * @group array
 */
export function countByMap<T, K>(
  arr: readonly T[],
  mapper: (item: T, index: number, array: readonly T[]) => K
): Map<K, number> {
  const result = new Map<K, number>();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = mapper(item, i, arr);
    result.set(key, (result.get(key) ?? 0) + 1);
  }

  return result;
}
