/**
 * Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.
 *
 * @template T
 * @param {readonly T[]} arr1 - The array to take the product of.
 * @returns {Array<[T]>} An array of single-element tuples.
 */
export function cartesianProduct<T>(arr1: readonly T[]): Array<[T]>;

/**
 * Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.
 *
 * @template T, U
 * @param {readonly T[]} arr1 - The first array to take the product of.
 * @param {readonly U[]} arr2 - The second array to take the product of.
 * @returns {Array<[T, U]>} An array of tuples representing the Cartesian product.
 *
 * @example
 * cartesianProduct([1, 2], ['a', 'b']);
 * // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
export function cartesianProduct<T, U>(arr1: readonly T[], arr2: readonly U[]): Array<[T, U]>;

/**
 * Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.
 *
 * @template T, U, V
 * @param {readonly T[]} arr1 - The first array to take the product of.
 * @param {readonly U[]} arr2 - The second array to take the product of.
 * @param {readonly V[]} arr3 - The third array to take the product of.
 * @returns {Array<[T, U, V]>} An array of tuples representing the Cartesian product.
 */
export function cartesianProduct<T, U, V>(arr1: readonly T[], arr2: readonly U[], arr3: readonly V[]): Array<[T, U, V]>;

/**
 * Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.
 *
 * @template T, U, V, W
 * @param {readonly T[]} arr1 - The first array to take the product of.
 * @param {readonly U[]} arr2 - The second array to take the product of.
 * @param {readonly V[]} arr3 - The third array to take the product of.
 * @param {readonly W[]} arr4 - The fourth array to take the product of.
 * @returns {Array<[T, U, V, W]>} An array of tuples representing the Cartesian product.
 */
export function cartesianProduct<T, U, V, W>(
  arr1: readonly T[],
  arr2: readonly U[],
  arr3: readonly V[],
  arr4: readonly W[]
): Array<[T, U, V, W]>;

/**
 * Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.
 *
 * Returns every possible tuple formed by picking one element from each input array, in lexicographic order.
 * The rightmost array advances fastest, like the digits of an odometer.
 *
 * If no arrays are passed, the result is `[[]]` (a single empty tuple).
 * If any input array is empty, the result is `[]`.
 *
 * @template T
 * @param {Array<readonly T[]>} arrs - The arrays to take the product of.
 * @returns {T[][]} An array of tuples representing the Cartesian product.
 *
 * @example
 * cartesianProduct([1, 2], ['a', 'b']);
 * // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 *
 * @example
 * cartesianProduct([0, 1], [0, 1], [0, 1]);
 * // => [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
 *
 * @example
 * cartesianProduct([1, 2, 3], []);
 * // => []
 *
 * @example
 * cartesianProduct();
 * // => [[]]
 */
export function cartesianProduct<T>(...arrs: Array<readonly T[]>): T[][];

export function cartesianProduct<T>(...arrs: Array<readonly T[]>): T[][] {
  if (arrs.length === 0) {
    return [[]];
  }

  let total = 1;
  for (let i = 0; i < arrs.length; i++) {
    total *= arrs[i].length;
  }

  if (total === 0) {
    return [];
  }

  const n = arrs.length;
  const result: T[][] = Array(total);

  for (let i = 0; i < total; i++) {
    const tuple: T[] = Array(n);
    let idx = i;
    for (let j = n - 1; j >= 0; j--) {
      const arr = arrs[j];
      const len = arr.length;
      tuple[j] = arr[idx % len];
      idx = Math.floor(idx / len);
    }
    result[i] = tuple;
  }

  return result;
}
