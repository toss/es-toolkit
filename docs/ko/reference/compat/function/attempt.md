# attempt (Lodash 호환성)

::: warning `es-toolkit`의 [`attempt`](../../util/attempt.md) 함수나 try-catch 블록을 사용하세요

이 `attempt` 함수는 에러와 반환 값을 구분하지 않고 반환해서 사용할 때 혼란이 있을 수 있어요.

대신 더 직접적이고 명확한 [`attempt`](../../util/attempt.md) 함수나 try-catch 블록을 사용하세요.

:::

함수를 실행하고 에러가 발생하면 에러 객체를 반환하는 함수예요.

```typescript
const result = attempt(func, ...args);
```

## 레퍼런스

### `attempt(func, ...args)`

함수를 안전하게 실행하고 싶을 때 `attempt`를 사용하세요. 에러가 발생할 수 있는 함수를 실행할 때 프로그램이 중단되지 않도록 하고, 에러를 반환값으로 처리할 때 유용해요.

```typescript
import { attempt } from 'es-toolkit/compat';

// 기본 사용법 - 성공하는 경우
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // 5

// 에러가 발생하는 경우
const errorResult = attempt(() => {
  throw new Error('뭔가 잘못됐어요');
});
console.log(errorResult); // Error: 뭔가 잘못됐어요
```

try-catch 블록 사용과의 차이점을 살펴보면 다음과 같아요.

```typescript
// attempt 사용
import { attempt } from 'es-toolkit/compat';

const result = attempt(riskyFunction, arg1, arg2);
if (result instanceof Error) {
  console.log('에러 발생:', result.message);
} else {
  console.log('결과:', result);
}

// try-catch 사용 (더 직접적)
try {
  const result = riskyFunction(arg1, arg2);
  console.log('결과:', result);
} catch (error) {
  console.log('에러 발생:', error.message);
}
```

#### 파라미터

- `func` (`Function`): 실행할 함수예요.
- `args` (`...any[]`): 함수에 전달할 인수들이에요.

### 반환 값

(`ReturnType<F> | Error`): 함수가 성공하면 반환값을, 에러가 발생하면 Error 객체를 반환해요.
