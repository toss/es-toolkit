# isDate (Lodash 호환성)

::: warning es-toolkit의 [isDate](../../predicate/isDate.md)를 사용하세요
이 `isDate` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isDate](../../predicate/isDate.md)를 사용하세요.
:::

값이 Date 객체인지 확인해요.

```typescript
const result = isDate(value);
```

## 사용법

### `isDate(value)`

값이 Date 객체인지 타입 안전하게 확인하고 싶을 때 `isDate`를 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isDate } from 'es-toolkit/compat';

// Date 객체 확인
const date = new Date();
isDate(date); // true

// 유효하지 않은 Date도 Date 객체로 인식해요
const invalidDate = new Date('invalid');
isDate(invalidDate); // true

// 다른 타입들은 false
isDate('2024-01-01'); // false
isDate(1640995200000); // false
isDate({}); // false
isDate(null); // false
isDate(undefined); // false
```

#### 파라미터

- `value` (`unknown`): Date 객체인지 확인할 값이에요.

#### 반환 값

(`value is Date`): 값이 Date 객체이면 `true`, 아니면 `false`를 반환해요.
