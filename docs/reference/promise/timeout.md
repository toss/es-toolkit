# timeout

If it responds later than the specified time, it is treated as a `TimeoutError` error.

This function returns a Promise that resolves after the specified timeout, allowing you to use it
with async/await to timeout execution.

## Signature

```typescript
function timeout(ms: number): Promise<void>;
```

### Parameters

- `ms` (`number`): The number of milliseconds to timeout.

### Returns

(`Promise<void>`): A Promise that resolves after the specified timeout.

## 예시

### 기본 사용법

```typescript
try {
  await timeout(1000); // Timeout exception after 1 second
} catch (error) {
  console.error(error); // Will log 'The operation was timed out'
}
```
