# withTimeout

Executes an async function and enforces a timeout.

If the promise does not resolve within the specified time,
the timeout will trigger and the returned promise will be rejected.

## Signature

```typescript
function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T>;
```

### Parameters

- `run` (`() => Promise<T>`): A function that returns a promise to be executed.
- `ms` (`number`): The timeout duration in milliseconds.

### Returns

(`Promise<T>`): A promise that resolves with the result of the `run` function or rejects if the timeout is reached.

## Examples

### Basic Usage

```typescript
async function fetchData() {
  const response = await fetch('https://example.com/data');
  return response.json();
}

try {
  const data = await withTimeout(fetchData, 1000);
  console.log(data); // Logs the fetched data if `fetchData` is resolved within 1 second.
} catch (error) {
  console.error(error); // Will log 'TimeoutError' if `fetchData` is not resolved within 1 second.
}
```
