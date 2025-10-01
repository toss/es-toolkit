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
export function takeWhile<T>(arr: readonly T[], shouldContinueTaking: (element: T) => boolean): T[] {
  const result: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!shouldContinueTaking(item)) {
      break;
    }

    result.push(item);
  }

  return result;
}
