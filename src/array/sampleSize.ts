import { randomInt } from '../math';

/**
 * Returns a sample element array of a specified `size`.
 *
 * This function takes an array and a number, and returns an array containing the sampled elements using Floyd's algorithm.
 *
 * {@link https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html Floyd's algoritm}
 *
 * @param {T[]} array - The array to sample from.
 * @param {number} size - The size of sample.
 * @returns {T[]} A new array with sample size applied.
 * @throws {Error} Throws an error if `size` is greater than the length of `array`.
 *
 * @example
 * const result = sampleSize([1, 2, 3], 2)
 * // result will be an array containing two of the elements from the array.
 * // [1, 2] or [1, 3] or [2, 3]
 */
export function sampleSize<T>(array: readonly T[], size: number): T[] {
  if (size > array.length) {
    throw new Error('Size must be less than or equal to the length of array.');
  }

  const result = new Array(size);
  const selected = new Set();

  for (let step = array.length - size, resultIndex = 0; step < array.length; step++, resultIndex++) {
    let index = randomInt(0, step + 1);

    if (selected.has(index)) {
      index = step;
    }

    selected.add(index);

    result[resultIndex] = array[index];
  }

  return result;
}
