/**
 * @name dropWhile
 * Drop some elements from an array from the beginning, until `predicate` returns false.
 * @param arr The element to drop items from the beginning
 * @param canContinueDropping The predicate to check if the function can continue dropping elements.
 */
export function dropWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean) {
  const dropEndIndex = arr.findIndex(item => !canContinueDropping(item));
  return arr.slice(dropEndIndex);
}