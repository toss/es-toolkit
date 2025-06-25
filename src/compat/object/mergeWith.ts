import { cloneDeep } from './cloneDeep.ts';
import { isUnsafeProperty } from '../../_internal/isUnsafeProperty.ts';
import { clone } from '../../object/clone.ts';
import { isPrimitive } from '../../predicate/isPrimitive.ts';
import { getSymbols } from '../_internal/getSymbols.ts';
import { isArguments } from '../predicate/isArguments.ts';
import { isObjectLike } from '../predicate/isObjectLike.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

declare let Buffer:
  | {
      isBuffer: (a: any) => boolean;
    }
  | undefined;

type MergeWithCustomizer = (objValue: any, srcValue: any, key: string, object: any, source: any, stack: any) => any;

/**
 * Merges the properties of a source object into the target object using a customizer function.
 *
 * @template TObject
 * @template TSource
 * @param {TObject} object - The target object into which the source object properties will be merged.
 * @param {TSource} source - The source object whose properties will be merged into the target object.
 * @param {MergeWithCustomizer} customizer - The function to customize assigned values.
 * @returns {TObject & TSource} Returns the updated target object with properties from the source object merged in.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 *
 * const result = mergeWith(target, source, (objValue, srcValue) => {
 *   if (typeof objValue === 'number' && typeof srcValue === 'number') {
 *     return objValue + srcValue;
 *   }
 * });
 * // => { a: 1, b: 5, c: 4 }
 */
export function mergeWith<TObject, TSource>(
  object: TObject,
  source: TSource,
  customizer: MergeWithCustomizer
): TObject & TSource;

/**
 * Merges the properties of two source objects into the target object using a customizer function.
 *
 * @template TObject
 * @template TSource1
 * @template TSource2
 * @param {TObject} object - The target object into which the source objects properties will be merged.
 * @param {TSource1} source1 - The first source object.
 * @param {TSource2} source2 - The second source object.
 * @param {MergeWithCustomizer} customizer - The function to customize assigned values.
 * @returns {TObject & TSource1 & TSource2} Returns the updated target object with properties from the source objects merged in.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 *
 * const result = mergeWith(target, source1, source2, (objValue, srcValue) => {
 *   if (typeof objValue === 'number' && typeof srcValue === 'number') {
 *     return objValue + srcValue;
 *   }
 * });
 * // => { a: 1, b: 2, c: 3 }
 */
export function mergeWith<TObject, TSource1, TSource2>(
  object: TObject,
  source1: TSource1,
  source2: TSource2,
  customizer: MergeWithCustomizer
): TObject & TSource1 & TSource2;

/**
 * Merges the properties of three source objects into the target object using a customizer function.
 *
 * @template TObject
 * @template TSource1
 * @template TSource2
 * @template TSource3
 * @param {TObject} object - The target object into which the source objects properties will be merged.
 * @param {TSource1} source1 - The first source object.
 * @param {TSource2} source2 - The second source object.
 * @param {TSource3} source3 - The third source object.
 * @param {MergeWithCustomizer} customizer - The function to customize assigned values.
 * @returns {TObject & TSource1 & TSource2 & TSource3} Returns the updated target object with properties from the source objects merged in.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 *
 * const result = mergeWith(target, source1, source2, source3, (objValue, srcValue) => {
 *   if (typeof objValue === 'number' && typeof srcValue === 'number') {
 *     return objValue + srcValue;
 *   }
 * });
 * // => { a: 1, b: 2, c: 3, d: 4 }
 */
export function mergeWith<TObject, TSource1, TSource2, TSource3>(
  object: TObject,
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
  customizer: MergeWithCustomizer
): TObject & TSource1 & TSource2 & TSource3;

/**
 * Merges the properties of four source objects into the target object using a customizer function.
 *
 * @template TObject
 * @template TSource1
 * @template TSource2
 * @template TSource3
 * @template TSource4
 * @param {TObject} object - The target object into which the source objects properties will be merged.
 * @param {TSource1} source1 - The first source object.
 * @param {TSource2} source2 - The second source object.
 * @param {TSource3} source3 - The third source object.
 * @param {TSource4} source4 - The fourth source object.
 * @param {MergeWithCustomizer} customizer - The function to customize assigned values.
 * @returns {TObject & TSource1 & TSource2 & TSource3 & TSource4} Returns the updated target object with properties from the source objects merged in.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const source4 = { e: 5 };
 *
 * const result = mergeWith(target, source1, source2, source3, source4, (objValue, srcValue) => {
 *   if (typeof objValue === 'number' && typeof srcValue === 'number') {
 *     return objValue + srcValue;
 *   }
 * });
 * // => { a: 1, b: 2, c: 3, d: 4, e: 5 }
 */
