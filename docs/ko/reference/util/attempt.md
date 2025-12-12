# attempt

함수를 실행하고 결과나 에러를 튜플로 반환해요.

```typescript
const [error, result] = attempt(func);
```

## 사용법

### `attempt(func)`

함수를 안전하게 실행하고 싶을 때 `attempt`를 사용하세요. try-catch 블록으로 감싸지 않고도 에러를 처리할 수 있어요.

```typescript
import { attempt } from 'es-toolkit/util';

// 성공하는 경우
const [error, result] = attempt(() => 42);
// error는 null, result는 42

// 에러가 발생하는 경우
const [error, result] = attempt(() => {
  throw new Error('문제가 발생했어요');
});
// error는 Error 객체, result는 null

// 타입을 명시할 수도 있어요
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// names는 string[] 타입으로 추론돼요
```

::: warning 비동기 함수에는 사용하지 마세요

이 함수는 비동기 함수(`Promise`를 반환하는 함수)에는 적합하지 않아요. 비동기 함수를 전달하면 `[null, Promise<T>]`가 반환되지만, Promise가 나중에 거부(reject)되더라도 오류를 포착하지 못해요.

비동기 함수를 처리하려면 [`attemptAsync`](./attemptAsync.md) 함수를 대신 사용하세요.

```typescript
// 잘못된 사용
const [error, promise] = attempt(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});

// 올바른 사용
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
```

:::

#### 파라미터

- `func` (`() => T`): 실행할 함수예요.

#### 반환 값

(`[null, T] | [E, null]`): 성공하면 `[null, 결과값]`, 에러가 발생하면 `[에러, null]` 튜플을 반환해요.
