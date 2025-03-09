import { merge as mergeToolkit } from '../../object/merge';

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
export function merge<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(
  target: T,
  source: S
): T & S;

/**
 * Merges the properties of the source object into the target object.
 *
 * This function performs a deep merge, meaning nested objects and arrays are merged recursively.
 * If a property in the source object is an array or an object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is undefined, it will not overwrite a defined property in the target object.
 *
 * Note that this function mutates the target object.
 *
 * @param {S} source - The source object whose properties will be merged into the target object.
 * @returns {(target: T) => T & S} A function that receive the target object into which the source object properties will be merged. This object is modified in place as argument and returns the updated target object with properties from the source object merged in.
 *
 * @template T - Type of the target object.
 * @template S - Type of the source object.
 *
 * @example
 * const target = { a: 1, b: { x: 1, y: 2 } };
 * const source = { b: { y: 3, z: 4 }, c: 5 };
 *
 * const result = merge(source)(target);
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
  source: S
): (target: T) => T & S;

export function merge<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(
  targetOrSource: T | S,
  source?: S
) {
  if (source == null) {
    return (target: T) => merge(target, targetOrSource as S);
  }

  const target = targetOrSource as T;
  return mergeToolkit(target, source);
}
