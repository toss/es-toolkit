# after

Creates a new function that invokes the original function starting from the `n`-th call.

```typescript
const afterFunc = after(n, func);
```

## Usage

### `after(n, func)`

Use `after` when you want to ignore the first few calls and execute the function starting from the `n`-th call. This is useful when you need to perform an action only after a specific number of occurrences in events or asynchronous operations.

```typescript
import { after } from 'es-toolkit/function';

const afterFn = after(3, () => {
  console.log('executed');
});

// logs nothing
afterFn();
// logs nothing
afterFn();
// logs 'executed'
afterFn();
// logs 'executed'
afterFn();
```

#### Parameters

- `n` (`number`): The number of calls required before `func` is executed.
- `func` (`F`): The function to be executed.

#### Returns

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): A new function that tracks the number of calls and executes `func` starting from the `n`-th call. Returns `undefined` for calls before the `n`-th call.

#### Throws

Throws an error when `n` is not an integer or is negative.
