# TimeoutError

An error class representing an timeout.

It occurs when operations like [timeout](../promise/timeout.md) or [withTimeout](../promise/withTimeout.md) have timed out.

## Interface

```typescript
class TimeoutError extends Error {
  name = 'TimeoutError',
}
```
