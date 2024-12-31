/**
 * Groups the elements of an array based on a provided key-generating function or property key.
 *
 * This function takes an array and either a function that generates a key from each element or a
 * string property key. It returns an object where the keys are the generated keys and the values
 * are arrays of elements that share the same key.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {T[]} arr - The array to group.
 * @param {((item: T) => K) | keyof T} keyOrFn - Either a function that generates a key from an element,
 *                                               or a string property key to group by.
 * @returns {Record<K, T[]>} An object where each key is associated with an array of elements that
 * share that key.
 *
 * @example
 * // Using a key-generating function:
 * const array1 = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result1 = groupBy(array1, item => item.category);
 * // result1 will be:
 * // {
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 *
 * // Using a property key:
 * const result2 = groupBy(array1, 'category');
 * // result2 will be identical to result1
 */
export function groupBy<T, K extends PropertyKey>(
  arr: readonly T[],
  keyOrFn: ((item: T) => K) | keyof T
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  const getKey = typeof keyOrFn === 'function' ? keyOrFn : (item: T) => item[keyOrFn] as unknown as K;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKey(item);

    if (!Object.hasOwn(result, key)) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
}
