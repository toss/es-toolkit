/**
 * Built-in object types that key-conversion types like `ToCamelCaseKeys`
 * leave unchanged instead of mapping over their properties.
 */
export type NonPlainObject =
  | Date
  | RegExp
  | Map<any, any>
  | Set<any>
  | WeakMap<any, any>
  | WeakSet<any>
  | Promise<any>
  | Error
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | ((...args: any[]) => any)
  | typeof globalThis;
