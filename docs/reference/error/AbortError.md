# AbortError

An error class representing an aborted or canceled operation.

```typescript
const error = new AbortError(message);
```

## Reference

### `new AbortError(message?)`

An error class used when an operation is aborted or canceled. It is thrown when operations like [debounce](../function/debounce.md) or [delay](../promise/delay.md) are canceled with an `AbortSignal`.

```typescript
import { AbortError } from 'es-toolkit/error';

// Create an error with the default message.
throw new AbortError();
// Error message: 'The operation was aborted'

// Create an error with a custom message.
throw new AbortError('File upload was canceled');
// Error message: 'File upload was canceled'
```

An example of using it with AbortSignal.

```typescript
import { delay, AbortError } from 'es-toolkit';

async function fetchData(signal: AbortSignal) {
  try {
    await delay(1000, { signal });
    return 'Data loaded';
  } catch (error) {
    if (error instanceof AbortError) {
      console.log('Operation was canceled');
    }
    throw error;
  }
}

const controller = new AbortController();
controller.abort(); // Cancel operation
await fetchData(controller.signal); // Throws AbortError
```

#### Parameters

- `message` (`string`, optional): The error message. Defaults to `'The operation was aborted'`.

### Returns

(`AbortError`): Returns an error instance representing an aborted operation. It inherits from `Error` and the `name` property is `'AbortError'`.
