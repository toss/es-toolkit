import { updateWith } from './updateWith.ts';

/**
 * Updates the value at the specified path of the given object using an updater function.
 * If any part of the path does not exist, it will be created.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to modify.
 * @param {PropertyKey | PropertyKey[]} path - The path of the property to update.
 * @param {(value: unknown) => unknown} updater - The function to produce the updated value.
 * @returns {T} - The modified object.
 */
export function update<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown
): T {
  return updateWith(obj, path, updater, () => undefined);
}
