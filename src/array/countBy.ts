/**
 * Count the occurrences of each item in an array
 * based on a transformation function.
 *
 * This function takes an array and a transformation function
 * that converts each item in the array to a key. It then
 * counts the occurrences of each transformed item and returns
 * an object with the transformed items as keys and the counts
 * as values.
 *
 * @template T - The type of the items in the input array.
 * @template K - The type of keys.
 * @param {T[]} arr - The input array to count occurrences.
 * @param {(item: T) => K} mapper - The transformation function that maps each item to a key.
 * @returns {Record<K, number>} An object containing the transformed items as keys and the
 * counts as values.
 *
 * @example
 * const array = ['a', 'b', 'c', 'a', 'b', 'a'];
 * const result = countBy(array, x => x);
 * // result will be { a: 3, b: 2, c: 1 }
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = countBy(array, item => item % 2 === 0 ? 'even' : 'odd');
 * // result will be { odd: 3, even: 2 }
 */
export function countBy<T, K extends PropertyKey>(arr: readonly T[], mapper: (item: T) => K): Record<K, number> {
  const result = {} as Record<K, number>;

  for (const item of arr) {
    const key = mapper(item);

    result[key] = (result[key] ?? 0) + 1;
  }

  return result;
}
