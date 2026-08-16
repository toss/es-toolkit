# flip (Lodash 호환성)

::: warning 직접적인 인수 반전을 사용하세요

이 `flip` 함수는 단순히 함수의 인수 순서를 반대로 바꾸는 기능이에요. 대부분의 경우 더 간단한 방법으로 대체할 수 있어요.

대신 더 빠르고 현대적인 `(...args) => func(...args.reverse())`나 직접적인 인수 전달을 사용하세요.

:::

주어진 함수의 인수 순서를 뒤집는 함수를 생성해요.

```typescript
const flippedFunc = flip(func);
```

## 사용법

### `flip(func)`

함수의 인수 순서를 뒤집어서 새로운 함수를 만들고 싶을 때 `flip`을 사용하세요. 원래 함수가 첫 번째 인수부터 순서대로 받던 것을 마지막 인수부터 받도록 바꿔줘요.

```typescript
import { flip } from 'es-toolkit/compat';

function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const flipped = flip(greet);
flipped('John', 'Hello'); // 'Hello, John!'

// 원래 함수는 (greeting, name) 순서지만
// 뒤집힌 함수는 (name, greeting) 순서로 받아요
```

여러 인수를 받는 함수에서도 모든 인수의 순서가 뒤바뀌어요.

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped('1', '2', '3', '4'); // ['4', '3', '2', '1']
```

#### 파라미터

- `func` (`F`): 인수 순서를 뒤집을 함수예요.

#### 반환 값

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): 인수 순서가 뒤집힌 새로운 함수를 반환해요.
