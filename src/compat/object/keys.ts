import { isBuffer } from '../../predicate/isBuffer.ts';
import { isPrototype } from '../_internal/isPrototype.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';
import { times } from '../util/times.ts';

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * Non-object values are coerced to objects.
 *
 * @param {object} object The object to query.
 * @returns {string[]} Returns the array of property names.
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 * Foo.prototype.c = 3;
 * keys(new Foo); // ['a', 'b'] (iteration order is not guaranteed)
 *
 * keys('hi'); // ['0', '1']
 * keys([1, 2, 3]); // ['0', '1', '2']
 * keys({ a: 1, b: 2 }); // ['a', 'b']
 */
export function keys(object?: any): string[] {
  if (isArrayLike(object)) {
    return arrayLikeKeys(object);
  }

  const result = Object.keys(Object(object));

  if (!isPrototype(object)) {
    return result;
  }

  return result.filter(key => key !== 'constructor');
}

function arrayLikeKeys(object: ArrayLike<any>): string[] {
  const indices = times(object.length, index => `${index}`);

  const filteredKeys = new Set(indices);

  if (isBuffer(object)) {
    // Node.js 0.10 has enumerable non-index properties on buffers.
    filteredKeys.add('offset');
    filteredKeys.add('parent');
  }

  if (isTypedArray(object)) {
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    filteredKeys.add('buffer');
    filteredKeys.add('byteLength');
    filteredKeys.add('byteOffset');
  }

  return [...indices, ...Object.keys(object).filter(key => !filteredKeys.has(key))];
}
