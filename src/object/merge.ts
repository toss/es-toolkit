import { isUnsafeProperty } from '../_internal/isUnsafeProperty.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';

/**
 * The result of deeply merging `S` into `T`, key by key.
 *
 * When both sides have an object (or array) at the same key, the merge recurses.
 * If the source value type can be `undefined`, the target type is kept because
 * `merge` skips `undefined` source values at runtime.
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 */
export type MergeDeep<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>> = {
  [K in keyof T | keyof S]: K extends keyof S
    ? K extends keyof T
      ? MergeDeepValue<T[K], S[K]>
      : S[K]
    : K extends keyof T
      ? T[K]
      : never;
};

type MergeDeepValue<TargetValue, SourceValue> =
  SourceValue extends Record<PropertyKey, any>
    ? TargetValue extends Record<PropertyKey, any>
      ? MergeDeep<TargetValue, SourceValue>
      : SourceValue
    : undefined extends SourceValue
      ? TargetValue | Exclude<SourceValue, undefined>
      : SourceValue;

/**
 * Merges the properties of the source object into the target object.
 *
 * This function performs a deep merge, meaning nested objects and arrays are merged recursively.
 * If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is undefined, it will not overwrite a defined property in the target object.
 *
 * Note that this function mutates the target object.
 *
 * @param target - The target object into which the source object properties will be merged. This object is modified in place.
 * @param source - The source object whose properties will be merged into the target object.
 * @returns The updated target object with properties from the source object merged in.
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
export function merge<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(
  target: T,
  source: S
): MergeDeep<T, S>;

export function merge(target: Record<PropertyKey, any>, source: Record<PropertyKey, any>): Record<PropertyKey, any> {
  const sourceKeys = Object.keys(source) as Array<keyof typeof source>;

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    if (isUnsafeProperty(key)) {
      continue;
    }

    const sourceValue = source[key];
    const targetValue = target[key];

    if (isMergeableValue(sourceValue) && isMergeableValue(targetValue)) {
      target[key] = merge(targetValue, sourceValue);
    } else if (Array.isArray(sourceValue)) {
      target[key] = merge([], sourceValue);
    } else if (isPlainObject(sourceValue)) {
      target[key] = merge({}, sourceValue);
    } else if (targetValue === undefined || sourceValue !== undefined) {
      target[key] = sourceValue;
    }
  }

  return target;
}

function isMergeableValue(value: unknown) {
  return isPlainObject(value) || Array.isArray(value);
}
