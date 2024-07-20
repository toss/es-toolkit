# timeout

Returns a `Promise` that rejects with a `TimeoutError` after the specified timeout.

## Signature

```typescript
function timeout(ms: number): Promise<never>;
```

### Parameters

- `ms` (`number`): The number of milliseconds for the promise to reject with `TimeoutError`.

### Returns

(`Promise<never>`): A Promise that rejects after the specified timeout.

## Examples

### Basic Usage

```typescript
try {
  await timeout(1000); // Timeout exception after 1 second
} catch (error) {
  console.error(error); // Will log 'The operation was timed out'
}
```
