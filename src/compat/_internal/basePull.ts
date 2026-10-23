import { hasOwn } from './hasOwn.ts';

/**
 * A copy of `pull` from `es-toolkit/array` that only relies on ES2015 built-ins,
 * so that `es-toolkit/compat` runs on Node.js 6 without changing the main library.
 *
 * @template T
 * @param arr - The array to modify.
 * @param valuesToRemove - The values to remove from the array.
 * @returns The modified array with the specified values removed.
 */
export function basePull<T>(arr: T[], valuesToRemove: readonly unknown[]): T[] {
  const valuesSet = new Set(valuesToRemove);
  let resultIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (valuesSet.has(arr[i])) {
      continue;
    }

    // For handling sparse arrays
    if (!hasOwn(arr, i)) {
      delete arr[resultIndex++];
      continue;
    }

    arr[resultIndex++] = arr[i];
  }

  arr.length = resultIndex;

  return arr;
}
