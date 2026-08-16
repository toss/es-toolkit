# attemptAsync

비동기 함수를 실행하고 결과나 에러를 튜플로 반환해요.

```typescript
const [error, result] = await attemptAsync(func);
```

## 사용법

### `attemptAsync(func)`

비동기 함수를 안전하게 실행하고 싶을 때 `attemptAsync`를 사용하세요. async/await 블록을 try-catch로 감싸지 않고도 에러를 처리할 수 있어요.

```typescript
import { attemptAsync } from 'es-toolkit/util';

// API 요청 성공하는 경우
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// error는 null, data는 응답 데이터

// 네트워크 에러가 발생하는 경우
const [error, data] = await attemptAsync(async () => {
  throw new Error('네트워크 오류');
});
// error는 Error 객체, data는 null

// 타입을 명시할 수도 있어요
interface User {
  id: number;
  name: string;
}

const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users는 User[] 타입으로 추론돼요
```

데이터베이스 쿼리나 파일 읽기 같은 비동기 작업에서 에러 처리가 필요할 때 특히 유용해요.

```typescript
// 파일 읽기 예시
const [error, content] = await attemptAsync(async () => {
  const fs = await import('fs/promises');
  return fs.readFile('config.json', 'utf8');
});

if (error) {
  console.log('파일을 읽을 수 없어요:', error.message);
} else {
  console.log('파일 내용:', content);
}
```

::: info 동기 함수에는 attempt를 사용하세요

이 함수는 비동기 함수(`Promise`를 반환하는 함수)를 처리하는데 적합해요. 동기 함수를 처리하려면 [`attempt`](./attempt.md) 함수를 대신 사용하는 것을 권장해요.

:::

#### 파라미터

- `func` (`() => Promise<T>`): 실행할 비동기 함수예요.

#### 반환 값

(`Promise<[null, T] | [E, null]>`): 성공하면 `[null, 결과값]`, 에러가 발생하면 `[에러, null]` 튜플로 해결되는 Promise를 반환해요.
