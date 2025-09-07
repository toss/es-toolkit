# after

Creates a function that only executes from the `n`-th call onwards, ignoring any previous calls.

```typescript
const newFunc = after(n, func);
```

## Reference

### `after(n, func)`

When you want to ignore the first few calls and have the function execute starting from the `n`-th call, use the `after` function.

```typescript
import { after } from 'es-toolkit';

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

### Parameters

- `n` (`number`): The number of calls required for `func` to execute.
- `func` (`F`): The function to be invoked.

### Returns

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): A new function that:

- Tracks the number of calls.
- Invokes `func` starting from the `n`-th call.
- Returns `undefined` until the number of calls reaches `n`.

### Errors

Throws an error if `n` is negative.
