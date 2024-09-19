import { ExtractNestedArrayType, flattenDeep } from './flattenDeep.ts';

/**
 * Recursively maps each element in an array using a provided iteratee function and then deeply flattens the resulting array.
 *
 * @template T - The type of elements within the array.
 * @template U - The type of elements within the returned array from the iteratee function.
 * @param {T[]} arr - The array to flatten.
 * @param {(item: T) => U} iteratee - The function that produces the new array elements.
 * @returns {Array<ExtractNestedArrayType<U>>} A new array that has been flattened.
 *
 * @example
 * const result = flatMapDeep([1, 2, 3], n => [[n, n]]);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMapDeep<T, U>(arr: readonly T[], iteratee: (item: T) => U): Array<ExtractNestedArrayType<U>> {
  return flattenDeep(arr.map((item: T) => iteratee(item)));
}
