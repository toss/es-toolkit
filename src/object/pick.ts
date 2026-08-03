import type { KeysOfUnion } from '../_internal/KeysOfUnion.ts';

/**
 * `Pick` applied to each member of a union separately, so that the members are preserved.
 *
 * Keys that do not exist on a member are ignored for that member instead of being an error.
 */
export type DistributedPick<T, K extends PropertyKey> = T extends unknown ? Pick<T, Extract<K, keyof T>> : never;

/**
 * Creates a new object composed of the picked object properties.
 *
 * This function takes an object and an array of keys, and returns a new object that
 * includes only the properties corresponding to the specified keys.
 *
 * @template T - The type of object.
 * @template K - The type of keys in object.
 * @param obj - The object to pick keys from.
 * @param keys - An array of keys to be picked from the object.
 * @returns A new object with the specified keys picked.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // result will be { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends KeysOfUnion<T>>(
  obj: T,
  keys: readonly K[]
): DistributedPick<T, K> {
  const result: Record<PropertyKey, unknown> = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key as keyof T];
    }
  }

  return result as DistributedPick<T, K>;
}
