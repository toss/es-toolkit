# delay

Delays the execution of code for a specified number of milliseconds.

This function returns a Promise that resolves after the specified delay, allowing you to use it
with async/await to pause execution.
It also supports an optional AbortSignal to cancel the delay.

## Signature

```typescript
function delay(ms: number, options?: DelayOptions): Promise<void>;
```

### Parameters

- `ms` (`number`): The number of milliseconds to delay.
- `options` (`DelayOptions`, optional): An options object.
  - `signal` (`AbortSignal`, optional): An optional `AbortSignal` to cancel the delay.

### Returns

(`Promise<void>`): A Promise that resolves after the specified delay.

## Examples

### Basic Usage

```typescript
async function foo() {
  console.log('Start');
  await delay(1000); // Delays execution for 1 second
  console.log('End');
}

foo();
```

### Using with an AbortSignal

```typescript
async function foo() {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 50); // Will cancel the delay after 50ms
  try {
    await delay(1000, { signal });
  } catch (error) {
    console.log(error); // Will log 'The operation was aborted'
  }
}
```

## Lodash Compatibility

Import `delay` from `es-toolkit/compat` for full compatibility with Lodash.

- `delay` accepts a function that will be invoked after a delay.
- `delay` accepts arguments that will be passed to the function.
- `delay` returns a timer ID that can be used to clear the timeout.

```typescript
import { delay } from 'es-toolkit/compat';

// Example 1: Delayed function execution
const timerId = delay(
  (greeting, recipient) => {
    console.log(`${greeting}, ${recipient}!`);
  },
  1000,
  'Hello',
  'Alice'
);
// => 'Hello, Alice!' will be logged after one second.

// Example 2: Clearing the timeout before execution
clearTimeout(timerId);
// The function will not be executed because the timeout was cleared.
```
