# timeout

지정한 시간보다 늦은 시간에 응답할 경우 `TimeoutError` 에러로 처리합니다.

이 함수는 특정한 시간 이후 보다 value의 응답이 늦게 올 경우 TimeoutErorr를 Exception하는 Promise를 반환해요. async/await 함수를 사용하는 경우에 함수의 최대 실행 시간을 정할 수 있어요. 또한, 선택 옵션으로 지연을 취소할 수 있는 AbortSignal을 지원해요.

## 인터페이스

```typescript
function timeout<T>(value: T, ms: number, options?: TimeoutOptions): Promise<Awaited<T>>;
```

### 파라미터

- `value` (`T`): 실행할 Promise 값.
- `ms` (`number`): Promise의 최대 실행 값을 지정할 밀리세컨드.
- `options` (`TimeoutOptions`, optional): 옵션 객체.
  - `signal` (`AbortSignal`, optional): timeout을 취소하기 위한 선택적 `AbortSignal`.

### 반환 값

(`Promise<Awaited<T>>`): 실행할 Promise의 반환 값.

## 예시

### 기본 사용법

```typescript
try {
  await timeout(new Promise(() => {}), 1000); // 코드 최대 시간을 1초로 지정
} catch (error) {
  console.error(error); // 'The operation was timed out' 로깅
}
```

### AbortSignal 사용법

```typescript
const controller = new AbortController();
const { signal } = controller;

setTimeout(() => controller.abort(), 50); // 50ms 후 timeout을 취소
try {
  await timeout(
    new Promise(() => {}),
    1000,
    { signal }
  );
} catch (error) {
  console.log(error); // 'The operation was aborted' 로깅
}
```
