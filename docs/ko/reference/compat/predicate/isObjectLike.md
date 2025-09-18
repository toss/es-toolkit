# isObjectLike (Lodash 호환성)

::: warning `typeof value === 'object' && value !== null`을 사용하세요

이 `isObjectLike` 함수는 추가적인 함수 호출 오버헤드로 인해 느리게 동작해요.

대신 더 빠르고 직접적인 `typeof value === 'object' && value !== null` 검사를 사용하세요.

:::

값이 객체 같은지 확인해요.

```typescript
const result = isObjectLike(value);
```

## 레퍼런스

### `isObjectLike(value)`

주어진 값이 객체 같은 값인지 확인할 때 `isObjectLike`를 사용하세요. 객체 같은 값은 `typeof` 연산의 결과가 `'object'`이고 `null`이 아닌 값이에요.

```typescript
import { isObjectLike } from 'es-toolkit/compat';

// 객체 같은 값들
isObjectLike({ a: 1 }); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(new Date()); // true
isObjectLike(/regex/); // true
isObjectLike(new Map()); // true
isObjectLike(new Set()); // true

// 객체 같지 않은 값들
isObjectLike('abc'); // false
isObjectLike(123); // false
isObjectLike(true); // false
isObjectLike(() => {}); // false
isObjectLike(Symbol('sym')); // false

// 특별한 경우
isObjectLike(null); // false (null은 typeof가 'object'이지만 객체 같지 않음)
isObjectLike(undefined); // false
```

더 직접적인 검사를 위해서는 다음과 같은 현대적인 방법을 사용하세요:

```typescript
// 더 직접적인 방법
typeof value === 'object' && value !== null; // 객체 같은 값인지 확인

// 구체적인 타입 확인
Array.isArray(value); // 배열인지 확인
value instanceof Date; // Date 객체인지 확인
value instanceof Map; // Map 객체인지 확인
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

### 반환 값

(`boolean`): 값이 객체 같으면 `true`, 아니면 `false`를 반환해요.