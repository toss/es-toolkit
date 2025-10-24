# once

Creates a new function that limits a function to be executed only once.

```typescript
const onceFunc = once(func);
```

## Reference

### `once(func)`

Use `once` when you want to limit a function to be executed only once. Subsequent calls will return the result from the first call.

This is useful for logic that should only be executed once, such as initialization functions or event handlers. It prevents duplicate execution and ensures consistent results.

```typescript
import { once } from 'es-toolkit/function';

// Example of an initialization function
const initialize = once(() => {
  console.log('Initializing app');
  return { status: 'initialized' };
});

console.log(initialize()); // Logs 'Initializing app', returns { status: 'initialized' }
console.log(initialize()); // Returns { status: 'initialized' } without logging
console.log(initialize()); // Returns { status: 'initialized' } without logging

// Example of an API call
const fetchConfig = once(async () => {
  console.log('Fetching configuration');
  const response = await fetch('/api/config');
  return response.json();
});

// Only the first call makes the actual API request
const config1 = await fetchConfig();
const config2 = await fetchConfig(); // Returns cached result
```

You can also use it with functions that take arguments.

```typescript
import { once } from 'es-toolkit/function';

const logOnce = once((message: string) => {
  console.log(`Important message: ${message}`);
});

logOnce('Hello'); // Logs 'Important message: Hello'
logOnce('Hello again'); // Not logged (already called)
logOnce('Hello once more'); // Not logged (already called)
```

#### Parameters

- `func` (`F`): The function to restrict to a single execution.

#### Returns

(`F`): Returns a new function that caches the result after the first call and returns the same result for subsequent calls.
