/**
 * Calculates how many elements a bigint range from `start` (inclusive) to `end` (exclusive) contains.
 *
 * This mirrors `Math.ceil((end - start) / step)` from the `number` implementations, but performs the
 * ceiling division with bigint arithmetic. Returns `0` when `step` points away from `end`.
 *
 * @param start - The start of the range.
 * @param end - The end of the range.
 * @param step - A non-zero step value.
 * @returns The number of elements in the range.
 */
export function bigIntRangeLength(start: bigint, end: bigint, step: bigint): number {
  const difference = end - start;

  if (step > 0n) {
    return difference <= 0n ? 0 : Number((difference + step - 1n) / step);
  }

  return difference >= 0n ? 0 : Number((difference + step + 1n) / step);
}
