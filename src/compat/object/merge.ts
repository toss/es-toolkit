import { noop } from '../../function/noop.ts';
import { mergeWith } from './mergeWith.ts';

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
 * @param {any} object - The target object into which the source object properties will be merged. This object is modified in place.
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

/**
 * Merges the properties of one or more source objects into the target object.
 *
 * This function performs a deep merge, recursively merging nested objects and arrays.
 * If a property in the source object is an array or object and the corresponding property in the target object is also an array or object, they will be merged.
 * If a property in the source object is `undefined`, it will not overwrite a defined property in the target object.
 *
 * The function can handle multiple source objects and will merge them all into the target object.
 *
 * @param {any} object - The target object into which the source object properties will be merged. This object is modified in place.
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
export function merge(object: any, ...sources: any[]): any {
  return mergeWith(object, ...sources, noop);
}
