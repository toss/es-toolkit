# after

Creates a function that only executes starting from the `n`-th call.
The provided function will be invoked starting from the `n`-th call.

The is particularly useful for scenarios involving events or asynchronous operations where an action should occur only after a certain number of invocations.

## Signature

```typescript
function after<F extends (...args: any[]) => any>(n: number, func: F): F;
```

### Parameters

- `n` (`number`): The number of calls required for `func` to execute.
- `func` (`F`): The function to be invoked.

### Returns

(`F`): A new function that:

- Tracks the number of calls.
- Invokes `func` starting from the `n`-th call.
- Returns `undefined` if fewer than `n` calls have been made.

### Throws

Throws an error if `n` is negative.

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
