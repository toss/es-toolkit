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
export function sumBy<T>(items: readonly T[], getValue: (element: T) => number): number;

/**
 * Calculates the sum of an array of bigints when applying
 * the `getValue` function to each element.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items An array to calculate the sum.
 * @param {(element: T) => bigint} getValue A function that selects a bigint value from each element.
 * @returns {bigint | number} The sum of all the bigints as determined by the `getValue` function. If `items` is empty, this function returns `0` as a `number`.
 *
 * @example
 * sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a); // Returns: 6n
 *
 * const people: { name: string; age: number; id: bigint }[] = [];
 * sumBy(people, x => x.age); // Returns: 0
 */
export function sumBy<T>(items: readonly T[], getValue: (element: T) => bigint): bigint | number;

export function sumBy<T>(items: readonly T[], getValue: (element: T) => number | bigint): number | bigint {
  if (!items || items.length === 0) {
    return 0;
  }

  let result: any = getValue(items[0]);

  for (let i = 1; i < items.length; i++) {
    result += getValue(items[i]);
  }

  return result;
}
