import { type MergeInput, toMergedInto } from '../_internal/mergeInternal.ts';
import type { MergeDeep } from '../_internal/types/MergeDeep.ts';

/**
 * Merges the properties of the source object into a deep clone of the target object.
 * Unlike `merge`, This function does not modify the original target object.
 *
 * This function performs a deep merge, meaning nested objects and arrays are merged recursively.
 *
 * - If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * - If a property in the source object is undefined, it will not overwrite a defined property in the target object.
 *
 * Note that this function does not mutate the target object.
 *
 * @param {T} target - The target object to be cloned and merged into. This object is not modified directly.
 * @param {S} source - The source object whose properties will be merged into the cloned target object.
 * @returns {T & S} A new object with properties from the source object merged into a deep clone of the target object.
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 *
 * @example
 * const target = { a: 1, b: { x: 1, y: 2 } };
 * const source = { b: { y: 3, z: 4 }, c: 5 };
 *
 * const result = toMerged(target, source);
 * console.log(result);
 * // Output: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
 *
 * @example
 * const target = { a: [1, 2], b: { x: 1 } };
 * const source = { a: [3], b: { y: 2 } };
 *
 * const result = toMerged(target, source);
 * console.log(result);
 * // Output: { a: [3, 2], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = toMerged(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function toMerged<T extends MergeInput, S extends MergeInput>(target: T, source: S): T & S {
  return toMergedInto(target, source) as T & S;
}

/**
 * Deeply merges the properties of the source object into a deep clone of the target object
 * and returns a type-safe result with recursively merged types.
 * Unlike `merge.deep`, this function does not modify the original target object.
 *
 * @param {T} target - The target object to be cloned and merged into. This object is not modified directly.
 * @param {S} source - The source object whose properties will be merged into the cloned target object.
 * @returns {MergeDeep<T, S>} A new object with deeply merged types.
 *
 * @example
 * const target = { a: 1, b: { x: 1, y: 2 } };
 * const source = { b: { y: 3, z: 4 }, c: 5 };
 *
 * const result = toMerged.deep(target, source);
 * // result type: { a: number; b: { x: number; y: number; z: number }; c: number }
 * // target remains unchanged
 */
export namespace toMerged {
  export function deep<T extends MergeInput, S extends MergeInput>(target: T, source: S): MergeDeep<T, S> {
    return toMerged(target, source) as MergeDeep<T, S>;
  }
}
