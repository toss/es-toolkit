# before

Creates a new function that limits the number of times the given function (`func`) can be called.

## Signature

```typescript
function before<F extends (...args: unkown[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined;
```

### Parameters

- `n` (`number`): The number of times the returned function is allowed to call `func` before stopping.
  - If `n` is 0, `func` will not be called.
  - If `n` is a positive integer, `func` will be called up to `n-1` times.
- `func` (`F`): The function to be called with the limit applied.

### Returns

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): A new function that:

- Tracks the number of calls.
- Invokes `func` until the `n-1`-th call.
- Returns `undefined` if the number of calls reaches or exceeds `n`, stopping further calls.

### Error

Throws an error if `n` is negative.

## Example

```typescript
import { before } from 'es-toolkit/function';

const beforeFn = before(3, () => {
  console.log('called');
});

// Will log 'called'.
beforeFn();

// Will log 'called'.
beforeFn();

// Will not log anything.
beforeFn();
```
