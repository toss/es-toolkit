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
export function takeRightWhile<T>(arr: readonly T[], shouldContinueTaking: (item: T) => boolean): T[] {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!shouldContinueTaking(arr[i])) {
      return arr.slice(i + 1);
    }
  }

  return arr.slice();
}
