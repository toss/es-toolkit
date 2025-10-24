# wrap (Lodash 호환성)

::: warning 고차 함수를 사용하세요

이 `wrap` 함수는 단순히 함수를 감싸는 기능이에요. 대부분의 경우 더 간단한 고차 함수나 클로저를 사용하는 것이 더 명확해요.

대신 더 빠르고 현대적인 클로저나 직접적인 함수 정의를 사용하세요.

:::

주어진 값이나 함수를 감싸는 새로운 함수를 만들어요.

```typescript
const wrappedFunc = wrap(value, wrapper);
```

## 레퍼런스

### `wrap(value, wrapper)`

값이나 함수에 추가적인 로직을 적용하고 싶을 때 `wrap`을 사용하세요. 원본 값을 첫 번째 인수로 받는 래퍼 함수를 통해 새로운 동작을 정의할 수 있어요.

```typescript
import { wrap } from 'es-toolkit/compat';

// 함수를 감싸서 로깅 기능을 추가해요
const greet = (name: string) => `Hi, ${name}`;
const loggedGreet = wrap(greet, (originalFunc, name) => {
  const result = originalFunc(name);
  console.log(`[LOG] ${result}`);
  return result;
});

loggedGreet('Alice'); // 콘솔에 "[LOG] Hi, Alice" 출력하고 "Hi, Alice" 반환
```

함수가 아닌 값도 감쌀 수 있어요. 값은 래퍼 함수의 첫 번째 인수로 전달돼요.

```typescript
import { wrap } from 'es-toolkit/compat';

// 문자열을 HTML 태그로 감싸는 함수를 만들어요
const htmlWrapper = wrap('Hello World', (text, tag) => `<${tag}>${text}</${tag}>`);
console.log(htmlWrapper('h1')); // "<h1>Hello World</h1>"

// 숫자를 계산에 사용하는 함수를 만들어요
const calculate = wrap(10, (baseValue, multiplier) => baseValue * multiplier);
console.log(calculate(5)); // 50
```

더 복잡한 함수 래핑 예시예요.

```typescript
import { wrap } from 'es-toolkit/compat';

const add = (a: number, b: number) => a + b;

// 성능 측정을 추가한 함수를 만들어요
const timedAdd = wrap(add, (originalAdd, a, b) => {
  const start = Date.now();
  const result = originalAdd(a, b);
  const end = Date.now();
  console.log(`실행 시간: ${end - start}ms`);
  return result;
});

timedAdd(3, 7); // 실행 시간을 콘솔에 출력하고 10 반환
```

#### 파라미터

- `value` (`T`): 감쌀 값이나 함수예요.
- `wrapper` (`(value: T, ...args: U[]) => V`): 원본 값을 첫 번째 인수로 받고 추가 로직을 적용하는 함수예요.

#### 반환 값

(`(...args: U[]) => V`): 래퍼 함수가 적용된 새로운 함수를 반환해요.
