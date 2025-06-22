import { keys as keysToolkit } from './keys.ts';
import { eq } from '../util/eq.ts';

export function assign<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
export function assign<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;
export function assign<TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3): TObject & TSource1 & TSource2 & TSource3;
export function assign<TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4): TObject & TSource1 & TSource2 & TSource3 & TSource4;
export function assign<TObject>(object: TObject): TObject;
export function assign(object: any, ...otherArgs: any[]): any;

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
