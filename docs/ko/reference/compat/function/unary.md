# unary (Lodash 호환성)

::: warning `es-toolkit`의 `ary`를 사용하세요

이 `unary` 함수는 `ary` 함수의 특수한 경우로 구현되어 있어요. 더 많은 제어가 필요하다면 `es-toolkit`의 [ary](../../function/ary.md)를 직접 사용하는 것이 더 효율적이에요.

대신 더 빠르고 현대적인 `es-toolkit`의 [ary](../../function/ary.md)를 사용하세요.

:::

함수가 최대 하나의 인수만 받도록 제한해요.

```typescript
const limitedFunc = unary(func);
```

## 사용법

### `unary(func)`

함수가 최대 하나의 인수만 받도록 제한하고 싶을 때 `unary`를 사용하세요. 추가로 전달되는 인수들은 모두 무시돼요.

```typescript
import { unary } from 'es-toolkit/compat';

function greet(name, greeting, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 첫 번째 인수만 받는 함수로 변환
const greetOne = unary(greet);
greetOne('Alice', 'Hello', '!'); // greet('Alice')와 동일하게 동작

// 배열의 map 함수와 함께 사용할 때 유용해요
const numbers = ['1', '2', '3'];
numbers.map(parseInt); // [1, NaN, NaN] - 예상치 못한 결과
numbers.map(unary(parseInt)); // [1, 2, 3] - 올바른 결과
```

#### 파라미터

- `func` (`(...args: any[]) => any`): 인수를 제한할 함수예요.

#### 반환 값

(`(...args: any[]) => any`): 최대 하나의 인수만 받는 새로운 함수를 반환해요.
ㅇ깆
