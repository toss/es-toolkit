# AbortError

一个表示操作被中止的错误类。

当像 [debounce](../function/debounce.md) 或 [delay](../promise/delay.md) 这样的操作通过 `AbortSignal` 被中止时，会发生此错误。

## 接口

```typescript
class AbortError extends Error {
  name = 'AbortError',
}
```
