import { isUnsafeProperty } from '../_internal/isUnsafeProperty.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';

type NonPlainObject =
  | Date
  | RegExp
  | Map<any, any>
  | Set<any>
  | ReadonlyMap<any, any>
  | ReadonlySet<any>
  | WeakMap<any, any>
  | WeakSet<any>
  | Promise<any>
  | Error
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | ((...args: any[]) => any);

type OptionalKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

type UnsafeKey = '__proto__' | 'constructor' | 'prototype';

type SafeKeys<T> = Exclude<Extract<keyof T, string | number>, UnsafeKey>;

type ArrayIndices<T extends readonly any[]> = Extract<keyof T, number>;

type MergeKeys<T, S> = S extends readonly any[] ? SafeKeys<T> | ArrayIndices<S> : SafeKeys<T> | SafeKeys<S>;

type Simplify<T> = { [K in keyof T]: T[K] } & {};

type MergeDeepObject<T extends object, S extends object, Keys extends string | number = MergeKeys<T, S>> = Simplify<
  {
    [K in Keys & (RequiredKeys<T> | RequiredKeys<S>)]: K extends keyof S
      ? K extends keyof T
        ? MergeDeepValue<T[K], S[K]>
        : S[K]
      : K extends keyof T
        ? T[K]
        : never;
  } & {
    [K in Keys as K extends RequiredKeys<T> | RequiredKeys<S> ? never : K]?: K extends keyof S
      ? K extends keyof T
        ? MergeDeepValue<T[K], S[K]>
        : S[K]
      : K extends keyof T
        ? T[K]
        : never;
  }
>;

type MergeDeepValue<T, S> = S extends undefined
  ? T
  : T extends null
    ? S
    : S extends NonPlainObject
      ? S
      : T extends NonPlainObject
        ? S
        : T extends readonly any[]
          ? S extends readonly any[]
            ? Array<T[number] | S[number]>
            : S extends object
              ? T & S
              : S
          : T extends object
            ? S extends object
              ? MergeDeepObject<T, S>
              : S
            : S;

export type MergeDeep<T, S> = MergeDeepValue<T, S>;

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
 * @returns {MergeDeep<T, S>} The updated target object with properties from the source object merged in.
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
): MergeDeep<T, S> {
  const sourceKeys = Object.keys(source) as Array<keyof S>;

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

  return target as MergeDeep<T, S>;
}

function isMergeableValue(value: unknown) {
  return isPlainObject(value) || Array.isArray(value);
}
