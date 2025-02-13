import { takeRightWhile as takeRightWhileToolkit } from '../../array/takeRightWhile';

/**
 * Takes elements from the end of the array while the predicate function returns `true`.
 *
 * @template T - Type of elements in the input array.
 *
 * @param {T[]} arr - The array to take elements from.
 * @param {(item: T) => boolean} shouldContinueTaking - The function invoked per element.
 * @returns {T[]} A new array containing the elements taken from the end while the predicate returns `true`.
 *
 * @example
 * // Returns [3, 2, 1]
 * takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
 *
 * @example
 * // Returns []
 * takeRightWhile([1, 2, 3], n => n > 3);
 */
export function takeRightWhile<T>(arr: readonly T[], shouldContinueTaking: (item: T) => boolean): T[];

/**
 * Takes elements from the end of the array while the predicate function returns `true`.
 *
 * @template T - Type of elements in the input array.
 *
 * @param {(item: T) => boolean} shouldContinueTaking - The function invoked per element.
 * @returns {(arr: T[]) => T[]} A function that receive the array to take elements from as argument and returns a new array containing the elements taken from the end while the predicate returns `true`.
 *
 * @example
 * // Returns [3, 2, 1]
 * takeRightWhile(4, 3, 2, 1], n => n < 4)([5);
 *
 * @example
 * // Returns []
 * takeRightWhile([1, 2, 3], n => n > 3);
 */
export function takeRightWhile<T>(shouldContinueTaking: (item: T) => boolean): (arr: readonly T[]) => T[];

export function takeRightWhile<T>(
  arrOrShouldContinueTaking: readonly T[] | ((item: T) => boolean),
  shouldContinueTaking?: (item: T) => boolean
) {
  if (shouldContinueTaking == null) {
    return (arr: readonly T[]) => takeRightWhile(arr, arrOrShouldContinueTaking as (item: T) => boolean);
  }

  const arr = arrOrShouldContinueTaking as readonly T[];
  return takeRightWhileToolkit(arr, shouldContinueTaking);
}
