/**
 * Retrieves elements from an array at the specified indices.
 *
 * This function supports negative indices, which count from the end of the array.
 *
 * @template T
 * @param {readonly T[]} arr - The array to retrieve elements from.
 * @param {number[]} indices - An array of indices specifying the positions of elements to retrieve.
 * @returns {Array<T | undefined>} A new array containing the elements at the specified indices.
 *
 * @example
 * const numbers = [10, 20, 30, 40, 50];
 * const result = at(numbers, [1, 3, 4]);
 * console.log(result); // [20, 40, 50]
 */
export function at<T>(arr: readonly T[], indices: number[]): Array<T | undefined> {
  const result: Array<T | undefined> = [];

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];

    result.push(arr.at(index));
  }

  return result;
}
