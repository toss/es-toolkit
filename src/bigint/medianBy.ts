import { median } from './median.ts';

/**
 * Calculates the median of an array by mapping each element to a bigint.
 *
 * This function maps every element to a bigint and returns the median of those values. Because
 * bigints have no fractional part, the average taken for even-length arrays is truncated toward zero.
 *
 * @template T - The type of elements in the array.
 * @param items - An array of elements to calculate the median of.
 * @param getValue - A function that maps an element to the bigint to use.
 * @returns The median of the mapped bigints.
 * @throws {RangeError} If the array is empty, since there is no bigint that represents "no median".
 *
 * @example
 * const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];
 * const result = medianBy(accounts, account => account.balance);
 * // result will be 20n
 */
export function medianBy<T>(items: readonly T[], getValue: (element: T) => bigint): bigint {
  return median(items.map(item => getValue(item)));
}
