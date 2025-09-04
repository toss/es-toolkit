# after

`n`번째 호출부터만 실행하고, 그 전까지의 호출은 무시하는 새로운 함수를 생성해요.

```typescript
const newFunc = at(n, func);
```

## 레퍼런스

### `after(n, func)`

처음부터 몇 차례의 호출을 무시하고, `n`번째부터 함수를 호출하고 싶을 때, `after` 함수를 사용하세요.

```typescript
import { after } from 'es-toolkit';

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

### 파라미터

- `n` (`number`): `func`이 실행되기 위해 필요한 호출 횟수예요.
- `func` (`F`): 실행될 함수예요.

### 반환 값

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 새로운 함수를 반환해요. 이 함수는 다음과 같은 기능을 가져요.

- 호출된 횟수를 추적해요.
- `n`번째 호출부터 `func`을 호출해요.
- 호출이 `n`번이 되기 전까지 `undefined`를 반환해요.

### 에러

`n`이 음수일 경우 오류를 발생시켜요.
