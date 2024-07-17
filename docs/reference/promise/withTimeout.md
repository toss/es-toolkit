# withTimeout

If it responds later than the specified time, it is treated as a `TimeoutError` error.

This function returns a Promise that resolves after the specified timeout, allowing you to use it
with async/await to timeout execution.
It also supports an optional AbortSignal to cancel the timeout.

## Signature

```typescript
function withTimeout<T>(value: () => Promise<T>, ms: number, options?: WithTimeoutOptions): Promise<T>;
```

### Parameters

- `value` (`() => Promise<T>`): The type of promise value.
- `ms` (`number`): The number of milliseconds to timeout.
- `options` (`WithTimeoutOptions`, optional): An options object.
  - `signal` (`AbortSignal`, optional): An optional `AbortSignal` to cancel the timeout.

### Returns

(`Promise<T>`): A Promise that resolves after the specified timeout.

## Examples

### Basic Usage

```typescript
try {
  await withTimeout(() => new Promise(() => {}), 1000); // Timeout exception after 1 second
} catch (error) {
  console.error(error); // Will log 'The operation was timed out'
}
```

### Using with an AbortSignal

```typescript
const controller = new AbortController();
const { signal } = controller;

setTimeout(() => controller.abort(), 50); // Will cancel the timeout after 50ms
try {
  await withTimeout(() => new Promise(() => {}), 1000, { signal });
} catch (error) {
  console.log(error); // Will log 'The operation was aborted'
}
```
