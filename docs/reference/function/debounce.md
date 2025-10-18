# debounce

Creates a debounced function that delays the invocation of a function.

```typescript
const debouncedFunc = debounce(func, debounceMs, options);
```

## Reference

### `debounce(func, debounceMs, options)`

Use `debounce` when you want to combine consecutive calls into one. The debounced function executes after the specified time has passed since the last call. This is useful for handling rapid events like search input or window resizing.

```typescript
import { debounce } from 'es-toolkit/function';

const debouncedFunction = debounce(() => {
  console.log('executed');
}, 1000);

// Logs 'executed' if not called again within 1 second
debouncedFunction();

// Cancels the previous call
debouncedFunction.cancel();

// Immediately executes the pending function
debouncedFunction.flush();
```

This can be useful for calling heavy APIs in response to user input, such as search.

```typescript
const searchInput = document.getElementById('search');
const searchResults = debounce(async (query: string) => {
  const results = await fetchSearchResults(query);
  displayResults(results);
}, 300);

searchInput.addEventListener('input', e => {
  searchResults(e.target.value);
});
```

You can cancel debounced function calls using [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal).

```typescript
const controller = new AbortController();
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('Function executed');
  },
  1000,
  { signal: controller.signal }
);

// Logs 'executed' if not called again within 1 second
debouncedWithSignalFunction();

// Cancels the debounce function call
controller.abort();
```

#### Parameters

- `func` (`F`): The function to create a debounced function from.
- `debounceMs`(`number`): The number of milliseconds to delay.
- `options` (`DebounceOptions`, optional): An options object.
  - `signal` (`AbortSignal`, optional): An optional `AbortSignal` to cancel the debounced function.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): An array indicating when to execute the original function. Defaults to `['trailing']`.
    - If `'leading'` is included, the original function is executed immediately on the first call to the debounced function.
    - If `'trailing'` is included, the original function is executed after `debounceMs` milliseconds have passed since the last call to the debounced function.
    - If both `'leading'` and `'trailing'` are included, the original function is called at both the start and end of the delay. However, the debounced function must be called at least twice within `debounceMs` milliseconds for this to happen, as a single call to the debounced function cannot trigger the original function twice.

#### Returns

(`DebouncedFunction<F>`): A debounced function with the following methods:

- `cancel()`: Cancels the scheduled invocation.
- `flush()`: Immediately executes the pending function.
- `schedule()`: Reschedules the function execution.
