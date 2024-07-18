# timeout

지정한 시간 뒤에 `TimeoutError` 에러를 처리해요.

이 함수는 특정한 시간 이후에 TimeoutError로 reject되는 Promise를 반환해요. async/await 함수를 사용하는 경우에 함수의 최대 실행 시간을 정할 수 있어요.

## 인터페이스

```typescript
function timeout(ms: number): Promise<void>;
```

### 파라미터

- `ms` (`number`): Promise의 최대 실행 값을 지정할 밀리세컨드.

### 반환 값

(`Promise<void>`): 실행할 Promise의 반환 값.

## 예시

### 기본 사용법

```typescript
try {
  await timeout(1000); // 1초 뒤 TimeoutError 에러 발생
} catch (error) {
  console.error(error); // 'The operation was timed out' 로깅
}
```
