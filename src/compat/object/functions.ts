import { keys } from './keys.ts';

/**
 * Creates an array of property names from an object where the property values are functions.
 *
 * @param {any} object - The object to inspect.
 * @returns {string[]} - An array of function property names.
 *
 * @example
 * function Foo() {
 *   this.a = () => 'a';
 *   this.b = () => 'b';
 * }
 * 
 * Foo.prototype.c = () => 'c';
 * 
 * functions(new Foo);
 * // => ['a', 'b']
 */
export function functions(object: any): string[];

/**
 * Creates an array of property names from an object where the property values are functions.
 *
 * Only checks for own properties with string keys. Inherited properties or
 * properties with Symbol keys are not included.
 *
 * @param {unknown} object The object to inspect.
 * @returns {string[]} An array of function property names.
 *
 * @example
 *
 * function Foo() {
 *   this.a = () => 'a'
 *   this.b = () => 'b'
 * }
 *
 * Foo.prototype.c = () => 'c'
 *
 * functions(new Foo)
 * // => ['a', 'b']
 */
export function functions(object: any): string[] {
  if (object == null) {
    return [];
  }

  return keys(object).filter(key => typeof object[key as keyof typeof object] === 'function');
}
