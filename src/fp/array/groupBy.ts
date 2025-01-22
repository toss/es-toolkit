import { groupBy as groupByToolkit } from '../../array/groupBy';

/**
 * Groups the elements of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * an object where the keys are the generated keys and the values are arrays of elements that share
 * the same key.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {T[]} arr - The array to group.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {Record<K, T[]>} An object where each key is associated with an array of elements that
 * share that key.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = groupBy(array, item => item.category);
 * // result will be:
 * // {
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 */
export function groupBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T[]>;

/**
 * Groups the elements of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * an object where the keys are the generated keys and the values are arrays of elements that share
 * the same key.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {(arr: T[]) => Record<K, T[]>} A function that receive the array to group as argument and returns an object where each key is associated with an array of elements that.
 * share that key.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = groupBy(item => item.category)(array);
 * // result will be:
 * // {
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 */
export function groupBy<T, K extends PropertyKey>(
  getKeyFromItem: (item: T) => K
): (arr: readonly T[]) => Record<K, T[]>;

export function groupBy<T, K extends PropertyKey>(
  arrOrGetKeyFromItem: readonly T[] | ((item: T) => K),
  getKeyFromItem?: (item: T) => K
) {
  if (getKeyFromItem == null) {
    return (arr: readonly T[]) => groupBy(arr, arrOrGetKeyFromItem as (item: T) => K);
  }

  const arr = arrOrGetKeyFromItem as readonly T[];
  return groupByToolkit(arr, getKeyFromItem);
}
