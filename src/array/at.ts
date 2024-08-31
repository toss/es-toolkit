/**
 * Retrieves elements from an array at the specified indices.
 *
 * @template T
 * @param {readonly T[]} arr - The array to retrieve elements from.
 * @param {number[]} indices - An array of indices specifying the positions of elements to retrieve.
 * @returns {T[]} A new array containing the elements at the specified indices.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const result = at(numbers, [1, 3, 4]);
 * console.log(result); // [20, 40, 50]
 */
export function at<T>(arr: readonly T[], indices: number[]) {
  const result: T[] = [];

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];

    result.push(arr[index]);
  }

  return result;
}
