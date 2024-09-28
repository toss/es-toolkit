# withTimeout

지정한 시간보다 늦은 시간에 응답할 경우 `TimeoutError` 에러로 처리해요.

이 함수는 특정한 시간 이후 보다 value의 응답이 늦게 올 경우 TimeoutError로 reject되는 Promise를 반환해요. async/await 함수를 사용하는 경우에 함수의 최대 실행 시간을 정할 수 있어요.

## 인터페이스

```typescript
function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T>;
```

### 파라미터

- `run` (`() => Promise<T>`): 실행할 비동기 함수.
- `ms` (`number`): Promise의 최대 실행 값을 지정할 밀리세컨드.

### 반환 값

(`Promise<T>`): 주어진 비동기 함수가 반환하는 `Promise`.

## 예시

### 기본 사용법

```typescript
async function fetchData() {
  const response = await fetch('https://example.com/data');
  return response.json();
}

try {
  const data = await withTimeout(fetchData, 1000);
  console.log(data); // `fetchData`가 1초 이내에 완료되면 가져온 데이터를 로깅해요.
} catch (error) {
  console.error(error); // `fetchData`가 1초 이내에 완료되지 않으면 'TimeoutError'를 로깅해요.
}
```
