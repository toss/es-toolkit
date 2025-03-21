# attempt

::: info
중요: 이 함수는 비동기 함수(`Promise`를 반환하는 함수)에는 적합하지 않아요.
비동기 함수를 전달하면 `[null, Promise<AttemptResult>]`가 반환되지만, Promise가
나중에 거부(reject)되더라도 오류를 포착하지 못해요.

비동기 함수를 처리하려면 `attemptAsync` 함수를 대신 사용하세요.
:::

함수를 실행하고 결과 또는 오류를 포함하는 튜플을 반환해요.

## 시그니처

```typescript
function attempt<AttemptResult, AttemptError>(func: () => AttemptResult): [null, AttemptResult] | [AttemptError, null];
```

### 매개변수

- `func` (`() => AttemptResult`): 실행을 시도할 함수예요.

### 반환

(`[null, AttemptResult] | [AttemptError, null]`): 다음과 같은 튜플을 반환해요:

- 성공 시: `[null, AttemptResult]` - 첫 번째 요소는 `null`, 두 번째 요소는 결과값
- 오류 발생 시: `[AttemptError, null]` - 첫 번째 요소는 포착된 오류, 두 번째 요소는 `null`

## 예제

```typescript
import { attempt } from 'es-toolkit/function';

// 성공적인 실행
const [error, result] = attempt(() => 42);
// [null, 42]

// 실패한 실행
const [error, result] = attempt(() => {
  throw new Error('문제가 발생했어요');
});
// [Error, null]

// 타입 매개변수 사용
const [error, names] = attempt<string[]>(() => ['Alice', 'Bob']);
// [null, ['Alice', 'Bob']]
```
