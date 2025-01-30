/**
 * Custom implementation of the Array.prototype.reduce function.
 *
 * @template T, U
 * @param {T[]} array - The array to iterate over.
 * @param {(accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U} callback
 *        - The function to execute on each element in the array.
 * @param {U} initialValue - The initial value of the accumulator.
 * @returns {U} The final accumulated value.
 *
 * @example
 * const sum = reduce([1, 2, 3, 4], (acc, cur) => acc + cur, 0);
 * console.log(sum); // 10
 */
export function reduce<T, U>(
  array: T[],
  callback: (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue: U
): U {
  let accumulator = initialValue;

  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}
