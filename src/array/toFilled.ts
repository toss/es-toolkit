/**
 * Creates a new array filled with the specified value from the start position up to, but not including, the end position.
 * This function does not mutate the original array.
 *
 * @template T - The type of elements in the original array.
 * @template U - The type of the value to fill the new array with.
 * @param {Array<T>} arr - The array to base the new array on.
 * @param {U} value - The value to fill the new array with.
 * @param {number} [start=0] - The start position. Defaults to 0.
 * @param {number} [end=arr.length] - The end position. Defaults to the array's length.
 * @returns {Array<T | U>} The new array with the filled values.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * let result = toFilled(array, '*', 2);
 * console.log(result); // [1, 2, '*', '*', '*']
 * console.log(array); // [1, 2, 3, 4, 5]
 *
 * result = toFilled(array, '*', 1, 4);
 * console.log(result); // [1, '*', '*', '*', 5]
 * console.log(array); // [1, 2, 3, 4, 5]
 *
 * result = toFilled(array, '*');
 * console.log(result); // ['*', '*', '*', '*', '*']
 * console.log(array); // [1, 2, 3, 4, 5]
 *
 * result = toFilled(array, '*', -4, -1);
 * console.log(result); // [1, '*', '*', '*', 5]
 * console.log(array); // [1, 2, 3, 4, 5]
 */

export function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
export function toFilled<T, U>(arr: T[], value: U, start = 0, end = arr.length): Array<T | U> {
  const length = arr.length;
  const finalStart = Math.max(start >= 0 ? start : length + start, 0);
  const finalEnd = Math.min(end >= 0 ? end : length + end, length);

  const newArr: Array<T | U> = arr.slice();

  for (let i = finalStart; i < finalEnd; i++) {
    newArr[i] = value;
  }

  return newArr;
}
