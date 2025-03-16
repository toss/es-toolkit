/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 *
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the function names.
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
    return Object.keys(object).filter((key) => typeof object[key] === 'function');
}
