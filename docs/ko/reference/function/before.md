# before

주어진 함수(`func`)의 호출 횟수를 제한하는 새로운 함수를 생성해요.

## 인터페이스

```typescript
function before<F extends (...args: any[]) => any>(n: number, func: F): F;
```

### 파라미터

- `n` (`number`): 반환된 함수가 `func`를 호출하기 전까지 허용된 호출 횟수예요.
  - `n`이 0이면, `func`는 호출되지 않아요.
  - `n`이 양의 정수인 경우, `func`는 최대 `n-1`번 호출돼요.
- `func` (`F`): 호출 횟수 제한이 적용될 함수예요.

### 반환 값

(`F`): 새로운 함수를 반환해요. 이 함수는 다음과 같은 기능을 가져요.

- 호출 횟수를 추적해요.
- `n-1`번째 호출까지 `func`를 호출해요.
- 호출 횟수가 `n`에 도달하거나, 초과하면 `undefined`를 반환하여 함수 호출을 중지해요.

### 에러

`n`이 음수일 경우 오류를 발생시켜요.

## 예시

```typescript
import { after } from 'es-toolkit/function';

const mockFn = () => {
  console.log('실행됨');
};
const afterFn = after(3, mockFn);

// 아무것도 로깅하지 않아요.
afterFn();
// 아무것도 로깅하지 않아요.
afterFn();
// '실행됨'을 로깅해요.
afterFn();
```
