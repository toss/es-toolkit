/**
 * Randomizes the order of elements in an array using the Fisher-Yates algorithm.
 *
 * This function takes an array and returns a new array with its elements shuffled in a random order.
 *
 * @param {T[]} arr - The array to shuffle.
 * @returns {T[]} A new array with its elements shuffled in random order.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const shuffledArray = shuffle(array);
 * // shuffledArray will be a new array with elements of array in random order, e.g., [3, 1, 4, 5, 2]
 */
export function shuffle<T>(arr: T[]): T[] {
  /**
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   */
  for (let i = arr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
