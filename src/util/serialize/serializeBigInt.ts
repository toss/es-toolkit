/**
 * Serializes a bigint into a string with an `n` suffix, like a bigint literal.
 *
 * @param value - The bigint to serialize.
 * @returns The serialized string.
 *
 * @example
 * serializeBigInt(123n); // "123n"
 */
export function serializeBigInt(value: bigint): string {
  return `${value}n`;
}
