# timeout

Returns a `Promise` that throws a `TimeoutError` after the specified time.

```typescript
await timeout(ms, options?);
```

## Usage

### `timeout(ms, options?)`

Use `timeout` when you want to throw a timeout error after a specific time has passed. It's useful when used together with `Promise.race()` to set time limits on tasks.

```typescript
import { timeout } from 'es-toolkit/promise';

// Basic usage - throws TimeoutError after 1 second
try {
  await timeout(1000);
  console.log('This code will not execute');
} catch (error) {
  console.log('Timeout error occurred:', error.message); // 'The operation was timed out'
}
```

You can use it with `Promise.race()` to set time limits on tasks:

```typescript
async function fetchWithTimeout(url: string) {
  try {
    const result = await Promise.race([
      fetch(url),
      timeout(5000), // 5 second limit
    ]);
    return result;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.log('Request is taking too long');
    }
    throw error;
  }
}
```

You can also use it when you want to fail the entire operation if any of multiple asynchronous tasks don't complete within the specified time.

```typescript
async function multipleOperationsWithTimeout() {
  try {
    await Promise.race([
      Promise.all([fetch('/api/data1'), fetch('/api/data2'), fetch('/api/data3')]),
      timeout(3000), // 3 second limit for all tasks
    ]);
    console.log('All tasks completed on time');
  } catch (error) {
    console.log('Tasks did not complete on time');
  }
}
```

You can pass an `AbortSignal` to cancel the timeout. Unlike `delay`, aborting does not reject the Promise. Because `timeout` only exists to lose a `Promise.race()`, cancelling it leaves the Promise pending so the operation it guards can finish without the time limit.

```typescript
const controller = new AbortController();

// Lift the 1 second limit when the user chooses to keep waiting.
keepWaitingButton.onclick = () => controller.abort();

const result = await Promise.race([
  doWork(),
  timeout(1000, { signal: controller.signal }), // never rejects once aborted
]);
```

#### Parameters

- `ms` (`number`): The amount of time in milliseconds until the `TimeoutError` is thrown.
- `options` (`TimeoutOptions`, optional): Timeout options.
  - `signal` (`AbortSignal`, optional): An AbortSignal to cancel the timeout. When aborted, the returned Promise stays pending and never rejects.

#### Returns

(`Promise<never>`): Returns a Promise that rejects with a `TimeoutError` after the specified time. If the `AbortSignal` is aborted first, the Promise never settles.

#### Errors

Throws `TimeoutError` after the specified time has passed. Aborting the `AbortSignal` does not throw; it cancels the timeout so the Promise stays pending.
