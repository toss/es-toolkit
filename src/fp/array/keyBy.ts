import { keyBy as keyByToolkit } from '../../array/keyBy';

/**
 * Maps each element of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * an object where the keys are the generated keys and the values are the corresponding elements.
 * If there are multiple elements generating the same key, the last element among them is used
 * as the value.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {T[]} arr - The array of elements to be mapped.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {Record<K, T>} An object where keys are mapped to each element of an array.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = keyBy(array, item => item.category);
 * // result will be:
 * // {
 * //   fruit: { category: 'fruit', name: 'banana' },
 * //   vegetable: { category: 'vegetable', name: 'carrot' }
 * // }
 */
export function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T>;

/**
 * Maps each element of an array based on a provided key-generating function.
 *
 * This function takes an array and a function that generates a key from each element. It returns
 * an object where the keys are the generated keys and the values are the corresponding elements.
 * If there are multiple elements generating the same key, the last element among them is used
 * as the value.
 *
 * @template T - The type of elements in the array.
 * @template K - The type of keys.
 * @param {(item: T) => K} getKeyFromItem - A function that generates a key from an element.
 * @returns {(arr: T[]) => Record<K, T>} A function that receive the array of elements to be mapped as argument and returns an object where keys are mapped to each element of an array.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = keyBy(item => item.category)(array);
 * // result will be:
 * // {
 * //   fruit: { category: 'fruit', name: 'banana' },
 * //   vegetable: { category: 'vegetable', name: 'carrot' }
 * // }
 */
export function keyBy<T, K extends PropertyKey>(getKeyFromItem: (item: T) => K): (arr: readonly T[]) => Record<K, T>;

export function keyBy<T, K extends PropertyKey>(
  arrOrGetKeyFromItem: readonly T[] | ((item: T) => K),
  getKeyFromItem?: (item: T) => K
) {
  if (getKeyFromItem == null) {
    return (arr: readonly T[]) => keyBy(arr, arrOrGetKeyFromItem as (item: T) => K);
  }

  const arr = arrOrGetKeyFromItem as readonly T[];
  return keyByToolkit(arr, getKeyFromItem);
}
