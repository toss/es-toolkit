# retry

Retries a function that returns a `Promise` until it succeeds. You can specify how many times to retry and the delay between each attempt.

## Signature

```typescript
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;
function retry<T>(func: () => Promise<T>, { retries, delay, signal }: RetryOptions): Promise<T>;
```

### Parameters

- `func` (`() => Promise<T>`): A function that returns a `Promise`.
- `retries`: The number of times to retry. The default is `Number.POSITIVE_INFINITY`, which means it will retry until it succeeds.
- `retryMinDelay`: The minimum delay between retries, measured in milliseconds (ms). The default is `0`.
- `retryMaxDelay`: The maximum delay between retries, measured in milliseconds (ms). The default is `Infinity`.
- `factor`: A factor to adjust the retry interval. The default is `1`.
- `randomize`: Whether to add a random factor to the delay based on the factor. The default is `false`.
- `signal`: An `AbortSignal` that can be used to cancel the retries.

### Returns

(`Promise<T>`): The value returned by the `func` function.

### Errors

An error occurs when the number of retries reaches `retries` or when canceled by the `AbortSignal`.

## Examples

```typescript
// Retries indefinitely until `fetchData` succeeds.
const data1 = await retry(() => fetchData());
console.log(data1);

// Retries up to 3 times until `fetchData` succeeds.
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// Retries up to 3 times with a fixed delay of 100ms between retries.
const data3 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100 });
console.log(data3);

// Retries with an exponentially increasing delay (100ms, 200ms, 400ms).
const data4 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, factor: 2 });
console.log(data4);

// Retries with exponential backoff and random delay (100~200ms range).
// The delay for each retry is calculated as follows:
// 1. The base delay is `retryMinDelay * factor^attempt`.
// 2. The calculated delay is capped at `retryMaxDelay`.
// 3. If `randomize` is true, the delay is randomized within a 1~2x range.
//
// Example:
// - First retry: 100~200ms
// - Second retry: 200~400ms
// - Third retry: 400~800ms
const data5 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, retryMaxDelay: 1000, randomize: true });
console.log(data5);

const controller = new AbortController();

// The retry operation can be canceled using an `AbortSignal`.
const data6 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data6);
```
