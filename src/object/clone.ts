import { isPrimitive } from '../predicate/isPrimitive.ts';
import { isTypedArray } from '../predicate/isTypedArray.ts';

/**
 * Creates a shallow clone of the given object.
 *
 * @template T - The type of the object.
 * @param obj - The object to clone.
 * @returns A shallow clone of the given object.
 *
 * @example
 * // Clone a primitive value
 * const num = 29;
 * const clonedNum = clone(num);
 * console.log(clonedNum); // 29
 * console.log(clonedNum === num); // true
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

  if (
    Array.isArray(obj) ||
    isTypedArray(obj) ||
    obj instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer !== 'undefined' && obj instanceof SharedArrayBuffer)
  ) {
    return obj.slice(0) as T;
  }

  const prototype = Object.getPrototypeOf(obj);

  if (prototype == null) {
    return Object.assign(Object.create(prototype), obj);
  }

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
    let newError;
    if (obj instanceof AggregateError) {
      newError = new Constructor(obj.errors, obj.message, { cause: obj.cause });
    } else {
      newError = new Constructor(obj.message, { cause: obj.cause });
    }

    newError.stack = obj.stack;
    Object.assign(newError, obj);

    return newError;
  }

  if (typeof File !== 'undefined' && obj instanceof File) {
    const newFile = new Constructor([obj], obj.name, { type: obj.type, lastModified: obj.lastModified });
    return newFile;
  }

  if (obj instanceof Boolean || obj instanceof Number || obj instanceof String) {
    // Read the wrapped primitive from the intrinsic slot rather than `obj.valueOf()`,
    // which can be shadowed by an own property and return the wrong value.
    const primitive =
      obj instanceof Boolean
        ? Boolean.prototype.valueOf.call(obj)
        : obj instanceof Number
          ? Number.prototype.valueOf.call(obj)
          : String.prototype.valueOf.call(obj);
    const cloned = new Constructor(primitive);

    // Shallow-copy any extra own enumerable properties (string and symbol keys,
    // matching the generic `Object.assign` path), skipping intrinsic non-writable
    // ones such as a String wrapper's indexed characters.
    const keys: PropertyKey[] = [
      ...Object.keys(obj),
      ...Object.getOwnPropertySymbols(obj).filter(symbol => Object.prototype.propertyIsEnumerable.call(obj, symbol)),
    ];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const descriptor = Object.getOwnPropertyDescriptor(cloned, key);

      if (descriptor == null || descriptor.writable) {
        cloned[key] = obj[key as keyof typeof obj];
      }
    }

    return cloned;
  }

  if (typeof obj === 'object') {
    const newObject = Object.create(prototype);
    return Object.assign(newObject, obj);
  }

  return obj;
}
