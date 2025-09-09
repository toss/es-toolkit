import { mergeWith } from './mergeWith.ts';
import { noop } from '../../function/noop.ts';

/**
 * Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.
 *
 * @template T
 * @template U
 * @param {T} object - The destination object.
 * @param {U} source - The source object.
 * @returns {T & U} - Returns `object`.
 *
 * @example
 * const object = { a: [{ b: 2 }, { d: 4 }] };
 * const other = { a: [{ c: 3 }, { e: 5 }] };
 * merge(object, other);
 * // => { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
 */
export function merge<T, U>(object: T, source: U): T & U;

/**
 * Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.
 *
 * @template T
 * @template U
 * @template V
 * @param {T} object - The destination object.
 * @param {U} source1 - The first source object.
 * @param {V} source2 - The second source object.
 * @returns {T & U & V} - Returns `object`.
 *
 * @example
 * merge({ a: 1 }, { b: 2 }, { c: 3 });
 * // => { a: 1, b: 2, c: 3 }
 */
export function merge<T, U, V>(object: T, source1: U, source2: V): T & U & V;

/**
 * Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.
 *
 * @template T
 * @template U
 * @template V
 * @template W
 * @param {T} object - The destination object.
 * @param {U} source1 - The first source object.
 * @param {V} source2 - The second source object.
 * @param {W} source3 - The third source object.
 * @returns {T & U & V & W} - Returns `object`.
 *
 * @example
 * merge({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 });
 * // => { a: 1, b: 2, c: 3, d: 4 }
 */
export function merge<T, U, V, W>(object: T, source1: U, source2: V, source3: W): T & U & V & W;

/**
 * Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.
 *
 * @template T
 * @template U
 * @template V
 * @template W
 * @template X
 * @param {T} object - The destination object.
 * @param {U} source1 - The first source object.
 * @param {V} source2 - The second source object.
 * @param {W} source3 - The third source object.
 * @param {X} source4 - The fourth source object.
 * @returns {T & U & V & W & X} - Returns `object`.
 *
 * @example
 * merge({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 });
 * // => { a: 1, b: 2, c: 3, d: 4, e: 5 }
 */
export function merge<T, U, V, W, X>(object: T, source1: U, source2: V, source3: W, source4: X): T & U & V & W & X;

/**
 * Recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.
 *
 * @param {any} object - The destination object.
 * @param {...any[]} otherArgs - The source objects.
 * @returns {any} - Returns `object`.
 *
 * @example
 * merge({ a: 1 }, { b: 2 }, { c: 3 });
 * // => { a: 1, b: 2, c: 3 }
 */
export function merge(object: any, ...otherArgs: any[]): any;

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
