/**
 * Returns a list of snapshots of the window of the given size sliding along
 * this collection with the given step, where each snapshot is a list.
 *
 * Several last lists may have fewer elements than the given size.
 *
 * Both size and step must be positive and can be greater than the number of elements in this collection.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to window.
 * @param {number} size - The size of the window.
 * @param {number} step - The step of the window. Default is 1.
 * @param {boolean} partialWindows - Whether to include partial windows at the end. Default is false.
 * @returns {T[][]} A list of snapshots of the window of the given size sliding along this collection.
 */
export function windowed<T>(arr: readonly T[], size: number, step: number = 1, partialWindows: boolean = false): T[][] {
  if (size <= 0 || step <= 0 || !Number.isInteger(size) || !Number.isInteger(step)) {
    throw new Error('Size and step must be positive integers.');
  }

  const result: T[][] = [];

  for (let i = 0, end = arr.length; i < end && (partialWindows || i + size <= end); i += step) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
