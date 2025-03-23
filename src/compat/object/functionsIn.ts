import { isFunction } from '../../predicate';

/**
 * Creates an array of function property names from own and inherited enumerable properties of an object.
 *
 * @param {*} object The object to inspect.
 * @returns {Array} Returns the function names.
 * @example
 *
 * function Foo() {
 *   this.a = function() { return 'a'; };
 *   this.b = function() { return 'b'; };
 * }
 *
 * Foo.prototype.c = function() { return 'c'; };
 *
 * functionsIn(new Foo);
 * // => ['a', 'b', 'c']
 */
export function functionsIn(object: any): string[] {
  if (object == null) {
    return [];
  }

  const result: string[] = [];

  for (const key in object) {
    if (isFunction(object[key])) {
      result.push(key);
    }
  }

  return result;
}