export function mergeWith<TObject, TSource1, TSource2, TSource3, TSource4>(
  object: TObject,
  source1: TSource1,
  source2: TSource2,
  source3: TSource3,
  source4: TSource4,
  customizer: MergeWithCustomizer
): TObject & TSource1 & TSource2 & TSource3 & TSource4;

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * @param {any} object - The target object into which the source object properties will be merged.
 * @param {...any} otherArgs - Additional source objects to merge into the target object, including the custom `merge` function.
 * @returns {any} The updated target object with properties from the source object(s) merged in.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 *
 * const result = mergeWith(target, source, (objValue, srcValue) => {
 *   if (typeof objValue === 'number' && typeof srcValue === 'number') {
 *     return objValue + srcValue;
 */
export function mergeWith(object: any, ...otherArgs: any[]): any;

/**
 * Merges the properties of one or more source objects into the target object using a customizer function.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * You can provide a custom `merge` function to control how properties are merged. The `merge` function is called for each property that is being merged and receives the following arguments:
 *
 * - `targetValue`: The current value of the property in the target object.
 * - `sourceValue`: The value of the property in the source object.
 * - `key`: The key of the property being merged.
 * - `target`: The target object.
 * - `source`: The source object.
 * - `stack`: A `Map` used to keep track of objects that have already been processed to handle circular references.
 *
 * The `merge` function should return the value to be set in the target object. If it returns `undefined`, a default deep merge will be applied for arrays and objects.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {any} object - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {...any} otherArgs - Additional source objects to merge into the target object, including the custom `merge` function.
 * @returns {any} The updated target object with properties from the source object(s) merged in.
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
export function mergeWith(object: any, ...otherArgs: any[]): any {
  const sources = otherArgs.slice(0, -1);
  const merge = otherArgs[otherArgs.length - 1] as (
    targetValue: any,
    sourceValue: any,
    key: string | symbol,
    target: any,
    source: any,
    stack: Map<any, any>
  ) => any;

  let result = object;

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];

    result = mergeWithDeep(result, source, merge, new Map());
  }

  return result;
}

function mergeWithDeep(
  target: any,
  source: any,
  merge: (
    targetValue: any,
    sourceValue: any,
    key: string | symbol,
    target: any,
    source: any,
    stack: Map<any, any>
  ) => any,
  stack: Map<any, any>
) {
  if (isPrimitive(target)) {
    target = Object(target);
  }

  if (source == null || typeof source !== 'object') {
    return target;
  }

  if (stack.has(source)) {
    return clone(stack.get(source));
  }

  stack.set(source, target);

  if (Array.isArray(source)) {
    source = source.slice();
    for (let i = 0; i < source.length; i++) {
      source[i] = source[i] ?? undefined;
    }
  }

  const sourceKeys = [...Object.keys(source), ...getSymbols(source)];

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    if (isUnsafeProperty(key)) {
      continue;
    }

    let sourceValue = source[key];
    let targetValue = target[key];

    if (isArguments(sourceValue)) {
      sourceValue = { ...sourceValue };
    }

    if (isArguments(targetValue)) {
      targetValue = { ...targetValue };
    }

    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(sourceValue)) {
      sourceValue = cloneDeep(sourceValue);
    }

    if (Array.isArray(sourceValue)) {
      if (typeof targetValue === 'object' && targetValue != null) {
        const cloned: any = [];
        const targetKeys = Reflect.ownKeys(targetValue);

        for (let i = 0; i < targetKeys.length; i++) {
          const targetKey = targetKeys[i];
          cloned[targetKey] = targetValue[targetKey];
        }

        targetValue = cloned;
      } else {
        targetValue = [];
      }
    }

    const merged = merge(targetValue, sourceValue, key, target, source, stack);

    if (merged != null) {
      target[key] = merged;
    } else if (Array.isArray(sourceValue)) {
      target[key] = mergeWithDeep(targetValue, sourceValue, merge, stack);
    } else if (isObjectLike(targetValue) && isObjectLike(sourceValue)) {
      target[key] = mergeWithDeep(targetValue, sourceValue, merge, stack);
    } else if (targetValue == null && isPlainObject(sourceValue)) {
      target[key] = mergeWithDeep({}, sourceValue, merge, stack);
    } else if (targetValue == null && isTypedArray(sourceValue)) {
      target[key] = cloneDeep(sourceValue);
    } else if (targetValue === undefined || sourceValue !== undefined) {
      target[key] = sourceValue;
    }
  }

  return target;
}
