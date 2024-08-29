# AbortError

操作が中断または取り消された時にスローされるエラーです。

[debounce](../function/debounce.md)や[delay](../promise/delay.md)などの操作が`AbortSignal`によってキャンセルされた時にスローされます。

## インターフェース

```typescript
class AbortError extends Error {
  name = 'AbortError',
}
```
