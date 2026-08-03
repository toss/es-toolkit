import type { KeysOfUnion } from '../_internal/KeysOfUnion.ts';

/**
 * `Omit` applied to each member of a union separately, so that the members are preserved.
 */
export type DistributedOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/**
 * Creates a new object with specified keys omitted.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * excludes the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param obj - The object to omit keys from.
 * @param keys - An array of keys to be omitted from the object.
 * @returns A new object with the specified keys omitted.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(obj, ['b', 'c']);
 * // result will be { a: 1 }
 */
export function omit<T extends Record<string, any>, K extends KeysOfUnion<T>>(
  obj: T,
  keys: readonly K[]
): DistributedOmit<T, K> {
  const result: Record<PropertyKey, unknown> = { ...obj };

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    delete result[key];
  }

  return result as DistributedOmit<T, K>;
}
