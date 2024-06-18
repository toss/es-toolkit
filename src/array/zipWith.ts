/**
 * Combines multiple arrays into a single array using a custom combiner function.
 *
 * This function takes multiple arrays and a combiner function, and returns a new array where each element
 * is the result of applying the combiner function to the corresponding elements of the input arrays.
 *
 * @param {T[]} arr1 - The first array to zip.
 * @param {U[]} [arr2] - The second array to zip (optional).
 * @param {V[]} [arr3] - The third array to zip (optional).
 * @param {W[]} [arr4] - The fourth array to zip (optional).
 * @param {(...items: T[]) => R} combine - The combiner function that takes corresponding elements from each array and returns a single value.
 * @returns {R[]} A new array where each element is the result of applying the combiner function to the corresponding elements of the input arrays.
 *
 * @example
 * // Example usage with two arrays:
 * const arr1 = [1, 2, 3];
 * const arr2 = [4, 5, 6];
 * const result = zipWith(arr1, arr2, (a, b) => a + b);
 * // result will be [5, 7, 9]
 *
 * @example
 * // Example usage with three arrays:
 * const arr1 = [1, 2];
 * const arr2 = [3, 4];
 * const arr3 = [5, 6];
 * const result = zipWith(arr1, arr2, arr3, (a, b, c) => `${a}${b}${c}`);
 * // result will be [`135`, `246`]
 */
export function zipWith<T, R>(arr1: readonly T[], combine: (item: T) => R): R[];
export function zipWith<T, U, R>(arr1: readonly T[], arr2: readonly U[], combine: (item1: T, item2: U) => R): R[];
export function zipWith<T, U, V, R>(
  arr1: readonly T[],
  arr2: readonly U[],
  arr3: readonly V[],
  combine: (item1: T, item2: U, item3: V) => R
): R[];
export function zipWith<T, U, V, W, R>(
  arr1: readonly T[],
  arr2: readonly U[],
  arr3: readonly V[],
  arr4: readonly W[],
  combine: (item1: T, item2: U, item3: V, item4: W) => R
): R[];
export function zipWith<T, R>(arr1: readonly T[], ...rest: any[]): R[] {
  const arrs = [arr1, ...rest.slice(0, -1)];
  const combine = rest[rest.length - 1] as (...items: T[]) => R;

  const result: R[] = [];
  const maxIndex = Math.max(...arrs.map(arr => arr.length));

  for (let i = 0; i < maxIndex; i++) {
    const elements: T[] = arrs.map(arr => arr[i]);
    result.push(combine(...elements));
  }

  return result;
}
