# partialRight (Lodash 호환성)

::: warning `es-toolkit`의 `partialRight`를 사용하세요

이 `partialRight` 함수는 많은 오버로드와 공용체 타입 처리로 인해 비효율적이에요. 또한 대부분의 경우 더 간단한 냄자마 함수로 대체할 수 있어요.

대신 더 빠르고 현대적인 `es-toolkit`의 [partialRight](../../function/partialRight.md)를 사용하세요.

:::

함수의 오른쪽부터 인수를 미리 채워서 부분 적용된 함수를 만들어요.

```typescript
const partialFunc = partialRight(func, ...args);
```

## 사용법

### `partialRight(func, ...args)`

함수의 오른쪽부터 인수를 미리 채워서 부분 적용된 함수를 만들고 싶을 때 `partialRight`를 사용하세요. 주로 인수 순서가 중요한 함수에서 마지막 인수들을 고정할 때 유용해요.

```typescript
import { partialRight } from 'es-toolkit/compat';

// 기본 사용법
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 마지막 인수를 미리 설정
const greetWithExclamation = partialRight(greet, '!');
greetWithExclamation('Hello', 'Alice'); // 'Hello Alice!'

// 여러 인수를 미리 설정
const sayHiToAlice = partialRight(greet, 'Alice', '!');
sayHiToAlice('Hi'); // 'Hi Alice!'

// placeholder를 사용하여 인수 순서 조절
const greetAliceWithCustom = partialRight(greet, 'Alice', partialRight.placeholder);
greetAliceWithCustom('Hello', '?'); // 'Hello Alice?'
```

대부분의 경우 화살표 함수로 대체할 수 있어요:

```typescript
// partialRight 대신 화살표 함수 사용 (권장)
const greetWithExclamation = (greeting, name) => greet(greeting, name, '!');
const sayHiToAlice = greeting => greet(greeting, 'Alice', '!');
```

#### 파라미터

- `func` (`Function`): 부분 적용할 함수예요.
- `...args` (`any[]`): 미리 채울 인수들이에요. `partialRight.placeholder`를 사용해서 인수 순서를 조절할 수 있어요.

#### 반환 값

(`Function`): 오른쪽부터 인수가 미리 채워진 새로운 함수를 반환해요.
