/**
 * Removes elements from the end of an array until the predicate returns false.
 *
 * This function iterates over an array from the end and drops elements until the provided
 * predicate function returns false. It then returns a new array with the remaining elements.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array from which to drop elements.
 * @param {(item: T) => boolean} canContinueDropping - A predicate function that determines
 * whether to continue dropping elements. The function is called with each element from the end,
 * and dropping continues as long as it returns true.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = dropRightWhile(array, x => x > 3);
 * // result will be [1, 2, 3] since elements greater than 3 are dropped from the end.
 */
export function dropRightWhile<T>(arr: readonly T[], canContinueDropping: (item: T) => boolean): T[] {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!canContinueDropping(arr[i])) {
      return arr.slice(0, i + 1);
    }
  }

  return [];
}
