/**
 * Removes all specified values from an array.
 *
 * This function changes `arr` in place.
 * If you want to remove values without modifying the original array, use `difference`.
 *
 * @template T, U
 * @param {T[]} arr - The array to modify.
 * @param {unknown[]} valuesToRemove - The values to remove from the array.
 * @returns {T[]} The modified array with the specified values removed.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 2, 4];
 * pull(numbers, [2, 4]);
 * console.log(numbers); // [1, 3, 5]
 */
export function pull<T>(arr: T[], valuesToRemove: readonly unknown[]): T[] {
  const valuesSet = new Set(valuesToRemove);
  let resultIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (valuesSet.has(arr[i])) {
      continue;
    }

    // For handling sparse arrays
    if (!Object.hasOwn(arr, i)) {
      delete arr[resultIndex++];
      continue;
    }

    arr[resultIndex++] = arr[i];
  }

  arr.length = resultIndex;

  return arr;
}
