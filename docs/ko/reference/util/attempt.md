# attempt

::: info
중요: 이 함수는 비동기 함수(`Promise`를 반환하는 함수)에는 적합하지 않아요.
비동기 함수를 전달하면 `[null, Promise<T>]`가 반환되지만, Promise가
나중에 거부(reject)되더라도 오류를 포착하지 못해요.

비동기 함수를 처리하려면 `attemptAsync` 함수를 대신 사용하는 것을 권장해요.
:::

함수를 실행하고 결과 또는 오류를 포함하는 튜플을 반환해요.

## 인터페이스

```typescript
function attempt<T, E>(func: () => T): [null, T] | [E, null];
```

### 파라미터

- `func` (`() => T`): 실행을 시도할 함수예요.

### 반환 값

(`[null, T] | [E, null]`): 다음과 같은 튜플을 반환해요:

- 성공 시: `[null, T]` - 첫 번째 요소는 `null`, 두 번째 요소는 결과값예요.
- 에러 발생 시: `[E, null]` - 첫 번째 요소는 포착된 오류, 두 번째 요소는 `null`예요.

## 예시

```typescript
import { attempt } from 'es-toolkit/function';

// 성공시에는 [null, 함수의 반환값] 튜플을 반환해요.
const [error, result] = attempt(() => 42);
// [null, 42]

// 에러가 발생하면 [함수가 던진 에러, null] 튜플을 반환해요.
const [error, result] = attempt(() => {
  throw new Error('문제가 발생했어요');
});
// [Error, null]

// 제네릭 타입 사용하면 함수가 던진 에러와 반환값의 타입을 지정할 수 있어요.
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// `error`는 `Error` 타입으로, `names`는 `string[]` 타입으로 추론돼요.
```
