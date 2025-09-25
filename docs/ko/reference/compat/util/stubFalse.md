# stubFalse (Lodash 호환성)

::: warning `false`를 직접 사용하세요

이 `stubFalse` 함수는 단순히 `false`를 반환하는 래퍼 함수로 불필요한 추상화예요.

대신 더 빠르고 직접적인 `false` 값을 사용하세요.

:::

항상 `false`를 반환해요.

```typescript
const falseValue = stubFalse();
```

## 레퍼런스

### `stubFalse()`

항상 `false`를 반환하는 함수예요. 함수형 프로그래밍에서 일관된 거짓 값이 필요하거나 조건부 콜백에서 기본값으로 사용할 때 유용해요.

```typescript
import { stubFalse } from 'es-toolkit/compat';

// false를 반환해요
const result = stubFalse();
console.log(result); // => false

// 배열 필터링에서 기본 조건으로 사용해요
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(stubFalse); // 모든 요소를 제거
console.log(evenNumbers); // => []

// 함수형 프로그래밍에서 사용해요
const isValid = condition => (condition ? someValidation : stubFalse);
const validator = isValid(false);
console.log(validator()); // => false
```

매번 동일한 `false` 값을 반환해요.

```typescript
import { stubFalse } from 'es-toolkit/compat';

const result1 = stubFalse();
const result2 = stubFalse();

console.log(result1 === result2); // => true
console.log(typeof result1); // => 'boolean'
console.log(result1); // => false
```

#### 파라미터

파라미터는 없어요.

#### 반환 값

(`false`): 항상 `false`를 반환해요.
