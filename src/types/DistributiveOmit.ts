/**
 * Removes the given keys from each union member while preserving its remaining properties.
 * Unlike the built-in `Omit`, preserves properties specific to each member.
 * Ignores missing keys and preserves readonly and optional modifiers.
 *
 * @template T - The type to remove properties from.
 * @template K - The keys to remove.
 *
 * @example
 * type Card = { kind: 'card'; cardNo: string; note: string };
 * type Bank = { kind: 'bank'; accountNo: string; note: string };
 * type Payment = DistributiveOmit<Card | Bank, 'note'>;
 * // => { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string }
 */
export type DistributiveOmit<T, K> = T extends unknown ? Pick<T, Exclude<keyof T, K>> : never;
