/**
 * Creates a shallow clone of the given object.
 *
 * @template T - The type of the object.
 * @param obj - The object to clone.
 * @returns - A shallow clone of the given object.
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

  if (Array.isArray(obj)) {
    return obj.slice() as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  if (obj instanceof Map) {
    const result = new Map();
    for (const [key, value] of obj) {
      result.set(key, value);
    }
    return result as T;
  }

  if (obj instanceof Set) {
    const result = new Set();
    for (const value of obj) {
      result.add(value);
    }
    return result as T;
  }

  if (typeof obj === 'object') {
    const prototype = Object.getPrototypeOf(obj);
    const result = Object.create(prototype);
    return Object.assign(result, obj);
  }
  return obj;
}

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

function isPrimitive(value: unknown): value is Primitive {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}
