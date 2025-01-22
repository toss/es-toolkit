import { isBuffer } from '../../predicate/isBuffer.ts';
import { isPrototype } from '../_internal/isPrototype.ts';
import { isArrayLike } from '../predicate/isArrayLike.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';
import { times } from '../util/times.ts';

/**
 * This function retrieves the names of string-keyed properties from an object, including those inherited from its prototype.
 *
 * - If the value is not an object, it is converted to an object.
 * - Array-like objects are treated like arrays.
 * - Sparse arrays with some missing indices are treated like dense arrays.
 * - If the value is `null` or `undefined`, an empty array is returned.
 * - When handling prototype objects, the `constructor` property is excluded from the results.
 *
 * @param {unknown} [object] - The object to inspect for keys.
 * @returns {string[]} An array of string keys from the object.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * console.log(keysIn(obj)); // ['a', 'b']
 *
 * const arr = [1, 2, 3];
 * console.log(keysIn(arr)); // ['0', '1', '2']
 *
 * function Foo() {}
 * Foo.prototype.a = 1;
 * console.log(keysIn(new Foo())); // ['a']
 */
export function keysIn(object?: unknown): string[] {
  if (object == null) {
    return [];
  }

  switch (typeof object) {
    case 'object':
    case 'function': {
      if (isArrayLike(object)) {
        return arrayLikeKeysIn(object);
      }

      if (isPrototype(object)) {
        return prototypeKeysIn(object);
      }

      return keysInImpl(object);
    }

    default: {
      return keysInImpl(Object(object));
    }
  }
}

function keysInImpl(object: object): string[] {
  const result: string[] = [];

  for (const key in object) {
    result.push(key);
  }

  return result;
}

function prototypeKeysIn(object: object): string[] {
  const keys = keysInImpl(object);

  return keys.filter(key => key !== 'constructor');
}

function arrayLikeKeysIn(object: ArrayLike<any>): string[] {
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

  return [...indices, ...keysInImpl(object).filter(key => !filteredKeys.has(key))];
}
