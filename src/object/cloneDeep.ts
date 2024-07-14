/**
 * Creates a deep clone of the given object.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to clone.
 * @returns {T} - A deep clone of the given object.
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
 * // Clone an array with nested objects
 * const arr = [1, { a: 1 }, [1, 2, 3]];
 * const clonedArr = clone(arr);
 * arr[1].a = 2;
 * console.log(arr); // [2, { a: 2 }, [1, 2, 3]]
 * console.log(clonedArr); // [1, { a: 1 }, [1, 2, 3]]
 * console.log(clonedArr === arr); // false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
 * console.log(clonedObj === obj); // false
 *
 * @example
 * // Clone an object with nested objects
 * const obj = { a: 1, b: { c: 1 } };
 * const clonedObj = clone(obj);
 * obj.b.c = 2;
 * console.log(obj); // { a: 1, b: { c: 2 } }
 * console.log(clonedObj); // { a: 1, b: { c: 1 } }
 * console.log(clonedObj === obj); // false
 */
export function cloneDeep<T>(obj: T): T {
  if (isPrimitive(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cloneDeep(item)) as T;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  if (obj instanceof Map) {
    const result = new Map();
    for (const [key, value] of obj.entries()) {
      result.set(key, cloneDeep(value));
    }
    return result as T;
  }

  if (obj instanceof Set) {
    const result = new Set();
    for (const value of obj.values()) {
      result.add(cloneDeep(value));
    }
    return result as T;
  }

  if (typeof obj === 'object') {
    const result = obj ? new (obj.constructor as unknown as new () => Record<string, unknown>)() : {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = cloneDeep(value);
    }
    return result as T;
  }

  return obj;
}

export default cloneDeep;

type Primitive = null | undefined | string | number | boolean | symbol | bigint;
function isPrimitive(value: unknown): value is Primitive {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}
