import { keysIn } from './keysIn.ts';
import { eq } from '../util/eq.ts';

export function assignIn<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
export function assignIn<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;
export function assignIn<TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3): TObject & TSource1 & TSource2 & TSource3;
export function assignIn<TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4): TObject & TSource1 & TSource2 & TSource3 & TSource4;
export function assignIn<TObject>(object: TObject): TObject;
export function assignIn<TResult>(object: any, ...otherArgs: any[]): TResult;

/**
 * Assigns properties from multiple source objects to a target object.
 *
 * This function merges the properties of the source objects into the target object,
 * including properties from the prototype chain. If a property in the source objects
 * is equal to the corresponding property in the target object, it will not be overwritten.
 *
 * @param {any} object - The target object to which properties will be assigned.
 * @param {...any[]} sources - The source objects whose properties will be assigned to the target object.
 * @returns {any} The updated target object with properties from the source objects assigned.
 *
 * @example
 * const target = { a: 1 };
 * const result = assignIn(target, { b: 2 }, { c: 3 });
 * console.log(result); // Output: { a: 1, b: 2, c: 3 }
 */
export function assignIn(object: any, ...sources: any[]): any {
  for (let i = 0; i < sources.length; i++) {
    assignInImpl(object, sources[i]);
  }

  return object;
}

function assignInImpl(object: any, source: any): any {
  const keys = keysIn(source);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!(key in object) || !eq(object[key], source[key])) {
      object[key] = source[key];
    }
  }
}
