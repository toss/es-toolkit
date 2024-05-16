/**
 * @name sample
 * @description
 * Returns a random element from an array.
 * @param arr The element to get a random element
 */
export function sample<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex];
}