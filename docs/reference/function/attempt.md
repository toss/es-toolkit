# attempt

::: info
Important: This function is not suitable for async functions (functions that return a `Promise`).
When passing an async function, it will return `[null, Promise<AttemptResult>]`, but won't catch any
errors if the Promise is rejected later.

For handling async functions, use the `attemptAsync` function instead.
:::

Attempts to execute a function and returns a tuple containing either the result or an error.

## Signature

```typescript
function attempt<AttemptResult, AttemptError>(func: () => AttemptResult): [null, AttemptResult] | [AttemptError, null];
```

### Parameters

- `func` (`() => AttemptResult`): The function to attempt to execute.

### Returns

(`[null, AttemptResult] | [AttemptError, null]`): A tuple where:

- On success: `[null, AttemptResult]` - First element is `null`, second is the result
- On error: `[AttemptError, null]` - First element is the caught error, second is `null`

## Examples

```typescript
import { attempt } from 'es-toolkit/function';

// Successful execution
const [error, result] = attempt(() => 42);
// [null, 42]

// Failed execution
const [error, result] = attempt(() => {
  throw new Error('Something went wrong');
});
// [Error, null]

// With type parameter
const [error, names] = attempt<string[]>(() => ['Alice', 'Bob']);
// [null, ['Alice', 'Bob']]
```
