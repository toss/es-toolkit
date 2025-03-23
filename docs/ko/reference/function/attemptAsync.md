# attemptAsync

비동기 함수를 실행하고 결과 또는 오류를 포함하는 튜플을 반환해요.

## 시그니처

```typescript
function attemptAsync<AttemptResult, AttemptError>(
  func: () => Promise<AttemptResult>
): Promise<[null, AttemptResult] | [AttemptError, null]>;
```

### 매개변수

- `func` (`() => Promise<AttemptResult>`): 실행을 시도할 비동기 함수예요.

### 반환

(`Promise<[null, AttemptResult] | [AttemptError, null]>`): 다음과 같은 튜플로 해결되는 `Promise`를 반환해요:

- 성공 시: `[null, AttemptResult]` - 첫 번째 요소는 `null`, 두 번째 요소는 결과값
- 오류 발생 시: `[AttemptError, null]` - 첫 번째 요소는 포착된 오류, 두 번째 요소는 `null`

## 예제

```typescript
import { attemptAsync } from 'es-toolkit/function';

// 성공적인 실행
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// 성공 시: [null, { ... data ... }]

// 실패한 실행
const [error, data] = await attemptAsync(async () => {
  throw new Error('네트워크 오류');
});
// [Error, null]

// 타입 매개변수 사용
const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users는 User[] 타입으로 추론돼요
```
