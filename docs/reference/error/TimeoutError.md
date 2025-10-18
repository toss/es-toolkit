# TimeoutError

An error class representing an operation that has timed out.

```typescript
const error = new TimeoutError(message);
```

## Reference

### `new TimeoutError(message?)`

An error class used when an operation's time limit has been exceeded. It is thrown when operations like [timeout](../promise/timeout.md) or [withTimeout](../promise/withTimeout.md) have timed out.

```typescript
import { TimeoutError } from 'es-toolkit/error';

// Create an error with the default message.
throw new TimeoutError();
// Error message: 'The operation was timed out'

// Create an error with a custom message.
throw new TimeoutError('API request has timed out');
// Error message: 'API request has timed out'
```

An example of using it with timeout.

```typescript
import { timeout, TimeoutError } from 'es-toolkit';

async function fetchWithTimeout(url: string) {
  try {
    const response = await timeout(() => fetch(url), 3000);
    return response;
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.log('Request has timed out');
    }
    throw error;
  }
}

// Throws TimeoutError if it takes more than 3 seconds
await fetchWithTimeout('https://example.com/api/slow');
```

#### Parameters

- `message` (`string`, optional): The error message. Defaults to `'The operation was timed out'`.

### Returns

(`TimeoutError`): Returns an error instance representing a timed out operation. It inherits from `Error` and the `name` property is `'TimeoutError'`.
