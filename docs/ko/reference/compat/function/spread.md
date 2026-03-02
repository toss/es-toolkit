# spread (Lodash 호환성)

::: warning 현대적인 전개 연산자를 사용하세요

이 `spread` 함수는 특정 인덱스의 배열 인수를 개별 인수로 펼치는 복잡한 로직을 처리해서 처리 속도가 느릴 수 있어요.

대신 더 빠르고 현대적인 전개 연산자(`...`)를 직접 사용하세요.

:::

배열 인수를 개별 인수로 펼쳐서 함수를 호출하는 새로운 함수를 만들어요.

```typescript
const spreadFunc = spread(func, argsIndex);
```

## 사용법

### `spread(func, argsIndex)`

배열 인수를 개별 인수로 펼쳐서 함수를 호출하고 싶을 때 `spread`를 사용하세요. 배열의 위치를 지정할 수 있어서 다른 인수들과 함께 사용할 수 있어요.

```typescript
import { spread } from 'es-toolkit/compat';

// 기본 사용법 - 첫 번째 인수가 배열
function add(a, b) {
  return a + b;
}

const spreadAdd = spread(add);
spreadAdd([1, 2]); // 3

// 두 번째 인수가 배열인 경우
function greet(greeting, names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

const spreadGreet = spread(greet, 1);
spreadGreet('Hello', ['Alice', 'Bob']); // 'Hello, Alice and Bob!'

// 현대적인 전개 연산자 사용 예시 (권장)
function modernAdd(a, b) {
  return a + b;
}

const numbers = [1, 2];
modernAdd(...numbers); // 3 - 더 간단하고 빠름
```

특히 배열을 함수 인수로 전달할 때 유용하지만, 현대 JavaScript에서는 전개 연산자를 사용하는 것이 더 일반적이에요.

#### 파라미터

- `func` (`Function`): 변환할 함수예요.
- `argsIndex` (`number`, 선택): 배열 인수의 위치예요. 기본값은 `0`이에요.

#### 반환 값

(`Function`): 배열 인수를 펼쳐서 호출하는 새로운 함수를 반환해요.
