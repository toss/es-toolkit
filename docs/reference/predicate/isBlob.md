# isBlob

Checks if a value is a Blob instance.

```typescript
const result = isBlob(value);
```

## Usage

### `isBlob(value)`

Use `isBlob` when you want to check if a value is a Blob instance. Useful when handling files or binary data in browser environments.

```typescript
import { isBlob } from 'es-toolkit/predicate';

// Basic Blob instances
const blob = new Blob(['hello'], { type: 'text/plain' });
const file = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(blob)); // true
console.log(isBlob(file)); // true (File extends Blob)

// Non-Blob values
console.log(isBlob(new ArrayBuffer(8))); // false
console.log(isBlob('text data')); // false
console.log(isBlob({})); // false
console.log(isBlob(null)); // false
```

Useful for file processing and API response validation.

```typescript
import { isBlob } from 'es-toolkit/predicate';

// Processing uploaded files
function processUploadedFile(file: unknown) {
  if (isBlob(file)) {
    // TypeScript infers file as Blob
    console.log(`File size: ${file.size} bytes`);
    console.log(`MIME type: ${file.type}`);

    // Safely use Blob methods
    file.text().then(text => console.log('Content:', text));
  } else {
    console.log('Invalid file');
  }
}

// Implementing download functionality
async function handleDownload(data: unknown, filename: string) {
  if (isBlob(data)) {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Blob instance.

#### Returns

(`value is Blob`): Returns `true` if the value is a Blob instance, `false` otherwise.
