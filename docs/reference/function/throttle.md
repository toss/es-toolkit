# throttle

Creates a throttled function that only invokes the provided function at most once
per every `throttleMs` milliseconds. Subsequent calls to the throttled function
within the wait time will not trigger the execution of the original function.

## Signature

```typescript
function throttle<F extends (...args: any[]) => void>(func: F, throttleMs: number): (...args: Parameters<F>) => void;
```

### Parameters

- `func` (`F`): The function to throttle.
- `throttleMs`(`number`): The number of milliseconds to throttle executions to.

### Returns

(`(...args: Parameters<F>) => void`): A new throttled function.

## Examples

```typescript
const throttledFunction = throttle(() => {
  console.log('Function executed');
}, 1000);

// Will log 'Function executed' immediately
throttledFunction();

// Will not log anything as it is within the throttle time
throttledFunction();

// After 1 second
setTimeout(() => {
  throttledFunction(); // Will log 'Function executed'
}, 1000);
```

## Compatibility with Lodash

Import `throttle` from `es-toolkit/compat` for full compatibility with lodash.

- The `throttle` function accepts `leading` and `trailing` options:

  - `leading`: If true, the function runs immediately on the first call. (defaults to `true`)
  - `trailing`: If true, the function runs after `throttleMs` milliseconds have passed since the last call. (defaults to `true`)
  - If both `leading` and `trailing` are true, the function runs at both the start and end of the delay period. However, it must be called at least twice within `debounceMs` milliseconds for this to happen, as one throttled function call cannot trigger the function twice.

- By default, the `throttleMs` option is set to `0`, meaning the function execution is only delayed until the next tick.

::: info `leading` and `trailing` options in `throttle`

By default, both `leading` and `trailing` are set to `true`, so specifying `{ leading: true }` or `{ trailing: true }` won't change anything.

:::

```typescript
// Example with leading option
const leadingFn = throttle(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// Logs 'Leading function executed' immediately
// Logs 'Leading function executed' again every 1 second, even if called continuously
leadingFn();

// Example with trailing option
const trailingFn = throttle(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// Logs 'Trailing function executed' immediately
// Logs 'Trailing function executed' again every 1 second, even if called continuously
trailingFn();
```
