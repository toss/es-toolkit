/**
 * Normalizes `-0` to `0` to match Lodash, which normalizes `-0` to `+0` in the
 * results of functions like `uniq`, `union`, and `difference`.
 *
 * @param value - The value to normalize.
 * @returns The value with `-0` normalized to `0`.
 */
export function normalizeZero<T>(value: T): T {
  return value === 0 ? (0 as T) : value;
}
