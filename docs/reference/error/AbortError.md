# AbortError

An error class representing an operation that was aborted.

It occurs when operations like [debounce](../function/debounce.md) or [delay](../promise/delay.md) are aborted using `AbortSignal`s.

## Interface

```typescript
class AbortError extends Error {
  name = 'AbortError',
}
```
