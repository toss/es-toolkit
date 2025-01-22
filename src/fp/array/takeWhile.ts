import { takeWhile as takeWhileToolkit } from '../../array/takeWhile';

/**
 * Returns a new array containing the leading elements of the provided array
 * that satisfy the provided predicate function. It stops taking elements as soon
 * as an element does not satisfy the predicate.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to process.
 * @param {(element: T) => boolean} shouldContinueTaking - The predicate function that is called with each element. Elements are included in the result as long as this function returns true.
 * @returns {T[]} A new array containing the leading elements that satisfy the predicate.
 *
 * @example
 * // Returns [1, 2]
 * takeWhile([1, 2, 3, 4], x => x < 3);
 *
 * @example
 * // Returns []
 * takeWhile([1, 2, 3, 4], x => x > 3);
 */
export function takeWhile<T>(arr: readonly T[], shouldContinueTaking: (element: T) => boolean): T[];

/**
 * Returns a new array containing the leading elements of the provided array
 * that satisfy the provided predicate function. It stops taking elements as soon
 * as an element does not satisfy the predicate.
 *
 * @template T - The type of elements in the array.
 * @param {(element: T) => boolean} shouldContinueTaking - The predicate function that is called with each element. Elements are included in the result as long as this function returns true.
 * @returns {(arr: T[]) => T[]} A function that receive the array to process as argument and returns a new array containing the leading elements that satisfy the predicate.
 *
 * @example
 * // Returns [1, 2]
 * takeWhile(2, 3, 4], x => x < 3)([1);
 *
 * @example
 * // Returns []
 * takeWhile([1, 2, 3, 4], x => x > 3);
 */
export function takeWhile<T>(shouldContinueTaking: (element: T) => boolean): (arr: readonly T[]) => T[];

export function takeWhile<T>(
  arrOrShouldContinueTaking: readonly T[] | ((element: T) => boolean),
  shouldContinueTaking?: (element: T) => boolean
) {
  if (shouldContinueTaking == null) {
    return (arr: readonly T[]) => takeWhile(arr, arrOrShouldContinueTaking as (element: T) => boolean);
  }

  const arr = arrOrShouldContinueTaking as readonly T[];
  return takeWhileToolkit(arr, shouldContinueTaking);
}
