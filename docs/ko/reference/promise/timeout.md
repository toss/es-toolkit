# timeout

지정한 시간 뒤에 `TimeoutError` 에러와 함께 reject되는 `Promise`를 반환해요.

## 인터페이스

```typescript
function timeout(ms: number): Promise<never>;
```

### 파라미터

- `ms` (`number`): `TimeoutError` 에러와 함께 reject될 때까지 걸릴 밀리세컨드.

### 반환 값

(`Promise<never>`): `TimeoutError`로 reject될 Promise.

## 예시

### 기본 사용법

```typescript
try {
  await timeout(1000); // 1초 뒤 TimeoutError 에러 발생
} catch (error) {
  console.error(error); // 'The operation was timed out' 로깅
}
```
