/**
 * Calculates the sum of an array of numbers when applying
 * the `getValue` function to each element.
 *
 * If the array is empty, this function returns `0`.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items An array to calculate the sum.
 * @param {(element: T) => number} getValue A function that selects a numeric value from each element.
 * @returns {number} The sum of all the numbers as determined by the `getValue` function.
 *
 * @example
 * sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // Returns: 6
 * sumBy([], x => x.a); // Returns: 0
 */
export function sumBy<T>(items: readonly T[], getValue: (element: T) => number): number {
  let result = 0;

  for (let i = 0; i < items.length; i++) {
    result += getValue(items[i]);
  }

  return result;
}
