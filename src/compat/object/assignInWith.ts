import { keysIn } from './keysIn.ts';
import { eq } from '../util/eq.ts';

/**
 * Assigns the properties of a source object to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source object into the target object,
 * including properties from the prototype chain. If a property in the source object
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
 * the final value to be assigned to each property in the target object. The return value
 * of this function will be directly assigned to the corresponding property. This allows for
 * more precise control over how properties are merged between objects. If not provided,
 * the default behavior is equivalent to using the identity function (returning the source value).
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S} source - The source object whose properties will be assigned to the target object.
 * @param {Function} getValueToAssign - The function to customize assigned values. It takes five arguments:
 *  objValue (the value from object), srcValue (the value from source), key (the property name),
 *  object (the target object), and source (the source object).
 * @returns {O & S} The updated target object with properties from the source object assigned.
 *
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 * const result = assignInWith(target, source, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 4 }
 */
export function assignInWith<O, S>(
  object: O,
  source: S,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S) => any
): O & S;

/**
 * Assigns the properties of two source objects to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source objects into the target object,
 * including properties from the prototype chain. If a property in the source objects
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
 * the final value to be assigned to each property in the target object. The return value
 * of this function will be directly assigned to the corresponding property. This allows for
 * more precise control over how properties are merged between objects. If not provided,
 * the default behavior is equivalent to using the identity function (returning the source value).
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S1} source1 - The first source object whose properties will be assigned to the target object.
 * @param {S2} source2 - The second source object whose properties will be assigned to the target object.
 * @param {Function} getValueToAssign - The function to customize assigned values. It takes five arguments:
 *  objValue (the value from object), srcValue (the value from source), key (the property name),
 *  object (the target object), and source (the source object).
 * @returns {O & S1 & S2} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const result = assignInWith(target, source1, source2, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assignInWith<O, S1, S2>(
  object: O,
  source1: S1,
  source2: S2,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2) => any
): O & S1 & S2;

/**
 * Assigns the properties of three source objects to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source objects into the target object,
 * including properties from the prototype chain. If a property in the source objects
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
 * the final value to be assigned to each property in the target object. The return value
 * of this function will be directly assigned to the corresponding property. This allows for
 * more precise control over how properties are merged between objects. If not provided,
 * the default behavior is equivalent to using the identity function (returning the source value).
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S1} source1 - The first source object whose properties will be assigned to the target object.
 * @param {S2} source2 - The second source object whose properties will be assigned to the target object.
 * @param {S3} source3 - The third source object whose properties will be assigned to the target object.
 * @param {Function} getValueToAssign - The function to customize assigned values. It takes five arguments:
 *  objValue (the value from object), srcValue (the value from source), key (the property name),
 *  object (the target object), and source (the source object).
 * @returns {O & S1 & S2 & S3} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const result = assignInWith(target, source1, source2, source3, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 3, d: 4 }
 */
export function assignInWith<O, S1, S2, S3>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3) => any
): O & S1 & S2 & S3;

/**
 * Assigns the properties of four source objects to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source objects into the target object,
 * including properties from the prototype chain. If a property in the source objects
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
 * the final value to be assigned to each property in the target object. The return value
 * of this function will be directly assigned to the corresponding property. This allows for
 * more precise control over how properties are merged between objects. If not provided,
 * the default behavior is equivalent to using the identity function (returning the source value).
 *
 * @param {O} object - The target object to which properties will be assigned.
 * @param {S1} source1 - The first source object whose properties will be assigned to the target object.
 * @param {S2} source2 - The second source object whose properties will be assigned to the target object.
 * @param {S3} source3 - The third source object whose properties will be assigned to the target object.
 * @param {S4} source4 - The fourth source object whose properties will be assigned to the target object.
 * @param {Function} getValueToAssign - The function to customize assigned values. It takes five arguments:
 *  objValue (the value from object), srcValue (the value from source), key (the property name),
 *  object (the target object), and source (the source object).
 * @returns {O & S1 & S2 & S3 & S4} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const source3 = { d: 4 };
 * const source4 = { e: 5 };
 * const result = assignInWith(target, source1, source2, source3, source4, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 3, d: 4, e: 5 }
 */
export function assignInWith<O, S1, S2, S3, S4>(
  object: O,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: O, source: S1 | S2 | S3 | S4) => any
): O & S1 & S2 & S3 & S4;

/**
 * Assigns properties from multiple source objects to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source objects into the target object,
 * including properties from the prototype chain. If a property in the source objects
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
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
 * const result = assignInWith(target, { b: 2 }, { c: 3 }, { a: 4 }, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assignInWith(object: any, ...sources: any[]): any;

/**
 * Assigns properties from multiple source objects to a target object.
 * You can provide a `getValueToAssign` function to determine what value will be assigned for each property.
 *
 * This function merges the properties of the source objects into the target object,
 * including properties from the prototype chain. If a property in the source objects
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * Unlike `assignIn`, this method accepts a `getValueToAssign` function that determines
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
 * const result = assignInWith(target, { b: 2 }, { c: 3 }, function(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assignInWith(object: any, ...sources: any[]): any {
  let getValueToAssign = sources[sources.length - 1];

  if (typeof getValueToAssign === 'function') {
    sources.pop();
  } else {
    getValueToAssign = undefined;
  }

  for (let i = 0; i < sources.length; i++) {
    assignInWithImpl(object, sources[i], getValueToAssign);
  }

  return object;
}

function assignInWithImpl(
  object: any,
  source: any,
  getValueToAssign?: (objValue: any, srcValue: any, key: string, object: any, source: any) => any
): any {
  const keys = keysIn(source);

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
