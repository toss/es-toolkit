# TimeoutError

一个表示超时的错误类。

当像 [timeout](../promise/timeout.md) 或 [withTimeout](../promise/withTimeout.md) 这样的操作超时时，会发生此错误。

## 接口

```typescript
class TimeoutError extends Error {
  name = 'TimeoutError',
}
```
