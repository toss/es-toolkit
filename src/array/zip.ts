import { zipWith } from "./zipWith";

/**
 * Merges multiple arrays element-wise. Returns an array where each element is an array containing
 * elements from the input arrays at the corresponding index.
 * 
 * @param {T[]} arr1 - The first array to be zipped.
 * @param {T[]} arr2 - The second array to be zipped.
 * @param {T[]} arr3 - The third array to be zipped.
 * @param {T[]} arr4 - The fourth array to be zipped.
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


