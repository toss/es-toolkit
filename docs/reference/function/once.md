# once

Creates a function that is restricted to invoking the provided function `func` once.
Repeated calls to the function will return the value from the first invocation.

## Signature

```typescript
function once<F extends () => any>(func: F): F;
function once<F extends (...args: any[]) => void>(func: F): F;
```

### Parameters

- `func` (`F extends (() => any) | ((...args: any[]) => void)`): The function to restrict.

### Returns

(`F`): A new function that invokes `func` once and caches the result.

## Examples

```typescript
const initialize = once(() => {
  console.log('Initialized!');
  return true;
});

initialize(); // Logs: 'Initialized!' and returns true
initialize(); // Returns true without logging
```
