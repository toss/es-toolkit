# after

It creates a function that only executes after being called a specified number of times. This is particularly useful for scenarios involving events or asynchronous operations where an action should occur only after a certain number of invocations.

## Signature

```typescript
function after<F extends (...args: any[]) => any>(n: number, func: F): F;
```

### Parameters

- `n` (`number`): The number of calls required before `func` is invoked. For example, if `n` is `3`, the function `func` will be invoked only after the returned
  function has been called a total of `3` times. The `func` will be executed on the `n`th call and subsequent calls.
- `func` (`F`): The function to be invoked.

### Returns

(`F`): A new function that:

- Tracks the number of calls.
- Calls `func` only after being invoked `n` times.
- Returns `undefined` if fewer than `n` calls have been made.

### Throws

Throws an error if `n` is a negative integer.

## Examples

```typescript
import { after } from 'es-toolkit/function';

const mockFn = () => {
  console.log('called');
};
const afterFn = after(3, mockFn);

// Will not log anything.
afterFn();
// Will not log anything.
afterFn();
// Will log 'called'.
afterFn();
```
