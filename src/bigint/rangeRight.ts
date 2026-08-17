import { bigIntRangeLength } from '../_internal/bigIntRangeLength.ts';

/**
 * Returns an array of bigints from `0n` up to, but not including, `end`, in descending order.
 *
 * @param end - The exclusive end of the range.
 * @returns An array of bigints.
 *
 * @example
 * const result = rangeRight(4n);
 * // result will be [3n, 2n, 1n, 0n]
 */
export function rangeRight(end: bigint): bigint[];

/**
 * Returns an array of bigints from `start` up to, but not including, `end`, in descending order.
 *
 * @param start - The inclusive start of the range.
 * @param end - The exclusive end of the range.
 * @returns An array of bigints.
 *
 * @example
 * const result = rangeRight(2n, 5n);
 * // result will be [4n, 3n, 2n]
 */
export function rangeRight(start: bigint, end: bigint): bigint[];

/**
 * Returns an array of bigints from `start` up to, but not including, `end`, incrementing by `step`,
 * in descending order.
 *
 * A negative `step` counts down. If `step` points away from `end`, an empty array is returned.
 *
 * @param start - The inclusive start of the range.
 * @param end - The exclusive end of the range.
 * @param step - The amount to increment by. Must not be `0n`.
 * @returns An array of bigints.
 * @throws {Error} If `step` is `0n`.
 *
 * @example
 * const result = rangeRight(0n, 10n, 2n);
 * // result will be [8n, 6n, 4n, 2n, 0n]
 */
export function rangeRight(start: bigint, end: bigint, step: bigint): bigint[];

/**
 * Returns an array of bigints from `start` up to, but not including, `end`, incrementing by `step`,
 * in descending order.
 *
 * @param start - The exclusive end of the range when called with one argument, otherwise the inclusive start.
 * @param end - The exclusive end of the range.
 * @param step - The amount to increment by. Must not be `0n`.
 * @returns An array of bigints.
 * @throws {Error} If `step` is `0n`.
 */
export function rangeRight(start: bigint, end?: bigint, step = 1n): bigint[] {
  if (end == null) {
    end = start;
    start = 0n;
  }

  if (step === 0n) {
    throw new Error('The step value must be a non-zero bigint.');
  }

  const length = bigIntRangeLength(start, end, step);
  const result = new Array<bigint>(length);

  for (let i = 0; i < length; i++) {
    result[i] = start + BigInt(length - i - 1) * step;
  }

  return result;
}
