/**
 * Returns new array of index search of the original array and change original array.
 *
 * @template T - The type of elements of array.
 * @param {T[]} arr - The original array to pullAt.
 * @param {number[]} indexes - The array for index search of the original array to pullAt.
 * @returns {T[]} - A new array with pullAt
 * @example
 * const arr = ['%', { a: '2' }, '3', '5', '6'];
 * const result = pullAt(arr, [1, 3]);
 * // result will be new array with pullAt
 * // arr: ['%', '3', '6'];
 * // result: [{ a: '2' }, '5']
 */
export function pullAt<T>(arr: T[], indexes: number[]): (T | undefined)[] {
  const result: (T | undefined)[] = [];

  for (const index of indexes) {
    result.push(arr[index]);
  }

  for (const value of result) {
    if (typeof value !== 'undefined' && arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    }
  }

  return result;
}
