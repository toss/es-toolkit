import { keys as keysToolkit } from './keys.ts';
import { eq } from '../util/eq.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AssignCustomizer = (objectValue: any, sourceValue: any, key?: string, object?: {}, source?: {}) => any;

/**
 * Assigns own properties from one source object to a target object using a customizer function.
 *
 * @template T - The type of the target object.
 * @template U - The type of the source object.
 * @param {T} object - The target object to which properties will be assigned.
 * @param {U} source - The source object whose properties will be assigned to the target object.
 * @param {AssignCustomizer} customizer - The function to customize assigned values.
 * @returns {T & U} The updated target object with properties from the source object assigned.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 * const result = assignWith(target, source, (objValue, srcValue) => {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * // => { a: 1, b: 2, c: 4 }
 */
export function assignWith<T, U>(object: T, source: U, customizer: AssignCustomizer): T & U;

/**
 * Assigns own properties from two source objects to a target object using a customizer function.
 *
 * @template T - The type of the target object.
 * @template U - The type of the first source object.
 * @template V - The type of the second source object.
 * @param {T} object - The target object to which properties will be assigned.
 * @param {U} source1 - The first source object whose properties will be assigned to the target object.
 * @param {V} source2 - The second source object whose properties will be assigned to the target object.
 * @param {AssignCustomizer} customizer - The function to customize assigned values.
 * @returns {T & U & V} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const result = assignWith(target, source1, source2, (objValue, srcValue) => {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * // => { a: 1, b: 2, c: 3 }
 */
export function assignWith<T, U, V>(object: T, source1: U, source2: V, customizer: AssignCustomizer): T & U & V;

/**
 * Assigns own properties from three source objects to a target object using a customizer function.
 *
 * @template T - The type of the target object.
 * @template U - The type of the first source object.
 * @template V - The type of the second source object.
 * @template W - The type of the third source object.
 * @param {T} object - The target object to which properties will be assigned.
 * @param {U} source1 - The first source object whose properties will be assigned to the target object.
 * @param {V} source2 - The second source object whose properties will be assigned to the target object.
 * @param {W} source3 - The third source object whose properties will be assigned to the target object.
 * @param {AssignCustomizer} customizer - The function to customize assigned values.
 * @returns {T & U & V & W} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const result = assignWith(target, source1, source2, source3, (objValue, srcValue) => {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * // => { a: 1, b: 2, c: 3, d: 4 }
 */
export function assignWith<T, U, V, W>(
  object: T,
  source1: U,
  source2: V,
  source3: W,
  customizer: AssignCustomizer
): T & U & V & W;

/**
 * Assigns own properties from four source objects to a target object using a customizer function.
 *
 * @template T - The type of the target object.
 * @template U - The type of the first source object.
 * @template V - The type of the second source object.
 * @template W - The type of the third source object.
 * @template X - The type of the fourth source object.
 * @param {T} object - The target object to which properties will be assigned.
 * @param {U} source1 - The first source object whose properties will be assigned to the target object.
 * @param {V} source2 - The second source object whose properties will be assigned to the target object.
 * @param {W} source3 - The third source object whose properties will be assigned to the target object.
 * @param {X} source4 - The fourth source object whose properties will be assigned to the target object.
 * @param {AssignCustomizer} customizer - The function to customize assigned values.
 * @returns {T & U & V & W & X} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const source4 = { e: 5 };
 * const result = assignWith(target, source1, source2, source3, source4, (objValue, srcValue) => {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * // => { a: 1, b: 2, c: 3, d: 4, e: 5 }
 */
export function assignWith<T, U, V, W, X>(
  object: T,
  source1: U,
  source2: V,
  source3: W,
  source4: X,
  customizer: AssignCustomizer
): T & U & V & W & X;

/**
 * Returns the target object as-is.
 *
 * @template T - The type of the target object.
 * @param {T} object - The target object.
 * @returns {T} The target object.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const result = assignWith(target);
 * // => { a: 1, b: 2 }
 */
export function assignWith<T>(object: T): T;

/**
 * Assigns own properties from multiple source objects to a target object using a customizer function.
 *
 * @template R - The type of the result.
 * @param {any} object - The target object to which properties will be assigned.
 * @param {...any[]} otherArgs - The source objects and customizer function.
 * @returns {R} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const result = assignWith(target, { b: 2 }, { c: 3 }, (objValue, srcValue) => {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * // => { a: 1, b: 2, c: 3 }
 */
export function assignWith<R>(object: any, ...otherArgs: any[]): R;

/**
 * Assigns properties from multiple source objects to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source objects into the target object.
 * If a property in the source objects is equal to the corresponding property in the target object,
 * it will not be overwritten.
 *
 * Unlike `assign`, this method accepts a `getValueToAssign` function that determines
 * the final value to be assigned to each property in the target object. The return value
 * of this function will be directly assigned to the corresponding property. This allows for
 * more precise control over how properties are merged between objects. If not provided,
 * the default behavior is equivalent to using the identity function (returning the source value).
 *
 * @param {any} object - The target object to which properties will be assigned.
 * @param {...any[]} sources - The source objects whose properties will be assigned to the target object.
 * @returns {any} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const result = assignWith(target, { b: 2 }, { c: 3 }, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assignWith(object: any, ...sources: any[]): any {
  let getValueToAssign = sources[sources.length - 1];

  if (typeof getValueToAssign === 'function') {
    sources.pop();
  } else {
    getValueToAssign = undefined;
  }

  for (let i = 0; i < sources.length; i++) {
    assignWithImpl(object, sources[i], getValueToAssign);
  }

  return object;
}

function assignWithImpl(
  object: any,
  source: any,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: any, source: any) => any
): any {
  const keys = keysToolkit(source);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const objValue = object[key];
    const srcValue = source[key];

    const newValue = getValueToAssign?.(objValue, srcValue, key, object, source) ?? srcValue;

    if (!(key in object) || !eq(objValue, newValue)) {
      object[key] = newValue;
    }
  }
}
