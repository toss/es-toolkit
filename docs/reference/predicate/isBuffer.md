# isBuffer

Checks if a value is a Buffer instance.

```typescript
const result = isBuffer(value);
```

## Usage

### `isBuffer(value)`

Use `isBuffer` when you want to check if a value is a Buffer object in Node.js environments. Useful for file processing, network communication, and binary data manipulation. It acts as a type guard in TypeScript, narrowing the value's type to `Buffer`.

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// Checking Buffer instances
const buffer = Buffer.from('hello world', 'utf8');
isBuffer(buffer); // true

// Distinguishing from other types
isBuffer('hello world'); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer(new ArrayBuffer(8)); // false
```

Particularly useful when used as a type guard in TypeScript.

```typescript
import { isBuffer } from 'es-toolkit/predicate';

function processData(data: unknown) {
  if (isBuffer(data)) {
    // data is narrowed to Buffer
    console.log(`Buffer size: ${data.length} bytes`);
    console.log(`Buffer content: ${data.toString('utf8')}`);

    // Can safely use Buffer methods
    const slice = data.slice(0, 10);
  }
}
```

Frequently used in file processing and network communication.

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// Processing file data
function readFileData(data: unknown) {
  if (isBuffer(data)) {
    const text = data.toString('utf8');
    const header = data.readUInt32BE(0);
    console.log('File content:', text);
  }
}

// Processing network data
function handleNetworkData(chunk: unknown) {
  if (isBuffer(chunk)) {
    console.log(`Received data size: ${chunk.length} bytes`);
    const processed = Buffer.concat([chunk, Buffer.from('\n')]);
    return processed;
  }
  return null;
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Buffer instance.

#### Returns

(`boolean`): Returns `true` if the value is a Buffer instance, `false` otherwise.
