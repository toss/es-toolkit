/**
 * Returns a random element from an array.
 *
 * This function takes an array and returns a single element selected randomly from the array.
 *
 * @param {T[]} arr - The array to sample from.
 * @returns {T} A random element from the array.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const randomElement = sample(array);
 * // randomElement will be one of the elements from the array, selected randomly.
 */
export function sample<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
