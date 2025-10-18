# before

함수의 호출 횟수를 제한하는 새로운 함수를 만들어요.

```typescript
const limitedFunc = before(n, func);
```

## 레퍼런스

### `before(n, func)`

함수가 특정 횟수까지만 실행되도록 제한하고 싶을 때 `before`를 사용하세요. `n-1`번째 호출까지만 함수가 실행되고, `n`번째부터는 더 이상 실행되지 않아요.

```typescript
import { before } from 'es-toolkit/function';

const beforeFn = before(3, () => {
  console.log('실행됨');
});

// '실행됨'을 로깅해요
beforeFn();

// '실행됨'을 로깅해요
beforeFn();

// 아무것도 로깅하지 않아요
beforeFn();

// 아무것도 로깅하지 않아요
beforeFn();
```

초기화나 설정 같은 한 번만 실행되어야 하는 작업에 유용해요.

```typescript
let initialized = false;

const initialize = before(2, () => {
  console.log('초기화 중...');
  initialized = true;
});

// '초기화 중...'을 로깅하고 초기화를 수행해요
initialize();

// 이미 초기화되었으므로 아무것도 하지 않아요
initialize();
```

#### 파라미터

- `n` (`number`): 반환된 함수가 `func`를 호출할 수 있는 최대 횟수예요. `n`이 0이면 `func`는 호출되지 않아요. 양의 정수인 경우 최대 `n-1`번 호출돼요.
- `func` (`F`): 호출 횟수가 제한될 함수예요.

#### 반환 값

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 호출 횟수를 추적하고 `n-1`번째까지만 `func`를 실행하는 새로운 함수예요. `n`번째 이후 호출에서는 `undefined`를 반환해요.

#### 에러

`n`이 정수가 아니거나 음수일 때 에러를 발생시켜요.
