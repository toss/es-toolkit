/**
 * Calculates the sum of an array of bigints when applying
 * the `getValue` function to each element.
 *
 * If the array is empty, this function returns `0n`.
 *
 * @template T - The type of elements in the array.
 * @param {readonly T[]} items - An array to calculate the sum.
 * @param {(element: T, index: number) => bigint} getValue - A function that selects a bigint value from each element.
 *   It receives the element and its zero-based index in the array.
 * @returns {bigint} The sum of all the bigints as determined by the `getValue` function.
 *
 * @example
 * sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], (x, i) => x.a * BigInt(i)); // Returns: 8n
 * sumBy([], () => 1n); // Returns: 0n
 */
export function sumBy<T>(items: readonly T[], getValue: (element: T, index: number) => bigint): bigint {
  let result = 0n;

  for (let i = 0; i < items.length; i++) {
    result += getValue(items[i], i);
  }

  return result;
}
