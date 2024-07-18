# withTimeout

지정한 시간보다 늦은 시간에 응답할 경우 `TimeoutError` 에러로 처리해요.

이 함수는 특정한 시간 이후 보다 value의 응답이 늦게 올 경우 TimeoutError로 reject되는 Promise를 반환해요. async/await 함수를 사용하는 경우에 함수의 최대 실행 시간을 정할 수 있어요.

## 인터페이스

```typescript
function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T>;
```

### 파라미터

- `run` (`() => Promise<T>`): 실행할 Promise 값.
- `ms` (`number`): Promise의 최대 실행 값을 지정할 밀리세컨드.

### 반환 값

(`Promise<T>`): 실행할 Promise의 반환 값.

## 예시

### 기본 사용법

```typescript
try {
  await withTimeout(() => new Promise(() => {}), 1000); // 코드 최대 시간을 1초로 지정
} catch (error) {
  console.error(error); // 'The operation was timed out' 로깅
}
```
