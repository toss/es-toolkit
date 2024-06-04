# debounce

Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
method to cancel any pending execution.

## Signature

```typescript
function debounce<F extends (...args: any[]) => void>(func: F, debounceMs: number): F & { cancel: () => void };
```

### Parameters 

- `func` (`F`): The function to debounce.
- `debounceMs`(`number`): The number of milliseconds to delay.

### Returns

(`F & { cancel: () => void }`): A new debounced function with a `cancel` method.


## Examples

```typescript
const debouncedFunction = debounce(() => {
  console.log('Function executed');
}, 1000);

// Will log 'Function executed' after 1 second if not called again in that time
debouncedFunction();

// Will not log anything as the previous call is canceled
debouncedFunction.cancel();
```
