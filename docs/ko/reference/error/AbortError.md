# AbortError

작업이 중단되거나 취소되었을 때 던져지는 에러예요.

[debounce](../function/debounce.md)나 [delay](../promise/delay.md)와 같은 작업이 `AbortSignal`로 취소되었을 때 던져져요.

## 인터페이스

```typescript
class AbortError extends Error {
  name = 'AbortError',
}
```
