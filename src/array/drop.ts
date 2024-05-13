/**
 * @name drop
 * Drop some elements from an array from the beginning. This function returns a new array.
 * @param arr The element to drop items from the beginning
 * @param itemsCount The amount of elements to drop
 */
export function drop<T>(arr: T[], itemsCount: number) {
  return arr.slice(itemsCount);
}