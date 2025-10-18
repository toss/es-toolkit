# negate (Lodash 호환성)

::: warning 논리 부정 연산자를 사용하세요

이 `negate` 함수는 단순히 함수의 결과를 부정하는 기능이에요. 대부분의 경우 논리 부정 연산자(`!`)를 직접 사용하는 것이 더 간단하고 빨라요.

대신 더 빠르고 현대적인 `!predicate(...args)` 또는 `(...args) => !predicate(...args)`를 사용하세요.

:::

주어진 함수의 결과를 부정하는 새로운 함수를 만들어요.

```typescript
const negatedFunc = negate(predicate);
```

## 레퍼런스

### `negate(predicate)`

함수의 결과를 부정하는 새로운 함수를 만들고 싶을 때 `negate`를 사용하세요. 필터링이나 조건문에서 반대 조건을 체크할 때 유용해요.

```typescript
import { negate } from 'es-toolkit/compat';

// 기본 사용법
function isEven(n) {
  return n % 2 === 0;
}

const isOdd = negate(isEven);
console.log(isOdd(3)); // true
console.log(isOdd(4)); // false

// 배열 필터링에서 사용
const numbers = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]

// 현대적인 대안 (권장)
const modernOddNumbers = numbers.filter(n => !isEven(n));
// 또는
const isOddModern = n => !isEven(n);
const modernOddNumbers2 = numbers.filter(isOddModern);

// 복잡한 예시
function isEmpty(str) {
  return str.trim().length === 0;
}

const hasContent = negate(isEmpty);
const messages = ['', ' ', 'hello', '  ', 'world'];
const validMessages = messages.filter(hasContent);
console.log(validMessages); // ['hello', 'world']
```

주로 배열 필터링이나 조건부 로직에서 사용되지만, 대부분의 경우 논리 부정 연산자를 직접 사용하는 것이 더 직관적이에요.

#### 파라미터

- `predicate` (`Function`): 결과를 부정할 함수예요. 반드시 불리언 값을 반환해야 해요.

#### 반환 값

(`Function`): 원본 함수의 결과를 부정한 값을 반환하는 새로운 함수를 반환해요.
