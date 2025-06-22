import { keys as keysToolkit } from './keys.ts';
import { eq } from '../util/eq.ts';

type AssignCustomizer = (objectValue: any, sourceValue: any, key?: string, object?: {}, source?: {}) => any;

export function assignWith<TObject, TSource>(object: TObject, source: TSource, customizer: AssignCustomizer): TObject & TSource;
export function assignWith<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2, customizer: AssignCustomizer): TObject & TSource1 & TSource2;
export function assignWith<TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, customizer: AssignCustomizer): TObject & TSource1 & TSource2 & TSource3;
export function assignWith<TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4, customizer: AssignCustomizer): TObject & TSource1 & TSource2 & TSource3 & TSource4;
export function assignWith<TObject>(object: TObject): TObject;
export function assignWith<TResult>(object: any, ...otherArgs: any[]): TResult;

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
