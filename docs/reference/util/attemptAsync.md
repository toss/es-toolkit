# attemptAsync

::: info
This function is specifically designed for handling async functions (functions that return a `Promise`).
For handling synchronous functions, use the `attempt` function instead.
:::

Attempts to execute an async function and returns a tuple containing either the result or an error.

## Signature

```typescript
function attemptAsync<T, E>(func: () => Promise<T>): Promise<[null, T] | [E, null]>;
```

### Parameters

- `func` (`() => Promise<T>`): The async function to attempt to execute.

### Returns

(`Promise<[null, T] | [E, null]>`): A `Promise` that resolves to a tuple where:

- On success: `[null, T]` - First element is `null`, second is the result.
- On error: `[E, null]` - First element is the caught error, second is `null`.

## Examples

```typescript
import { attemptAsync } from 'es-toolkit/function';

// If the function returns a value without errors, it returns [null, function return value] tuple.
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// [null, response object]

// If an error occurs, it returns [error thrown by the function, null] tuple.
const [error, data] = await attemptAsync(async () => {
  throw new Error('Network error');
});
// [Error, null]

// Using generic types lets you specify the type of the error and return value.
const [error, users] = await attemptAsync<User[], Error>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// `error` is inferred as `Error` type, `users` is inferred as `User[]` type.
```
