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
- `delay`: The interval between retries, measured in milliseconds (ms). The default is `0`.
- `signal`: An `AbortSignal` that can be used to cancel the retries.

### Returns

(`Promise<T>`): The value returned by the `func` function.

### Errors

An error occurs when the number of retries reaches `retries` or when canceled by the `AbortSignal`.

## Examples

```typescript
// Retry indefinitely until `fetchData` succeeds.
const data1 = await retry(() => fetchData());
console.log(data1);

// Retry only 3 times until `fetchData` succeeds.
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// Retry only 3 times until `fetchData` succeeds, with a 100ms interval in between.
const data3 = await retry(() => fetchData(), { retries: 3, delay: 100 });
console.log(data3);

const controller = new AbortController();

// The retry operation for `fetchData` can be canceled with the `signal`.
const data4 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data4);
```
