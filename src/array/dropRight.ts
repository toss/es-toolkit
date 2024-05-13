/**
 * @name dropRight
 * Drop some elements from an array from the end. This function returns a new array.
 * @param arr The element to drop items from the end
 * @param itemsCount The amount of elements to drop
 */
export function dropRight<T>(arr: T[], itemsCount: number) {
  return arr.slice(0, -itemsCount);
}