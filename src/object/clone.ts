import { isTypedArray } from '../predicate/isTypedArray.ts';
import { isPrimitive } from '../predicate/isPrimitive.ts';

/**
 * Creates a shallow clone of the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @returns {T} - A shallow clone of the given object.
 *
 * @example
 * // Clone a primitive values
 * const num = 29;
 * const clonedNum = clone(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num) ; // true
 *
 * @example
 * // Clone an array
 * const arr = [1, 2, 3];
 * const clonedArr = clone(arr);
 * console.log(clonedArr); // [1, 2, 3]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
 * console.log(clonedObj === obj); // false
 */
export function clone<T>(obj: T): T {
  if (isPrimitive(obj)) {
    return obj;
  }

  if (Array.isArray(obj) || isTypedArray(obj) || obj instanceof ArrayBuffer || obj instanceof SharedArrayBuffer) {
    return obj.slice(0) as T;
  }

  const prototype = Object.getPrototypeOf(obj);
  const Constructor = prototype.constructor;

  if (obj instanceof Date || obj instanceof Map || obj instanceof Set) {
    return new Constructor(obj);
  }

  if (obj instanceof RegExp) {
    const newRegExp = new Constructor(obj);
    newRegExp.lastIndex = obj.lastIndex;

    return newRegExp;
  }

  if (obj instanceof DataView) {
    return new Constructor(obj.buffer.slice(0));
  }

  if (obj instanceof Error) {
    const newError = new Constructor(obj.message);

    newError.stack = obj.stack;
    newError.name = obj.name;
    newError.cause = obj.cause;

    return newError;
  }

  if (typeof File !== 'undefined' && obj instanceof File) {
    const newFile = new Constructor([obj], obj.name, { type: obj.type, lastModified: obj.lastModified });
    return newFile;
  }

  if (typeof obj === 'object') {
    const newObject = Object.create(prototype);
    return Object.assign(newObject, obj);
  }

  return obj;
}
