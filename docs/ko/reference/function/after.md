# after

`n`번째 호출부터 함수를 실행하는 새로운 함수를 만들어요.

```typescript
const afterFunc = after(n, func);
```

## 레퍼런스

### `after(n, func)`

처음 몇 번의 호출을 무시하고, `n`번째부터 함수를 실행하고 싶을 때 `after`를 사용하세요. 이벤트나 비동기 작업에서 특정 횟수 이후에만 동작을 실행해야 할 때 유용해요.

```typescript
import { after } from 'es-toolkit/function';

const afterFn = after(3, () => {
  console.log('실행됨');
});

// 아무것도 로깅하지 않아요
afterFn();
// 아무것도 로깅하지 않아요
afterFn();
// '실행됨'을 로깅해요
afterFn();
// '실행됨'을 로깅해요
afterFn();
```

#### 파라미터

- `n` (`number`): `func`이 실행되기 위해 필요한 호출 횟수예요.
- `func` (`F`): 실행될 함수예요.

#### 반환 값

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 호출 횟수를 추적하고 `n`번째 호출부터 `func`을 실행하는 새로운 함수예요. `n`번 이전 호출에서는 `undefined`를 반환해요.

#### 에러

`n`이 정수가 아니거나 음수일 때 에러를 발생시켜요.
