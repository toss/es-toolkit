/**
 * Checks if a value is a TypedArray.
 * @param {unknown} x The value to check.
 * @returns {x is
 *     Uint8Array
 *   | Uint8ClampedArray
 *   | Uint16Array
 *   | Uint32Array
 *   | BigUint64Array
 *   | Int8Array
 *   | Int16Array
 *   | Int32Array
 *   | BigInt64Array
 *   | Float32Array
 *   | Float64Array} Returns true if `x` is a TypedArray, false otherwise.
 */
export function isTypedArray(
  x: unknown
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
  return (
    x instanceof Uint8Array ||
    x instanceof Uint8ClampedArray ||
    x instanceof Uint16Array ||
    x instanceof Uint32Array ||
    x instanceof BigUint64Array ||
    x instanceof Int8Array ||
    x instanceof Int16Array ||
    x instanceof Int32Array ||
    x instanceof BigInt64Array ||
    x instanceof Float32Array ||
    x instanceof Float64Array
  );
}
