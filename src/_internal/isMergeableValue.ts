import { isPlainObject } from '../predicate/isPlainObject.ts';

/**
 * Checks if a value can be deeply merged into, i.e. it is a plain object or an array.
 *
 * This function is used in `merge`, `mergeWith`, and `toMerged` to decide whether
 * the source value should be merged into the existing target value recursively,
 * preserving the target's structure, instead of replacing it.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object or an array, otherwise `false`.
 */
export function isMergeableValue(value: unknown): boolean {
  return isPlainObject(value) || Array.isArray(value);
}
