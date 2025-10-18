# isTypedArray

Checks if a given value is a `TypedArray` instance.

```typescript
const result = isTypedArray(value);
```

## Reference

### `isTypedArray(value)`

Use `isTypedArray` when you want to check if a value is a [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) instance.

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

// TypedArray instances
const uint8 = new Uint8Array([1, 2, 3]);
const int16 = new Int16Array([1000, 2000]);
const float32 = new Float32Array([1.5, 2.5]);
const bigUint64 = new BigUint64Array([1n, 2n]);

console.log(isTypedArray(uint8)); // true
console.log(isTypedArray(int16)); // true
console.log(isTypedArray(float32)); // true
console.log(isTypedArray(bigUint64)); // true

// Non-TypedArray values
console.log(isTypedArray([1, 2, 3])); // false (regular array)
console.log(isTypedArray(new ArrayBuffer(8))); // false (ArrayBuffer)
console.log(isTypedArray(new DataView(new ArrayBuffer(8)))); // false (DataView)
console.log(isTypedArray({})); // false
console.log(isTypedArray(null)); // false
console.log(isTypedArray(undefined)); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a TypedArray instance.

#### Returns

(`value is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array`): Returns `true` if the value is a TypedArray instance, `false` otherwise.
