# defer (Lodash 호환성)

::: warning `setTimeout`을 사용하세요

이 `defer` 함수는 내부적으로 `setTimeout(func, 1, ...args)`를 호출하는 단순한 래퍼 함수예요.

대신 더 직접적이고 현대적인 `setTimeout`을 사용하세요.

:::

함수를 다음 이벤트 루프에서 실행하도록 지연시켜요.

```typescript
const timerId = defer(func, ...args);
```

## 레퍼런스

### `defer(func, ...args)`

현재 콜 스택이 끝난 후에 함수를 실행하고 싶을 때 `defer`를 사용하세요. 함수 실행을 다음 이벤트 루프로 미루면서 추가 인수들을 함수에 전달할 수 있어요.

```typescript
import { defer } from 'es-toolkit/compat';

// 콘솔 출력을 지연시켜요
defer(console.log, 'deferred message');
// 현재 콜 스택이 끝난 후에 'deferred message'를 출력해요

// 함수와 인수를 함께 지연 실행해요
const greet = (name: string, greeting: string) => {
  console.log(`${greeting}, ${name}!`);
};

defer(greet, 'John', 'Hello');
// 현재 콜 스택이 끝난 후에 'Hello, John!'을 출력해요
```

내부적으로 `setTimeout(func, 1, ...args)`를 사용해서 1밀리초 후에 함수를 실행해요.

```typescript
import { defer } from 'es-toolkit/compat';

// 다음 두 코드는 동일하게 동작해요
defer(console.log, 'message');
setTimeout(console.log, 1, 'message');
```

#### 파라미터

- `func` (`(...args: any[]) => any`): 지연 실행할 함수예요.
- `...args` (`any[]`): 함수에 전달할 인수들이에요.

#### 반환 값

(`number`): `setTimeout`에서 반환된 타이머 ID를 반환해요. `clearTimeout`으로 실행을 취소할 수 있어요.
