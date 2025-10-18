# attemptAsync

Executes an async function and returns the result or error as a tuple.

```typescript
const [error, result] = await attemptAsync(func);
```

## Reference

### `attemptAsync(func)`

Use `attemptAsync` when you want to safely execute an async function. You can handle errors without wrapping async/await blocks in try-catch.

```typescript
import { attemptAsync } from 'es-toolkit/util';

// When API request succeeds
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// error is null, data contains response data

// When network error occurs
const [error, data] = await attemptAsync(async () => {
  throw new Error('Network error');
});
// error is Error object, data is null

// You can also specify types
interface User {
  id: number;
  name: string;
}

const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users is inferred as User[] type
```

It's especially useful when you need error handling in async operations like database queries or file reading.

```typescript
// File reading example
const [error, content] = await attemptAsync(async () => {
  const fs = await import('fs/promises');
  return fs.readFile('config.json', 'utf8');
});

if (error) {
  console.log('Cannot read file:', error.message);
} else {
  console.log('File content:', content);
}
```

::: info Use attempt for synchronous functions

This function is suitable for handling async functions (functions that return `Promise`). If you want to handle synchronous functions, we recommend using the [`attempt`](./attempt.md) function instead.

:::

#### Parameters

- `func` (`() => Promise<T>`): The async function to execute.

#### Returns

(`Promise<[null, T] | [E, null]>`): Returns a Promise that resolves to `[null, result]` on success, or `[error, null]` if an error occurs.
