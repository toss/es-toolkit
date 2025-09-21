# isError (Lodash 호환성)

::: warning es-toolkit의 [isError](../../predicate/isError.md)를 사용하세요
이 `isError` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isError](../../predicate/isError.md)를 사용하세요.
:::

값이 Error 객체인지 확인해요.

```typescript
const result = isError(value);
```

## 레퍼런스

### `isError(value)`

값이 Error 객체인지 타입 안전하게 확인하고 싶을 때 `isError`를 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isError } from 'es-toolkit/compat';

// Error 객체 확인
isError(new Error()); // true
isError(new TypeError('Type error')); // true
isError(new ReferenceError('Reference error')); // true

// Error를 상속한 사용자 정의 에러
class CustomError extends Error {}
isError(new CustomError()); // true

// 다른 타입들은 false
isError('Error'); // false
isError({ name: 'Error', message: 'Something went wrong' }); // false
isError({}); // false
isError(null); // false
isError(undefined); // false
```

#### 파라미터

- `value` (`unknown`): Error 객체인지 확인할 값이에요.

### 반환 값

(`value is Error`): 값이 Error 객체이면 `true`, 아니면 `false`를 반환해요.
