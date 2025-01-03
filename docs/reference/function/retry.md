# retry

This function can set the retry interval and the number of retries, and throw an Error after the maximum number of retries is reached.

## Signature

```typescript
function retry<T>(func: () => Promise<T>, options: RetryOptions): T;
```

### Parameters

- `func` (`F`): The function to retry.
- `options` (`RetryOptions`): An options object.
  - `intervalMs`: The number of milliseconds to interval delay.
  - `retries`: The number of retries to attemptcalled.

### Returns

(`Awaited<ReturnType<F>>`): Function return value

### Error

Throws an error if the number of retries reaches `retries`

## Examples

```typescript
async function getNumber() {
  return Promise.resolve(3);
}
async function getError() {
  return Promise.reject(new Error('MyFailed'));
}
// The result will be 3
await retry(getNumber, {
  intervalMs: 1000,
  retries: 2,
});
// After executing twice, an exception is thrown
await retry(getError, {
  intervalMs: 1000,
  retries: 2,
});
```
