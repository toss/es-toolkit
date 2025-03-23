# attempt

::: info
Important: This function is not suitable for async functions (functions that return a `Promise`).
When passing an async function, it will return `[null, Promise<T>]`, but won't catch any
errors if the Promise is rejected later.

For handling async functions, it is recommended to use the `attemptAsync` function instead.
:::

Attempts to execute a function and returns a tuple containing either the result or an error.

## Signature

```typescript
function attempt<T, E>(func: () => T): [null, T] | [E, null];
```

### Parameters

- `func` (`() => T`): The function to attempt to execute.

### Returns

(`[null, T] | [E, null]`): A tuple where:

- On success: `[null, T]` - First element is `null`, second is the result.
- On error: `[E, null]` - First element is the caught error, second is `null`.

## Examples

```typescript
import { attempt } from 'es-toolkit/function';

// If the function succeeds, it returns [null, function return value] tuple.
const [error, result] = attempt(() => 42);
// [null, 42]

// If an error occurs, it returns [error thrown by the function, null] tuple.
const [error, result] = attempt(() => {
  throw new Error('Something went wrong');
});
// [Error, null]

// Using generic types lets you specify the type of the error and return value.
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// `error` is inferred as `Error` type, `names` is inferred as `string[]` type.
```
