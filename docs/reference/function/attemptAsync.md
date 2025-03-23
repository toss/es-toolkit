# attemptAsync

Attempts to execute an async function and returns a tuple containing either the result or an error.

## Signature

```typescript
function attemptAsync<AttemptResult, AttemptError>(
  func: () => Promise<AttemptResult>
): Promise<[null, AttemptResult] | [AttemptError, null]>;
```

### Parameters

- `func` (`() => Promise<AttemptResult>`): The async function to attempt to execute.

### Returns

(`Promise<[null, AttemptResult] | [AttemptError, null]>`): A `Promise` that resolves to a tuple where:

- On success: `[null, AttemptResult]` - First element is `null`, second is the result
- On error: `[AttemptError, null]` - First element is the caught error, second is `null`

## Examples

```typescript
import { attemptAsync } from 'es-toolkit/function';

// Successful execution
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// If successful: [null, { ... data ... }]

// Failed execution
const [error, data] = await attemptAsync(async () => {
  throw new Error('Network error');
});
// [Error, null]

// With type parameter
const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users is typed as User[]
```
