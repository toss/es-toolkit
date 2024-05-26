/**
 * Combines multiple arrays into a single array of tuples.
 * 
 * This function takes multiple arrays and returns a new array where each element is a tuple 
 * containing the corresponding elements from the input arrays. If the input arrays are of 
 * different lengths, the resulting array will have the length of the longest input array, 
 * with undefined values for missing elements.
 *
 * @param {...T[][]} arrs - The arrays to zip together.
 * @returns {T[][]} A new array of tuples containing the corresponding elements from the input arrays.
 *
 * @example
 * const arr1 = [1, 2, 3];
 * const arr2 = ['a', 'b', 'c'];
 * const result = zip(arr1, arr2);
 * // result will be [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * const arr3 = [true, false];
 * const result2 = zip(arr1, arr2, arr3);
 * // result2 will be [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]
 */
export function zip<T>(arr1: T[]): [T][];
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][];
export function zip<T, U, V>(arr1: T[], arr2: U[], arr3: V[]): [T, U, V][];
export function zip<T, U, V, W>(arr1: T[], arr2: U[], arr3: V[], arr4: W[]): [T, U, V, W][];
export function zip<T>(...arrs: T[][]): T[][] {
  const result: T[][] = [];

  const maxIndex = Math.max(...arrs.map(x => x.length));

  for (let i = 0; i < maxIndex; i++) {
    const element: T[] = [];

    for (const arr of arrs) {
      element.push(arr[i]);
    }

    result.push(element);
  }

  return result;
}
