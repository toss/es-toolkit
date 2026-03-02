# isFile

Checks if a value is a File object.

```typescript
const result = isFile(value);
```

## Usage

### `isFile(value)`

Use `isFile` when you want to check if a value is a File instance. A File object represents a file uploaded by a user or obtained from the file system as part of the web API. Unlike Blob objects, it contains additional information such as the filename and last modified time.

```typescript
import { isFile } from 'es-toolkit/predicate';

// Checking File objects
const file = new File(['hello'], 'example.txt', { type: 'text/plain' });
console.log(isFile(file)); // true

// Blob objects are not Files
const blob = new Blob(['hello'], { type: 'text/plain' });
console.log(isFile(blob)); // false

// Regular objects
console.log(isFile({})); // false
console.log(isFile([])); // false
console.log(isFile('text')); // false
console.log(isFile(null)); // false
console.log(isFile(undefined)); // false
```

Can be used to validate if a given argument is a valid file.

```typescript
// File upload handler
function handleFileUpload(input: unknown) {
  if (isFile(input)) {
    console.log(`Filename: ${input.name}`);
    console.log(`File size: ${input.size} bytes`);
    console.log(`File type: ${input.type}`);
    console.log(`Last modified: ${input.lastModified}`);

    // Since it's confirmed to be a File, can safely access file-related properties
    return input;
  }

  throw new Error('Not a valid file');
}
```

Safely handles environments where `File` is not supported in JavaScript.

```typescript
// Safe in Node.js environment or environments without File support
console.log(isFile(new Date())); // false

// Does not error even in environments where File is not defined
if (typeof File === 'undefined') {
  console.log(isFile({})); // false
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a File object.

#### Returns

(`value is File`): Returns `true` if the value is a File object, `false` otherwise.
