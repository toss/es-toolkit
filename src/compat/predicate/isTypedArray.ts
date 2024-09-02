import { isTypedArray as isTypedArrayToolkit } from '../../predicate/isTypedArray.ts';

/**
 * Checks if a value is a TypedArray.
 * @param x The value to check.
 * @returns Returns true if `x` is a TypedArray, false otherwise.
 */
export function isTypedArray(
  x?: unknown
): x is
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
  return isTypedArrayToolkit(x);
}
