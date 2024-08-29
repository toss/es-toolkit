# TimeoutError

制限時間が過ぎたときに投げられるエラーです。

[timeout](../promise/timeout.md)や[withTimeout](../promise/withTimeout.md)のような操作の制限時間が過ぎたときに投げられます。

## インターフェース

```typescript
class TimeoutError extends Error {
  name = 'TimeoutError',
}
```
