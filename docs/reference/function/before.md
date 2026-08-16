# before

Creates a new function that limits the number of times a function can be called.

```typescript
const limitedFunc = before(n, func);
```

## Usage

### `before(n, func)`

Use `before` when you want to limit a function to be executed only up to a specific number of times. The function will execute until the `n-1`-th call, and from the `n`-th call onwards, it will no longer execute.

```typescript
import { before } from 'es-toolkit/function';

const beforeFn = before(3, () => {
  console.log('executed');
});

// Logs 'executed'
beforeFn();

// Logs 'executed'
beforeFn();

// Logs nothing
beforeFn();

// Logs nothing
beforeFn();
```

This is useful for tasks that should only be executed once, such as initialization or setup.

```typescript
let initialized = false;

const initialize = before(2, () => {
  console.log('Initializing...');
  initialized = true;
});

// Logs 'Initializing...' and performs initialization
initialize();

// Does nothing as it's already initialized
initialize();
```

#### Parameters

- `n` (`number`): The maximum number of times the returned function can call `func`. If `n` is 0, `func` will not be called. If it's a positive integer, it will be called up to `n-1` times.
- `func` (`F`): The function whose invocation count will be limited.

#### Returns

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): A new function that tracks the number of calls and executes `func` only up to the `n-1`-th call. Returns `undefined` for calls from the `n`-th onwards.

#### Throws

Throws an error when `n` is not an integer or is negative.
