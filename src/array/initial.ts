/**
 * Returns a new array containing all elements except the last one from the input array.
 * If the input array is empty or has only one element, the function returns an empty array.
 *
 * @template T The type of elements in the array.
 * @param {T[]} arr - The input array to query.
 * @returns {T[]} A new array containing all but the last element of the input array.
 *
 * @example
 * const arr = [1, 2, 3, 4];
 * const newArr = initial(arr);
 * // newArr will be [1, 2, 3]
 *
 * @example
 * const emptyArr: number[] = [];
 * const newEmptyArr = initial(emptyArr);
 * // newEmptyArr will be []
 *
 * @example
 * const singleElementArr = ['only one'];
 * const newSingleElementArr = initial(singleElementArr);
 * // newSingleElementArr will be []
 */
export function initial<T>(arr: readonly T[]): T[] {
  return arr.slice(0, -1);
}
