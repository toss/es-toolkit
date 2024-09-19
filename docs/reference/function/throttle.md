# throttle

Creates a throttled function that only invokes the provided function at most once
per every `throttleMs` milliseconds. Subsequent calls to the throttled function
within the wait time will not trigger the execution of the original function.

## Signature

```typescript
function throttle<F extends (...args: any[]) => void>(
  func: F,
  throttleMs: number,
  options?: ThrottleOptions
): ((...args: Parameters<F>) => void) & {
  cancel: () => void;
  flush: () => void;
};
```

### Parameters

- `func` (`F`): The function to throttle.
- `throttleMs`(`number`): The number of milliseconds to throttle executions to.
- `options` (`ThrottleOptions`, optional): An options object.
  - `signal` (`AbortSignal`, optional): An optional `AbortSignal` to cancel the throttled function.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): An array specifying when the function should be called. Defaults to `['leading', 'trailing']`.
    - `'leading'`: If included, the function will be called immediately on the first call.
    - `'trailing'`: If included, the function will be called after `throttleMs` milliseconds have passed since the last call.
    - If both `'leading'` and `'trailing'` are included, the function will be called at both the start and end of the delay period. However, it must be called at least twice within `throttleMs` milliseconds for this to happen, as one throttled function call cannot trigger the function twice.

### Returns

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; }`): A new throttled function with methods to manage execution.

- `cancel` (`() => void`): Cancels any pending execution of the throttled function.
- `flush` (`() => void`): Immediately invokes the throttled function, executing any pending calls.

## Examples

### Basic usage

```typescript
const throttledFunction = throttle(() => {
  console.log('Function executed');
}, 1000);

// Will log 'Function executed' immediately
throttledFunction(); // First call triggers execution immediately

// Will log 'Function executed' after 1 second
throttledFunction(); // Second call is within the throttle period but triggers after 1 second due to trailing edge behavior

// After 2 seconds
setTimeout(() => {
  throttledFunction(); // Will log 'Function executed' again
}, 2000); // This will log because the throttle period has passed
```

### Usage with window events

```typescript
// Example function to throttle
const logResize = () => {
  console.log('Window resized at', new Date().toISOString());
};

// Create a throttled version of the logResize function
const throttledResizeHandler = throttle(logResize, 1000);

// Attach the throttled function to the window resize event
window.addEventListener('resize', throttledResizeHandler);

// Optional: Clean up the event listener when no longer needed
const cleanup = () => {
  window.removeEventListener('resize', throttledResizeHandler);
};

// Example: Clean up after 10 seconds
setTimeout(cleanup, 10000);
```

## Compatibility with Lodash

Import `throttle` from `es-toolkit/compat` for full compatibility with lodash.

- The `throttle` function accepts `leading` and `trailing` options:

  - `leading`: If true, the function runs immediately on the first call. (defaults to `true`)
  - `trailing`: If true, the function runs after `throttleMs` milliseconds have passed since the last call. (defaults to `true`)

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
