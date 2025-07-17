import { isFunction } from '../../predicate/isFunction.ts';

/**
 * Returns an array of property names whose values are functions, including inherited properties.
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
export function functionsIn<T extends {}>(object: any): string[] {
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
