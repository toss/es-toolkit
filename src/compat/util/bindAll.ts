import { isFunction } from '../../predicate/isFunction.ts';
import { Many } from '../_internal/Many.ts';
import { isArray } from '../predicate/isArray.ts';
import { isObject } from '../predicate/isObject.ts';
import { toString } from '../util/toString.ts';

/**
 * Binds methods of an object to the object itself, overwriting the existing method.
 * Method names may be specified as individual arguments or as arrays of method names.
 *
 * @template T - The type of the object.
 * @param {T} object - The object to bind methods to.
 * @param {Array<Many<string>>} [methodNames] - The method names to bind, specified individually or in arrays.
 * @returns {T} - Returns the object.
 *
 * @example
 * const view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * bindAll(view, ['click']);
 * jQuery(element).on('click', view.click);
 * // => Logs 'clicked docs' when clicked.
 *
 * @example
 * // Using individual method names
 * bindAll(view, 'click');
 * // => Same as above
 */
export function bindAll<T>(object: T, ...methodNames: Array<Many<string>>): T {
  if (object == null) {
    return object;
  }

  if (!isObject(object)) {
    return object;
  }

  if (isArray(object) && methodNames.length === 0) {
    return object;
  }

  const methods: any[] = [];
  for (let i = 0; i < methodNames.length; i++) {
    const name = methodNames[i];
    if (isArray(name)) {
      methods.push(...name);
    } else if (name && typeof name === 'object' && 'length' in name) {
      methods.push(...Array.from(name));
    } else {
      methods.push(name);
    }
  }

  if (methods.length === 0) {
    return object;
  }

  for (let i = 0; i < methods.length; i++) {
    const key = methods[i];
    const stringKey = toString(key) as keyof typeof object;
    const func = object[stringKey];

    if (isFunction(func)) {
      object[stringKey] = func.bind(object) as any;
    }
  }

  return object;
}
