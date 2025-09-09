# attemptAsync

::: info
이 함수는 비동기 함수(`Promise`를 반환하는 함수)를 처리하는데 적합해요.
동기 함수를 처리하려면 `attempt` 함수를 대신 사용하는 것을 권장해요.
:::

비동기 함수를 실행하고 결과 또는 오류를 포함하는 튜플을 반환해요.

## 인터페이스

```typescript
function attemptAsync<T, E>(func: () => Promise<T>): Promise<[null, T] | [E, null]>;
```

### 파라미터

- `func` (`() => Promise<T>`): 실행을 시도할 비동기 함수예요.

### 반환 값

(`Promise<[null, T] | [E, null]>`): 다음과 같은 튜플로 해결되는 `Promise`를 반환해요:

- 성공 시: `[null, T]` - 첫 번째 요소는 `null`, 두 번째 요소는 결과값예요.
- 에러 발생 시: `[E, null]` - 첫 번째 요소는 포착된 오류, 두 번째 요소는 `null`예요.

## 예시

```typescript
import { attemptAsync } from 'es-toolkit/util';

// 성공시에는 [null, 함수의 반환값] 튜플을 반환해요.
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// [null, 응답 객체]

// 에러가 발생하면 [함수가 던진 에러, null] 튜플을 반환해요.
const [error, data] = await attemptAsync(async () => {
  throw new Error('네트워크 오류');
});
// [Error, null]

// 제네릭 타입 사용하면 함수가 던진 에러와 반환값의 타입을 지정할 수 있어요.
const [error, users] = await attemptAsync<User[], Error>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// `error`는 `Error` 타입으로, `users`는 `User[]` 타입으로 추론돼요.
```
