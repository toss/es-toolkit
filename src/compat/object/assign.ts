import { keys as keysToolkit } from './keys.ts';
import { eq } from '../util/eq.ts';

/**
 * Assigns the properties of a source object to a target object.
 *
 * This function merges the properties of the source object into the target object.
 * If a property in the source object is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S} source - The source object whose properties will be assigned to the target object.
 * @returns {O & S} The updated target object with properties from the source object assigned.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 * const result = assign(target, source);
 * console.log(result); // Output: { a: 1, b: 3, c: 4 }
 */
export function assign<O, S>(object: O, source: S): O & S;

/**
 * Assigns the properties of two source objects to a target object.
 *
 * This function merges the properties of the source objects into the target object.
 * If a property in the source objects is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S1} source1 - The first source object whose properties will be assigned to the target object.
 * @param {S2} source2 - The second source object whose properties will be assigned to the target object.
 * @returns {O & S1 & S2} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const result = assign(target, source1, source2);
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assign<O, S1, S2>(object: O, source1: S1, source2: S2): O & S1 & S2;

/**
 * Assigns the properties of three source objects to a target object.
 *
 * This function merges the properties of the source objects into the target object.
 * If a property in the source objects is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S1} source1 - The first source object whose properties will be assigned to the target object.
 * @param {S2} source2 - The second source object whose properties will be assigned to the target object.
 * @param {S3} source3 - The third source object whose properties will be assigned to the target object.
 * @returns {O & S1 & S2 & S3} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const result = assign(target, source1, source2, source3);
 * console.log(result); // Output: { a: 1, b: 2, c: 3, d: 4 }
 */
export function assign<O, S1, S2, S3>(object: O, source1: S1, source2: S2, source3: S3): O & S1 & S2 & S3;

/**
 * Assigns the properties of four source objects to a target object.
 *
 * This function merges the properties of the source objects into the target object.
 * If a property in the source objects is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S1} source1 - The first source object whose properties will be assigned to the target object.
 * @param {S2} source2 - The second source object whose properties will be assigned to the target object.
 * @param {S3} source3 - The third source object whose properties will be assigned to the target object.
 * @param {S4} source4 - The fourth source object whose properties will be assigned to the target object.
 * @returns {O & S1 & S2 & S3 & S4} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const source4 = { e: 5 };
 * const result = assign(target, source1, source2, source3, source4);
 * console.log(result); // Output: { a: 1, b: 2, c: 3, d: 4, e: 5 }
 */
export function assign<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): O & S1 & S2 & S3 & S4;

/**
 * Assigns properties from multiple source objects to a target object.
 *
 * This function merges the properties of the source objects into the target object.
 * If a property in the source objects is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * @param {any} object - The target object to which properties will be assigned.
 * @param {...any[]} sources - The source objects whose properties will be assigned to the target object.
 * @returns {any} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const result = assign(target, { b: 2 }, { c: 3 }, { a: 4 });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assign(object: any, ...sources: any[]): any;

/**
 * Assigns properties from multiple source objects to a target object.
 *
 * This function merges the properties of the source objects into the target object.
 * If a property in the source objects is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * @param {any} object - The target object to which properties will be assigned.
 * @param {...any[]} sources - The source objects whose properties will be assigned to the target object.
 * @returns {any} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const result = assign(target, { b: 2 }, { c: 3 });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assign(object: any, ...sources: any[]): any {
  for (let i = 0; i < sources.length; i++) {
    assignImpl(object, sources[i]);
  }

  return object;
}

function assignImpl(object: any, source: any): any {
  const keys = keysToolkit(source);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!(key in object) || !eq(object[key], source[key])) {
      object[key] = source[key];
    }
  }
}
