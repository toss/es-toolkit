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
export function clone<T>(obj: T): Shallowed<T> {
  if (isPrimitive(obj)) {
    return obj as Shallowed<T>;
  }

  if (Array.isArray(obj)) {
    return obj.slice() as Shallowed<T>;
  }

  if (typeof obj === 'object') {
    // NATIVE CLASSES
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as Shallowed<T>;
    }

    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags) as Shallowed<T>;
    }

    if (obj instanceof Map) {
      const result = new Map();
      for (const [key, value] of obj) {
        result.set(key, value);
      }
      return result as Shallowed<T>;
    }

    if (obj instanceof Set) {
      const result = new Set();
      for (const value of obj) {
        result.add(value);
      }
      return result as Shallowed<T>;
    }

    // BINARY DATA
    if (obj instanceof Uint8Array) return new Uint8Array(obj) as Shallowed<T>;
    if (obj instanceof Uint8ClampedArray) return new Uint8ClampedArray(obj) as Shallowed<T>;
    if (obj instanceof Uint16Array) return new Uint16Array(obj) as Shallowed<T>;
    if (obj instanceof Uint32Array) return new Uint32Array(obj) as Shallowed<T>;
    if (obj instanceof BigUint64Array) return new BigUint64Array(obj) as Shallowed<T>;
    if (obj instanceof Int8Array) return new Int8Array(obj) as Shallowed<T>;
    if (obj instanceof Int16Array) return new Int16Array(obj) as Shallowed<T>;
    if (obj instanceof Int32Array) return new Int32Array(obj) as Shallowed<T>;
    if (obj instanceof BigInt64Array) return new BigInt64Array(obj) as Shallowed<T>;
    if (obj instanceof Float32Array) return new Float32Array(obj) as Shallowed<T>;
    if (obj instanceof Float64Array) return new Float64Array(obj) as Shallowed<T>;
    if (obj instanceof ArrayBuffer) return obj.slice(0) as Shallowed<T>;
    if (obj instanceof SharedArrayBuffer) return obj.slice(0) as Shallowed<T>;
    if (obj instanceof DataView) return new DataView(obj.buffer.slice(0)) as Shallowed<T>;
    if (obj instanceof File) return new File([obj], obj.name, { type: obj.type }) as Shallowed<T>;
    if (obj instanceof Blob) return new Blob([obj], { type: obj.type }) as Shallowed<T>;

    return Object.fromEntries(
      Object.entries(obj as any).filter(([_key, value]) => value !== undefined && typeof value !== 'function')
    ) as Shallowed<T>;
  }
  return obj as Shallowed<T>;
}

export type Shallowed<T> = Equal<T, ShallowMain<T>> extends true ? T : ShallowMain<T>;
type ShallowMain<T> = T extends [never]
  ? never
  : T extends object
    ? T extends
        | Array<any>
        | Set<any>
        | Map<any, any>
        | Date
        | RegExp
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
      : OmitNever<{
          [P in keyof T]: T[P] extends Function ? never : T[P];
        }>
    : T;

type Equal<X, Y> = X extends Y ? (Y extends X ? true : false) : false;
type OmitNever<T extends object> = Omit<T, SpecialFields<T, never>>;
type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type SpecialFields<Instance extends object, Target> = {
  [P in keyof Instance]: Instance[P] extends Target ? P : never;
}[keyof Instance & string];

function isPrimitive(value: unknown): value is Primitive {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}
