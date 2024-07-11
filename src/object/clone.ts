/**
 * Creates a shallow clone of the given value.
 *
 * @template T - The type of the value.
 * @param {T} value - The value to clone.
 * @returns {T} - A shallow clone of the value.
 *
 * @example
 * // Clone a primitive values
 * const num = 29;
 * const clonedNum = clone(num);
 * console.log(clonedNum); // 29
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
 * const obj = { a: 1, b: 'es-toolkit' };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: 'es-toolkit' }
 * console.log(clonedObj === obj); // false
 */
export function clone<T>(value: T): T {
  if (isPrimitive(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.slice() as T;
  }
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }
  if (typeof value === 'object') {
    return Object.assign({}, value) as T;
  }
  return value;
}

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

function isPrimitive(value: unknown): value is Primitive {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}
