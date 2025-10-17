# once (Lodash Compatibility)

::: warning Use `es-toolkit`'s `once`

This `once` function has the same functionality as the main library [once](../../function/once.md) function in `es-toolkit`.

:::

Restricts a function to be called only once.

```typescript
const limitedFunc = once(func);
```

## Reference

### `once(func)`

Use `once` when you want to restrict a function to be called only once. After the first call, the result is cached and the same value is returned.

```typescript
import { once } from 'es-toolkit/compat';

// Basic usage
let count = 0;
const increment = once(() => {
  count++;
  console.log('Counter incremented:', count);
  return count;
});

increment(); // Outputs 'Counter incremented: 1', returns 1
increment(); // Outputs nothing, returns 1
increment(); // Outputs nothing, returns 1

// Practical example - initialization function
const initialize = once(() => {
  console.log('Initializing application...');
  // Expensive initialization operations
  return 'Initialization complete';
});

// Even if called multiple times, initialization runs only once
initialize(); // Outputs 'Initializing application...'
initialize(); // Outputs nothing
```

It's useful when creating expensive initialization operations or setup functions. For example, it can be used for database connections, API token initialization, etc.

#### Parameters

- `func` (`Function`): The function to restrict to only one call.

#### Returns

(`Function`): Returns a new function that is called only once. From the second call onwards, it returns the result of the first call.
