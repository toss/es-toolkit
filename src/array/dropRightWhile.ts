import { dropWhile } from './dropWhile';

/**
 * Removes elements from the end of an array until the predicate returns false.
 *
 * This function iterates over an array from the end and drops elements until the provided
 * predicate function returns false. It then returns a new array with the remaining elements.
 *
 * @param {T[]} arr - The array from which to drop elements.
 * @param {function(item: T): boolean} canContinueDropping - A predicate function that determines
 * whether to continue dropping elements. The function is called with each element from the end,
 * and dropping continues as long as it returns true.
 * @returns {T[]} A new array with the elements remaining after the predicate returns false.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = dropRightWhile(array, x => x > 3);
 * // result will be [1, 2, 3] since elements greater than 3 are dropped from the end.
 */
export function dropRightWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean) {
  const reversed = arr.slice().reverse();
  const dropped = dropWhile(reversed, canContinueDropping);
  return dropped.slice().reverse();
}
