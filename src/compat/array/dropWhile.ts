/**
 * Removes elements from the beginning of an array until the predicate returns false.
 *
 * This function iterates over an array and drops elements from the start until the provided
 * predicate function returns false. It then returns a new array with the remaining elements.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which to drop elements.
 * @param {(item: T, index: number, arr: T[]) => unknown} canContinueDropping - A predicate function that determines
 * whether to continue dropping elements. The function is called with each element, index, and array, and dropping
 * continues as long as it returns true.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [1, 2, 3];
 * const result = dropWhile(array, (item, index, arr) => index < 2);
 * // Returns: [3]
 */
export function dropWhile<T>(
  arr: readonly T[],
  canContinueDropping: (item: T, index: number, arr: readonly T[]) => unknown
): T[] {
  const dropEndIndex = arr.findIndex((item, index, arr) => !canContinueDropping(item, index, arr));
  if (dropEndIndex === -1) {
    return [];
  }

  return arr.slice(dropEndIndex);
}
