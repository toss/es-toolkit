# isTypedArray

Checks if a value is a [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray).

## Signature

```typescript
function isTypedArray(
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
  | Float64Array;
```

### Parameters

- `x` (`unknown`): The value to check.

### Returns

(`x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array`): True if the value is a TypedArray, otherwise false.

## Examples

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

const arr = new Uint8Array([1, 2, 3]);
isTypedArray(arr); // true

const regularArray = [1, 2, 3];
isTypedArray(regularArray); // false

const buffer = new ArrayBuffer(16);
isTypedArray(buffer); // false
```
