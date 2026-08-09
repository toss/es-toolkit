/**
 * Calculates the sum of an array by mapping each element to a bigint.
 *
 * This function takes an array and a function that maps each element to a bigint,
 * and returns the sum of the mapped values. An empty array returns `0n`.
 *
 * @template T - The type of elements in the array.
 * @param items - An array of elements to be summed.
 * @param getValue - A function that maps an element to the bigint to add.
 * @returns The sum of the mapped bigints. Returns `0n` for an empty array.
 *
 * @example
 * const items = [{ balance: 10n }, { balance: 20n }, { balance: 30n }];
 * const result = sumBy(items, item => item.balance);
 * // result will be 60n
 */
export function sumBy<T>(items: readonly T[], getValue: (element: T, index: number) => bigint): bigint {
  let result = 0n;

  for (let i = 0; i < items.length; i++) {
    result += getValue(items[i], i);
  }

  return result;
}
