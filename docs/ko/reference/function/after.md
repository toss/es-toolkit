# after

지정된 횟수만큼 호출된 후에만 실행되는 함수를 생성해요. 이 함수는 이벤트나 비동기 작업에서 특정 횟수의 호출 후에만 동작이 발생해야 하는 경우에 유용해요.

## 인터페이스

```typescript
function after<F extends (...args: any[]) => any>(n: number, func: F): F;
```

### 파라미터

- `n` (`number`): `func`이 호출되기 전에 필요한 호출 횟수예요. 예를 들어, `n`이 `3`이면, 반환된 함수가 총 `3`번 호출된 후에만 `func`가 실행돼요. 즉, 3번째 호출에서 `func`이 실행되며, 이후 호출에서도 계속 실행돼요.
- `func` (`F`): 실행될 함수예요.

### 결괏값

(`F`): 새로운 함수를 반환해요. 이 함수는 다음과 같은 기능을 가져요.

- 호출된 횟수를 추적해요.
- `n`번 호출된 후에만 `func`를 호출해요.
- `n`번 호출되기 전에는 `undefined`를 반환해요.

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
