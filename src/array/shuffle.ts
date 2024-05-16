/**
 * @name shuffle
 * @description
 * Randomize the order of an array.
 * @param arr The array to shuffle
 */
export function shuffle<T>(arr: T[]): T[] {
  /**
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   */
  for (let i = arr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * i);
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}