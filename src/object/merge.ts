import { type MergeInput, mergeInto } from '../_internal/mergeInternal.ts';
import type { MergeDeep } from '../_internal/types/MergeDeep.ts';

/**
 * Merges the properties of the source object into the target object.
 *
 * This function performs a deep merge, meaning nested objects and arrays are merged recursively.
 * If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is undefined, it will not overwrite a defined property in the target object.
 *
 * Note that this function mutates the target object.
 *
 * @param {T} target - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {S} source - The source object whose properties will be merged into the target object.
 * @returns {T & S} The updated target object with properties from the source object merged in.
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 *
 * @example
 * const target = { a: 1, b: { x: 1, y: 2 } };
 * const source = { b: { y: 3, z: 4 }, c: 5 };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }
 *
 * @example
 * const target = { a: [1, 2], b: { x: 1 } };
 * const source = { a: [3], b: { y: 2 } };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [3, 2], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function merge<T extends MergeInput, S extends MergeInput>(target: T, source: S): T & S {
  return mergeInto(target, source) as T & S;
}

/**
 * Deeply merges the properties of the source object into the target object
 * and returns a type-safe result with recursively merged types.
 *
 * @param {T} target - The target object into which the source object properties will be merged.
 * @param {S} source - The source object whose properties will be merged into the target object.
 * @returns {MergeDeep<T, S>} The updated target object with deeply merged types.
 *
 * @example
 * const target = { a: 1, b: { x: 1, y: 2 } };
 * const source = { b: { y: 3, z: 4 }, c: 5 };
 *
 * const result = merge.deep(target, source);
 * // result type: { a: number; b: { x: number; y: number; z: number }; c: number }
 */
export namespace merge {
  export function deep<T extends MergeInput, S extends MergeInput>(target: T, source: S): MergeDeep<T, S> {
    return merge(target, source) as MergeDeep<T, S>;
  }
}
