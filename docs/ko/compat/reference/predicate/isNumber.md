# isNumber (Lodash 호환성)

::: warning `typeof` 연산자를 사용하세요

이 `isNumber` 함수는 Number 객체 래퍼 처리로 인해 복잡해요.

대신 더 간단하고 현대적인 `typeof value === 'number'`을 사용하세요.

:::

값이 숫자인지 확인해요.

```typescript
const result = isNumber(value);
```

## 사용법

### `isNumber(value)`

값이 숫자인지 확인하고 싶을 때 `isNumber`를 사용하세요. 이 함수는 원시 숫자와 Number 객체를 모두 숫자로 인식해요.

```typescript
import { isNumber } from 'es-toolkit/compat';

// 원시 숫자
isNumber(123);
// Returns: true

isNumber(3.14);
// Returns: true

isNumber(NaN);
// Returns: true

// Number 객체
isNumber(new Number(42));
// Returns: true

// 다른 타입
isNumber('123');
// Returns: false

isNumber(true);
// Returns: false

isNumber(null);
// Returns: false
```

#### 파라미터

- `value` (`unknown`): 숫자인지 확인할 값이에요.

#### 반환 값

(`value is number`): 값이 숫자면 `true`, 아니면 `false`를 반환해요.
