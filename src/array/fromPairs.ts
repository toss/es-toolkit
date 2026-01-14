/**
 * Converts an array of key-value pairs into an object.
 *
 * This function takes an array of key-value pairs and returns a new object where the first element
 * of each pair is used as the key and the second element is used as the value.
 *
 * @template K - The type of the keys in the pairs. Must extend PropertyKey (string, number, or symbol).
 * @template V - The type of the values in the pairs.
 * @param {ReadonlyArray<readonly [K, V]>} pairs - An array of key-value pairs.
 * @returns {Record<K, V>} - A new object composed of the given key-value pairs.
 *
 * @example
 * const pairs = [['a', 1], ['b', 2], ['c', 3]] as const;
 * const result = fromPairs(pairs);
 * // result will be { a: 1, b: 2, c: 3 }
 *
 */
export function fromPairs<K extends PropertyKey, V>(pairs: ReadonlyArray<readonly [K, V]>): Record<K, V> {
  const result = {} as Record<K, V>;

  for (let i = 0; i < pairs.length; i++) {
    const [key, value] = pairs[i];
    result[key] = value;
  }

  return result;
}
