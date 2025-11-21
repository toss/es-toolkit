# isArrayBuffer

Checks if a value is an `ArrayBuffer` instance.

```typescript
const result = isArrayBuffer(value);
```

## Usage

### `isArrayBuffer(value)`

Use `isArrayBuffer` when you want to check if a value is an `ArrayBuffer`. It can also be used as a type guard in TypeScript.

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// Checking ArrayBuffer instances
const buffer = new ArrayBuffer(16);
const notBuffer = new Array(16);

console.log(isArrayBuffer(buffer)); // true
console.log(isArrayBuffer(notBuffer)); // false

// Useful when processing binary data
const data: unknown = getDataFromAPI();
if (isArrayBuffer(data)) {
  // In TypeScript, data is narrowed to ArrayBuffer
  const uint8View = new Uint8Array(data);
  console.log(`Buffer size: ${data.byteLength} bytes`);
}

// Comparison with various types
console.log(isArrayBuffer(new ArrayBuffer(8))); // true
console.log(isArrayBuffer(new Uint8Array(8))); // false
console.log(isArrayBuffer(new DataView(new ArrayBuffer(8)))); // false
console.log(isArrayBuffer([])); // false
console.log(isArrayBuffer({})); // false
console.log(isArrayBuffer(null)); // false
console.log(isArrayBuffer(undefined)); // false
```

Frequently used in file processing and network communication.

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// Processing file read results
async function processFileData(file: File) {
  const result = await file.arrayBuffer();

  if (isArrayBuffer(result)) {
    console.log(`File size: ${result.byteLength} bytes`);

    // Process binary data
    const view = new DataView(result);
    const header = view.getUint32(0, true);
    console.log(`File header: ${header.toString(16)}`);
  }
}

// Checking data received from WebSocket
function handleWebSocketMessage(data: unknown) {
  if (isArrayBuffer(data)) {
    console.log('Received binary message');
    const bytes = new Uint8Array(data);
    // Process byte data
  } else if (typeof data === 'string') {
    console.log('Received text message');
    // Process string data
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's an `ArrayBuffer`.

#### Returns

(`value is ArrayBuffer`): Returns `true` if the value is an `ArrayBuffer`, `false` otherwise.
