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
export function cloneDeep<T>(obj: T): Resolved<T> {
  if (isPrimitive(obj)) {
    return obj as Resolved<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cloneDeep(item)) as Resolved<T>;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as Resolved<T>;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as Resolved<T>;
  }

  if (obj instanceof Map) {
    const result = new Map();
    for (const [key, value] of obj.entries()) {
      result.set(key, cloneDeep(value));
    }
    return result as Resolved<T>;
  }

  if (obj instanceof Set) {
    const result = new Set();
    for (const value of obj.values()) {
      result.add(cloneDeep(value));
    }
    return result as Resolved<T>;
  }

  if (isTypedArray(obj)) {
    const result = new (Object.getPrototypeOf(obj).constructor)(obj.length);
    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeep(obj[i]);
    }
    return result as Resolved<T>;
  }

  if (
    obj instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer !== 'undefined' && obj instanceof SharedArrayBuffer)
  ) {
    return obj.slice(0) as Resolved<T>;
  }

  if (obj instanceof DataView) {
    const result = new DataView(obj.buffer.slice(0));
    cloneDeepHelper(obj, result);
    return result as Resolved<T>;
  }

  // For legacy NodeJS support
  if (typeof File !== 'undefined' && obj instanceof File) {
    const result = new File([obj], obj.name, { type: obj.type });
    cloneDeepHelper(obj, result);
    return result as Resolved<T>;
  }

  if (obj instanceof Blob) {
    const result = new Blob([obj], { type: obj.type });
    cloneDeepHelper(obj, result);
    return result as Resolved<T>;
  }

  if (obj instanceof Error) {
    const result = new (obj.constructor as { new (): Error })();
    result.message = obj.message;
    result.name = obj.name;
    result.stack = obj.stack;
    result.cause = obj.cause;
    cloneDeepHelper(obj, result);
    return result as Resolved<T>;
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    cloneDeepHelper(obj, result);
    return result as Resolved<T>;
  }

  if (typeof obj === 'function') {
    return void 0 as Resolved<T>;
  }

  return obj as Resolved<T>;
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
      if ((descriptor?.writable || descriptor?.set) && typeof descriptor?.value !== 'function') {
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

export type Resolved<T> = Equal<T, ResolvedMain<T>> extends true ? T : ResolvedMain<T>;

type Equal<X, Y> = X extends Y ? (Y extends X ? true : false) : false;

type ResolvedMain<T> = T extends [never]
  ? never // (special trick for jsonable | null) type
  : ValueOf<T> extends boolean | number | bigint | string
    ? ValueOf<T>
    : T extends (...args: any[]) => any
      ? never
      : T extends object
        ? ResolvedObject<T>
        : ValueOf<T>;

type ResolvedObject<T extends object> =
  T extends Array<infer U>
    ? IsTuple<T> extends true
      ? ResolvedTuple<T>
      : Array<ResolvedMain<U>>
    : T extends Set<infer U>
      ? Set<ResolvedMain<U>>
      : T extends Map<infer K, infer V>
        ? Map<ResolvedMain<K>, ResolvedMain<V>>
        : T extends WeakSet<any> | WeakMap<any, any>
          ? never
          : T extends
                | Date
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
                | Float64Array
                | ArrayBuffer
                | SharedArrayBuffer
                | DataView
                | Blob
                | File
            ? T
            : {
                [P in keyof T]: ResolvedMain<T[P]>;
              };

type ResolvedTuple<T extends readonly any[]> = T extends []
  ? []
  : T extends [infer F]
    ? [ResolvedMain<F>]
    : T extends [infer F, ...infer Rest extends readonly any[]]
      ? [ResolvedMain<F>, ...ResolvedTuple<Rest>]
      : T extends [(infer F)?]
        ? [ResolvedMain<F>?]
        : T extends [(infer F)?, ...infer Rest extends readonly any[]]
          ? [ResolvedMain<F>?, ...ResolvedTuple<Rest>]
          : [];

type IsTuple<T extends readonly any[] | { length: number }> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false;

type ValueOf<Instance> =
  IsValueOf<Instance, boolean> extends true
    ? boolean
    : IsValueOf<Instance, number> extends true
      ? number
      : IsValueOf<Instance, string> extends true
        ? string
        : Instance;

type IsValueOf<Instance, O extends IValueOf<any>> = Instance extends O
  ? O extends IValueOf<infer Primitive>
    ? Instance extends Primitive
      ? false
      : true // not Primitive, but Object
    : false // cannot be
  : false;

interface IValueOf<T> {
  valueOf(): T;
}
