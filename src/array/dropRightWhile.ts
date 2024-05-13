import { dropWhile } from "./dropWhile";

/**
 * @name dropRightWhile
 * Drop some elements from an array from the end, until `predicate` returns false.
 * @param arr The element to drop items from the end
 * @param canContinueDropping The predicate to check if the function can continue dropping elements.
 */
export function dropRightWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean) {
  const reversed = arr.slice().reverse();
  const dropped = dropWhile(reversed, canContinueDropping);
  return dropped.slice().reverse();
}