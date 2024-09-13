# TimeoutError

제한 시간이 지났을 때 던져지는 에러예요.

[timeout](../promise/timeout.md)나 [withTimeout](../promise/withTimeout.md) 같은 작업의 제한 시간이 지났을 때 던져져요.

## 인터페이스

```typescript
class TimeoutError extends Error {
  name = 'TimeoutError',
}
```
