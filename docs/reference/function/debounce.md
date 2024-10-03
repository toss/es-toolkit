# debounce

Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
method to cancel any pending execution.

## Signature

```typescript
function debounce<F extends (...args: any[]) => void>(
  func: F,
  debounceMs: number,
  options?: DebounceOptions
): ((...args: Parameters<F>) => void) & {
  cancel: () => void;
  flush: () => void;
  schedule: () => void;
};
```

### Parameters

- `func` (`F`): The function to debounce.
- `debounceMs` (`number`): The number of milliseconds to delay.
- `options` (`DebounceOptions`, optional): An options object.
  - `signal` (`AbortSignal`, optional): An optional `AbortSignal` to cancel the debounced function.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): An array specifying when the function should be called. Defaults to `['trailing']`.
    - `'leading'`: If included, the function will be called immediately on the first call.
    - `'trailing'`: If included, the function will be called after `debounceMs` milliseconds have passed since the last call.
    - If both `'leading'` and `'trailing'` are included, the function will be called at both the start and end of the delay period. However, it must be called at least twice within `debounceMs` milliseconds for this to happen, as one debounced function call cannot trigger the function twice.

### Returns

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; schedule: () => void; }`): A new debounced function with methods to manage execution.

- `cancel` (`() => void`): Cancels any pending execution of the debounced function.
- `flush` (`() => void`): Immediately invokes the debounced function, executing any pending calls.
- `schedule` (`() => void`): Schedules the execution of the debounced function after the specified debounce delay.

## Examples

### Basic Usage

```typescript
const debouncedFunction = debounce(() => {
  console.log('Function executed');
}, 1000);

// Will log 'Function executed' after 1 second if not called again in that time
debouncedFunction();

// Will not log anything as the previous call is canceled
debouncedFunction.cancel();
```

### Using with an AbortSignal

```typescript
const controller = new AbortController();
const signal = controller.signal;
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('Function executed');
  },
  1000,
  { signal }
);

// Will log 'Function executed' after 1 second if not called again in that time
debouncedWithSignalFunction();

// Will cancel the debounced function call
controller.abort();
```

## Compatibility with Lodash

Import `debounce` from `es-toolkit/compat` for full compatibility with lodash.

- The `debounce` function accepts `leading` and `trailing` options:

  - `leading`: If true, the function runs immediately on the first call. (defaults to `false`)
  - `trailing`: If true, the function runs after `debounceMs` milliseconds have passed since the last call. (defaults to `true`)

- The `debounce` function also accepts a `maxWait` option:

  - This is the maximum time the function is allowed to be delayed before it is called.

- By default, the `debounceMs` option is set to `0`, meaning the function execution is only delayed until the next tick.

::: info The meaning of `{ leading: true }`

Since `trailing` is `true` by default, setting debounce to `{ leading: true }` will make both `leading` and `trailing` true.

:::

```typescript
// Example with leading option
const leadingFn = debounce(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// Will log 'Leading function executed' immediately
leadingFn();

// Example with trailing option
const trailingFn = debounce(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// Will log 'Trailing function executed' after 1 second if not called again in that time
trailingFn();

// Example with maxWait option
const maxWaitFn = debounce(
  () => {
    console.log('MaxWait function executed');
  },
  1000,
  { maxWait: 2000 }
);

// Will log 'MaxWait function executed' after 2 seconds if called repeatedly within 1 second intervals
maxWaitFn();
setTimeout(maxWaitFn, 500);
setTimeout(maxWaitFn, 1000);
setTimeout(maxWaitFn, 1500);
setTimeout(maxWaitFn, 2000);
setTimeout(maxWaitFn, 2500);
setTimeout(maxWaitFn, 3000);
```
