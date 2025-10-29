# delay

Delays code execution for a specified amount of time.

```typescript
await delay(ms, options?);
```

## Reference

### `delay(ms, options?)`

Use `delay` when you want to pause code execution for a specific amount of time. You can use it with async/await to make the next code execute after a certain time. If needed, you can also cancel the delay through an `AbortSignal`.

```typescript
import { delay } from 'es-toolkit/promise';

async function example() {
  console.log('Start');
  await delay(1000); // Delays execution for 1 second
  console.log('Executed after 1 second');

  await delay(500); // Delays for an additional 0.5 seconds
  console.log('Executed after an additional 0.5 seconds');
}

example();
```

You can also cancel the delay using AbortSignal:

```typescript
async function cancellableDelay() {
  const controller = new AbortController();
  const { signal } = controller;

  // Cancel the delay after 50ms
  setTimeout(() => controller.abort(), 50);

  try {
    await delay(1000, { signal });
    console.log('1 second has passed'); // This code won't execute
  } catch (error) {
    console.log('Delay was cancelled'); // AbortError is thrown
  }
}
```

It's also useful for simulating asynchronous behavior in tests.

```typescript
async function simulateNetworkRequest() {
  console.log('Starting network request...');
  await delay(2000); // Simulates a 2-second network delay
  console.log('Response received!');
  return { data: 'test' };
}
```

#### Parameters

- `ms` (`number`): The amount of time to delay in milliseconds.
- `options` (`DelayOptions`, optional): Delay options.
  - `signal` (`AbortSignal`, optional): An AbortSignal to cancel the delay.

#### Returns

(`Promise<void>`): Returns a Promise that completes after the specified time.

#### Errors

Throws `AbortError` when the AbortSignal is activated.
