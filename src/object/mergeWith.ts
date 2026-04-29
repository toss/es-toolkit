import { type MergeInput, type MergeRuntimeCustomizer, mergeWithInto } from '../_internal/mergeInternal.ts';
import type { MergeDeep } from '../_internal/types/MergeDeep.ts';

type Defined<T> = Exclude<T, undefined>;
type MergeWithCustomizer<T extends MergeInput, S extends MergeInput, R = unknown> = (
  targetValue: unknown,
  sourceValue: unknown,
  key: string,
  target: T,
  source: S
) => R | undefined;

type MergeWithDeepValue<T, R> = [Defined<R>] extends [never]
  ? T
  : T extends readonly unknown[]
    ? Defined<R> | Array<MergeWithDeepValue<T[number], R>>
    : T extends object
      ? Defined<R> | { [K in keyof T]: MergeWithDeepValue<T[K], R> }
      : Defined<R> | T;

type MergeWithDeepResult<T, R> = [Defined<R>] extends [never]
  ? T
  : T extends readonly unknown[]
    ? Array<MergeWithDeepValue<T[number], R>>
    : T extends object
      ? { [K in keyof T]: MergeWithDeepValue<T[K], R> }
      : T;

/**
 * Merges the properties of the source object into the target object.
 *
 * You can provide a custom `merge` function to control how properties are merged. It should return the value to be set in the target object.
 *
 * If it returns `undefined`, a default deep merge will be applied for arrays and objects:
 *
 * - If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
 * - If a property in the source object is undefined, it will not overwrite a defined property in the target object.
 *
 * Note that this function mutates the target object.
 *
 * @param {T} target - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {S} source - The source object whose properties will be merged into the target object.
 * @param {MergeWithCustomizer<T, S, R>} merge - A custom merge function that defines how properties should be combined. It receives the following arguments:
 *   - `targetValue`: The current value of the property in the target object.
 *   - `sourceValue`: The value of the property in the source object.
 *   - `key`: The key of the property being merged.
 *   - `target`: The target object.
 *   - `source`: The source object.
 *
 * @returns {T & S} The updated target object with properties from the source object merged in.
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 * @template R - Type returned by the custom merge function when overriding a value.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 *
 * mergeWith(target, source, (targetValue, sourceValue) => {
 *   if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
 *     return targetValue + sourceValue;
 *   }
 * });
 * // Returns { a: 1, b: 5, c: 4 }
 * @example
 * const target = { a: [1], b: [2] };
 * const source = { a: [3], b: [4] };
 *
 * const result = mergeWith(target, source, (objValue, srcValue) => {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * });
 *
 * expect(result).toEqual({ a: [1, 3], b: [2, 4] });
 */
export function mergeWith<T extends MergeInput, S extends MergeInput, R = unknown>(
  target: T,
  source: S,
  merge: MergeWithCustomizer<T, S, R>
): T & S {
  return mergeWithInto(target, source, merge as MergeRuntimeCustomizer) as T & S;
}

/**
 * Deeply merges the properties of the source object into the target object using a customizer function
 * and returns a type-safe result with recursively merged types.
 *
 * @param {T} target - The target object into which the source object properties will be merged.
 * @param {S} source - The source object whose properties will be merged into the target object.
 * @param {MergeWithCustomizer<T, S, R>} merge - A custom merge function that defines how properties should be combined.
 * @returns {MergeWithDeepResult<MergeDeep<T, S>, R>} The updated target object with deeply merged types.
 *
 * If the customizer returns a non-`undefined` value, the corresponding property type is widened
 * to include that override value in addition to the default deep-merge result.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 *
 * const result = mergeWith.deep(target, source, (targetValue, sourceValue) => {
 *   if (typeof targetValue === 'number' && typeof sourceValue === 'number') {
 *     return targetValue + sourceValue;
 *   }
 * });
 * // result type: { a: number; b: number; c: number }
 */
export namespace mergeWith {
  export function deep<T extends MergeInput, S extends MergeInput, R = unknown>(
    target: T,
    source: S,
    merge: MergeWithCustomizer<T, S, R>
  ): MergeWithDeepResult<MergeDeep<T, S>, R> {
    return mergeWith(target, source, merge) as MergeWithDeepResult<MergeDeep<T, S>, R>;
  }
}
