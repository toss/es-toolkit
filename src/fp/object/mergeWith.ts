import { mergeWith as mergeWithToolkit } from '../../object/mergeWith';

/**
 * Creates a function that merges objects with customizer function.
 *
 * @template T - The type of the source object.
 * @template U - The type of the target object.
 * @param {U} source - The source object.
 * @param {(objValue: any, srcValue: any, key: string, object: T, source: U) => any} customizer - The function to customize merging properties.
 * @returns {(obj: T) => T & U} A function that takes an object and returns a new merged object.
 *
 * @example
 * const object = { 'a': [1], 'b': [2] };
 * const other = { 'a': [3], 'b': [4] };
 * const mergeArrays = mergeWith(other, (objValue, srcValue) => {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * });
 * const result = mergeArrays(object);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
export function mergeWith<T extends object, U extends object>(
  source: U,
  customizer: (objValue: any, srcValue: any, key: string, object: T, source: U) => any
): (obj: T) => T & U;

/**
 * Merges objects with customizer function.
 *
 * @template T - The type of the target object.
 * @template U - The type of the source object.
 * @param {T} object - The target object.
 * @param {U} source - The source object.
 * @param {(objValue: any, srcValue: any, key: string, object: T, source: U) => any} customizer - The function to customize merging properties.
 * @returns {T & U} Returns the merged object.
 *
 * @example
 * const object = { 'a': [1], 'b': [2] };
 * const other = { 'a': [3], 'b': [4] };
 * const result = mergeWith(object, other, (objValue, srcValue) => {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * });
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
export function mergeWith<T extends object, U extends object>(
  object: T,
  source: U,
  customizer: (objValue: any, srcValue: any, key: string, object: T, source: U) => any
): T & U;

export function mergeWith<T extends object, U extends object>(
  objectOrSource: T | U,
  sourceOrCustomizer: U | ((objValue: any, srcValue: any, key: string, object: T, source: U) => any),
  customizer?: (objValue: any, srcValue: any, key: string, object: T, source: U) => any
) {
  if (typeof sourceOrCustomizer === 'function') {
    return (object: T) => mergeWith(object, objectOrSource as U, sourceOrCustomizer);
  }

  return mergeWithToolkit(objectOrSource as T, sourceOrCustomizer, customizer!);
}
