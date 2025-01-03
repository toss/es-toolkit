# retry

이 기능은 재시도 간격과 재시도 횟수를 설정하고, 최대 재시도 횟수에 도달하면 오류를 발생시킵니다.

## 인터페이스

```typescript
function retry<T>(func: () => Promise<T>, options: RetryOptions): T;
```

### 파라미터

- `func` (`F`): 다시 시도하는 기능입니다.
- `options` (`RetryOptions`): 옵션 객체.
  - `intervalMs`: 간격 지연의 밀리초 수입니다.
  - `retries`: 재시도 횟수입니다.

### 반환 값

(`Awaited<ReturnType<F>>`): 함수 반환 값.

### Error

재시도 횟수가 `retries`에 도달하면 오류가 발생합니다.

## 예시

```typescript
async function getNumber() {
  return Promise.resolve(3);
}
async function getError() {
  return Promise.reject(new Error('MyFailed'));
}
// 결과는 3이 됩니다
await retry(getNumber, {
  intervalMs: 1000,
  retries: 2,
});
// 2번 실행 후 예외가 발생합니다.
await retry(getError, {
  intervalMs: 1000,
  retries: 2,
});
```
