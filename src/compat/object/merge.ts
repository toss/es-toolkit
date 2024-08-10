import { clone } from '../../object/clone.ts';
import { isArguments } from '../predicate/isArguments.ts';
import { isObjectLike } from '../predicate/isObjectLike.ts';
import { isPlainObject } from '../predicate/isPlainObject.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';
import { cloneDeep } from './cloneDeep.ts';

declare var Buffer:
  | {
      isBuffer: (a: any) => boolean;
    }
  | undefined;

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {O} object - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {S} source - The first source object whose properties will be merged into the target object.
 * @returns {O & S} The updated target object with properties from the source object(s) merged in.
 *
 * @template O - Type of the target object.
 * @template S - Type of the first source object.
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
 * // Output: { a: [3], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function merge<O, S>(object: O, source: S): O & S;

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {O} object - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {S1} source1 - The first source object to be merged into the target object.
 * @param {S2} source2 - The second source object to be merged into the target object.
 * @returns {O & S1 & S2} The updated target object with properties from the source objects merged in.
 *
 * @template O - Type of the target object.
 * @template S1 - Type of the first source object.
 * @template S2 - Type of the second source object.
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
 * // Output: { a: [3], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function merge<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {O} object - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {S1} source1 - The first source object whose properties will be merged into the target object.
 * @param {S2} source2 - The second source object whose properties will be merged into the target object.
 * @param {S3} source3 - The third source object whose properties will be merged into the target object.
 * @returns {O & S1 & S2 & S3} The updated target object with properties from the source object(s) merged in.
 *
 * @template O - Type of the target object.
 * @template S1 - Type of the first source object.
 * @template S2 - Type of the second source object.
 * @template S3 - Type of the third source object.
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
 * // Output: { a: [3], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function merge<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {O} object - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {S1} source1 - The first source object whose properties will be merged into the target object.
 * @param {S2} source2 - The second source object whose properties will be merged into the target object.
 * @param {S3} source3 - The third source object whose properties will be merged into the target object.
 * @param {S4} source4 - The fourth source object whose properties will be merged into the target object.
 * @returns {O & S1 & S2 & S3 & S4} The updated target object with properties from the source object(s) merged in.
 *
 * @template O - Type of the target object.
 * @template S1 - Type of the first source object.
 * @template S2 - Type of the second source object.
 * @template S3 - Type of the third source object.
 * @template S4 - Type of the fourth source object.
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
 * // Output: { a: [3], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function merge<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): O & S1 & S2 & S3;

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {any} any - The target object into which the source object properties will be merged. This object is modified in place.
 * @param {any[]} sources - The source objects whose properties will be merged into the target object.
 * @returns {any} The updated target object with properties from the source object(s) merged in.
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
 * // Output: { a: [3], b: { x: 1, y: 2 } }
 *
 * @example
 * const target = { a: null };
 * const source = { a: [1, 2, 3] };
 *
 * const result = merge(target, source);
 * console.log(result);
 * // Output: { a: [1, 2, 3] }
 */
export function merge(object: any, ...sources: any[]): any;

export function merge(object: any, ...sources: any[]): any {
  let result = object;

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];

    result = mergeDeep(object, source, new Map());
  }

  return result;
}

function mergeDeep(object: any, source: any, stack: Map<any, any>) {
  if (source == null || typeof source !== 'object') {
    return object;
  }

  if (stack.has(source)) {
    return clone(stack.get(source));
  }

  stack.set(source, object);

  if (Array.isArray(source)) {
    source = source.slice();
    for (let i = 0; i < source.length; i++) {
      source[i] = source[i] ?? undefined;
    }
  }

  const sourceKeys = Object.keys(source);

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    let sourceValue = source[key];
    let objectValue = object[key];

    if (isArguments(sourceValue)) {
      sourceValue = { ...sourceValue };
    }

    if (isArguments(objectValue)) {
      objectValue = { ...objectValue };
    }

    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(sourceValue)) {
      sourceValue = cloneDeep(sourceValue);
    }

    if (Array.isArray(sourceValue)) {
      objectValue = typeof objectValue === 'object' ? Array.from(objectValue ?? []) : [];
    }

    if (Array.isArray(sourceValue)) {
      object[key] = mergeDeep(objectValue, sourceValue, stack);
    } else if (isObjectLike(objectValue) && isObjectLike(sourceValue)) {
      object[key] = mergeDeep(objectValue, sourceValue, stack);
    } else if (objectValue == null && Array.isArray(sourceValue)) {
      object[key] = mergeDeep([], sourceValue, stack);
    } else if (objectValue == null && isPlainObject(sourceValue)) {
      object[key] = mergeDeep({}, sourceValue, stack);
    } else if (objectValue == null && isTypedArray(sourceValue)) {
      object[key] = cloneDeep(sourceValue);
    } else if (objectValue === undefined || sourceValue !== undefined) {
      object[key] = sourceValue;
    }
  }

  return object;
}
