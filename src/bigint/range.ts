import { bigIntRangeLength } from '../_internal/bigIntRangeLength.ts';

/**
 * Returns an array of bigints from `0n` up to, but not including, `end`.
 *
 * @param end - The exclusive end of the range.
 * @returns An array of bigints.
 *
 * @example
 * const result = range(4n);
 * // result will be [0n, 1n, 2n, 3n]
 */
export function range(end: bigint): bigint[];

/**
 * Returns an array of bigints from `start` up to, but not including, `end`.
 *
 * @param start - The inclusive start of the range.
 * @param end - The exclusive end of the range.
 * @returns An array of bigints.
 *
 * @example
 * const result = range(2n, 5n);
 * // result will be [2n, 3n, 4n]
 */
export function range(start: bigint, end: bigint): bigint[];

/**
 * Returns an array of bigints from `start` up to, but not including, `end`, incrementing by `step`.
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
 * const result = range(0n, 10n, 2n);
 * // result will be [0n, 2n, 4n, 6n, 8n]
 *
 * const countdown = range(5n, 0n, -1n);
 * // countdown will be [5n, 4n, 3n, 2n, 1n]
 */
export function range(start: bigint, end: bigint, step: bigint): bigint[];

/**
 * Returns an array of bigints from `start` up to, but not including, `end`, incrementing by `step`.
 *
 * @param start - The exclusive end of the range when called with one argument, otherwise the inclusive start.
 * @param end - The exclusive end of the range.
 * @param step - The amount to increment by. Must not be `0n`.
 * @returns An array of bigints.
 * @throws {Error} If `step` is `0n`.
 */
export function range(start: bigint, end?: bigint, step = 1n): bigint[] {
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
    result[i] = start + BigInt(i) * step;
  }

  return result;
}
