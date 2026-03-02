# attempt

Executes a function and returns the result or error as a tuple.

```typescript
const [error, result] = attempt(func);
```

## Usage

### `attempt(func)`

Use `attempt` when you want to safely execute a function. It allows you to handle errors without wrapping code in try-catch blocks.

```typescript
import { attempt } from 'es-toolkit/util';

// Success case
const [error, result] = attempt(() => 42);
// error is null, result is 42

// Error case
const [error, result] = attempt(() => {
  throw new Error('Something went wrong');
});
// error is an Error object, result is null

// You can also specify types
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// names is inferred as string[] type
```

::: warning Do not use with async functions

This function is not suitable for async functions (functions that return a `Promise`). If you pass an async function, it will return `[null, Promise<T>]`, but it won't catch the error even if the Promise is rejected later.

For async functions, use the [`attemptAsync`](./attemptAsync.md) function instead.

```typescript
// Incorrect usage
const [error, promise] = attempt(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});

// Correct usage
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
```

:::

#### Parameters

- `func` (`() => T`): The function to execute.

#### Returns

(`[null, T] | [E, null]`): Returns `[null, result]` tuple on success, or `[error, null]` tuple on error.
