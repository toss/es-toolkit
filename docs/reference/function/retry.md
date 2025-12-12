# retry

Retries a Promise-returning function until it succeeds.

```typescript
const result = await retry(asyncFunc, options);
```

## Usage

### `retry(func, options?)`

Use `retry` when you want to automatically retry an asynchronous function that fails. This is useful for operations that can temporarily fail, such as API calls or network requests.

You can configure the number of retries, retry interval, and cancellation signal. The retry interval can be a fixed value or a function that dynamically calculates based on the retry count.

```typescript
import { retry } from 'es-toolkit/function';

// Basic usage (infinite retries)
const data1 = await retry(async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
});

// Limit retry count
const data2 = await retry(async () => {
  return await fetchData();
}, 3);

// Set retry interval (100ms)
const data3 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 3,
    delay: 100,
  }
);

// Dynamic retry interval (exponential backoff)
const data4 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 5,
    delay: attempts => Math.min(100 * Math.pow(2, attempts), 5000),
  }
);
```

You can also cancel retries using AbortSignal.

```typescript
import { retry } from 'es-toolkit/function';

const controller = new AbortController();

// Cancel retry after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const data = await retry(
    async () => {
      return await fetchData();
    },
    {
      retries: 10,
      delay: 1000,
      signal: controller.signal,
    }
  );
  console.log(data);
} catch (error) {
  console.log('Retry was canceled or failed:', error);
}
```

#### Parameters

- `func` (`() => Promise<T>`): The asynchronous function to retry.
- `options` (`number | RetryOptions`, optional): The number of retries or options object.
  - `retries` (`number`, optional): The number of times to retry. Defaults to `Infinity` for infinite retries.
  - `delay` (`number | (attempts: number) => number`, optional): The retry interval (in milliseconds). Can be a number or a function. Defaults to `0`.
  - `signal` (`AbortSignal`, optional): A signal that can cancel retries.

#### Returns

(`Promise<T>`): Returns the result of the successfully executed function.

#### Throws

Throws the last error when the retry count is exceeded or when canceled by AbortSignal.
