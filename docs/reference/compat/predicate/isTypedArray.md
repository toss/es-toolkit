# isTypedArray (Lodash Compatibility)

::: warning Use `ArrayBuffer.isView()` or `instanceof` operator instead

This `isTypedArray` function is a Lodash compatibility function, but is a simple type check.

Use the simpler and more modern `ArrayBuffer.isView(value)` or `value instanceof Int8Array` etc. instead.

:::

Checks if a value is a TypedArray.

```typescript
const result = isTypedArray(x);
```

## Reference

### `isTypedArray(x)`

Use `isTypedArray` when you want to check if a value is a TypedArray. TypedArrays are special array types for handling binary data.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// TypedArrays
isTypedArray(new Uint8Array([1, 2, 3])); // true
isTypedArray(new Int16Array([1, 2, 3])); // true
isTypedArray(new Float32Array([1.1, 2.2])); // true
isTypedArray(new BigInt64Array([1n, 2n])); // true

// Other types return false
isTypedArray([1, 2, 3]); // false (regular array)
isTypedArray(new ArrayBuffer(16)); // false (ArrayBuffer)
isTypedArray(new DataView(new ArrayBuffer(16))); // false (DataView)
isTypedArray('array'); // false (string)
isTypedArray({}); // false (object)
isTypedArray(null); // false
isTypedArray(undefined); // false
```

It recognizes all kinds of TypedArrays.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// Integer TypedArrays
isTypedArray(new Int8Array()); // true
isTypedArray(new Int16Array()); // true
isTypedArray(new Int32Array()); // true
isTypedArray(new Uint8Array()); // true
isTypedArray(new Uint16Array()); // true
isTypedArray(new Uint32Array()); // true
isTypedArray(new Uint8ClampedArray()); // true

// Floating-point TypedArrays
isTypedArray(new Float32Array()); // true
isTypedArray(new Float64Array()); // true

// BigInt TypedArrays
isTypedArray(new BigInt64Array()); // true
isTypedArray(new BigUint64Array()); // true
```

It distinguishes from other similar objects.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
const typedArray = new Uint8Array(buffer);
const regularArray = [1, 2, 3, 4];

isTypedArray(buffer); // false (ArrayBuffer)
isTypedArray(view); // false (DataView)
isTypedArray(typedArray); // true (TypedArray)
isTypedArray(regularArray); // false (regular array)
```

It's useful for type distinction when processing binary data.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

function processData(data: unknown) {
  if (isTypedArray(data)) {
    console.log(`TypedArray length: ${data.length}`);
    console.log(`Byte length: ${data.byteLength}`);
    console.log(`Byte offset: ${data.byteOffset}`);
    console.log(`Constructor: ${data.constructor.name}`);

    // Output first value
    if (data.length > 0) {
      console.log(`First value: ${data[0]}`);
    }
  } else if (Array.isArray(data)) {
    console.log('Regular array');
  } else {
    console.log('Not an array');
  }
}

processData(new Uint8Array([1, 2, 3])); // TypedArray information output
processData([1, 2, 3]); // "Regular array"
processData('not an array'); // "Not an array"
```

#### Parameters

- `x` (`any`): The value to check if it's a TypedArray.

#### Returns

(`boolean`): Returns `true` if the value is a TypedArray, `false` otherwise.
