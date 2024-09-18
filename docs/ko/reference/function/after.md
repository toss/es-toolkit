# after

`n`번째 호출부터만 실행되는 함수를 생성해요.
제공된 함수는 `n`번째 호출부터 실행돼요.

이는 특정 수의 호출 이후에만 동작이 발생해야 하는 이벤트나 비동기 작업에 유용해요.

## 인터페이스

```typescript
function after<F extends (...args: any[]) => any>(n: number, func: F): F;
```

### 파라미터

- `n` (`number`): `func`이 실행되기 위해 필요한 호출 횟수예요.
- `func` (`F`): 실행될 함수예요.

### 반환 값

(`F`): 새로운 함수를 반환해요. 이 함수는 다음과 같은 기능을 가져요.

- 호출된 횟수를 추적해요.
- `n`번째 호출부터 `func`을 호출해요.
- 호출이 `n`번이 되기 전까지 `undefined`를 반환해요.

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
