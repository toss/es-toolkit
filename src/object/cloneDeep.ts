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

  if (isTypedArray(obj)) {
    const result = new (Object.getPrototypeOf(obj).constructor)(obj.length);
    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeep(obj[i]);
    }
    return result as T;
  }

  if (obj instanceof ArrayBuffer || obj instanceof SharedArrayBuffer) {
    return obj.slice(0) as T;
  }

  if (obj instanceof DataView) {
    const result = new DataView(obj.buffer.slice(0));
    cloneDeepHelper(obj, result);
    return result as T;
  }

  if (obj instanceof File) {
    const result = new File([obj], obj.name, { type: obj.type });
    cloneDeepHelper(obj, result);
    return result as T;
  }

  if (obj instanceof Blob) {
    const result = new Blob([obj], { type: obj.type });
    cloneDeepHelper(obj, result);
    return result as T;
  }

  if (obj instanceof Event) {
    const result = new (obj.constructor as { new (type: string, init: EventInit): Event })(obj.type, {
      bubbles: obj.bubbles,
      cancelable: obj.cancelable,
      composed: obj.composed,
    });
    cloneDeepHelper(obj, result);
    return result as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = Object.create(Object.getPrototypeOf(obj));
    cloneDeepHelper(obj, result);
    return result as T;
  }

  return obj;
}

type Primitive = null | undefined | string | number | boolean | symbol | bigint;
function isPrimitive(value: unknown): value is Primitive {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}

// eslint-disable-next-line
function cloneDeepHelper(obj: any, clonedObj: any): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);
      if (descriptor?.writable || descriptor?.set) {
        clonedObj[key] = cloneDeep(obj[key]);
      }
    }
  }
}

function isTypedArray(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any
): obj is
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | BigUint64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigInt64Array
  | Float32Array
  | Float64Array {
  return (
    obj instanceof Uint8Array ||
    obj instanceof Uint8ClampedArray ||
    obj instanceof Uint16Array ||
    obj instanceof Uint32Array ||
    obj instanceof BigUint64Array ||
    obj instanceof Int8Array ||
    obj instanceof Int16Array ||
    obj instanceof Int32Array ||
    obj instanceof BigInt64Array ||
    obj instanceof Float32Array ||
    obj instanceof Float64Array
  );
}
