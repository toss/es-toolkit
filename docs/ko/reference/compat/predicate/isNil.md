# isNil (Lodash 호환성)

::: warning `es-toolkit`의 `isNil`을 사용하세요

이 `isNil` 함수는 Lodash 호환성을 위한 함수이지만, 메인 라이브러리와 같은 구현이에요.

대신 `es-toolkit`의 [isNil](../../predicate/isNil.md)를 사용하세요.

:::

값이 `null` 또는 `undefined`인지 확인해요.

```typescript
const result = isNil(value);
```

## 레퍼런스

### `isNil(x)`

값이 `null` 또는 `undefined`인지 타입 안전하게 확인하고 싶을 때 `isNil`을 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isNil } from 'es-toolkit/compat';

// null과 undefined는 true
isNil(null); // true
isNil(undefined); // true

// 다른 모든 값들은 false
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil([]); // false
isNil({}); // false
isNil('hello'); // false
isNil(42); // false
```

참으로 평가되지만 `null`이나 `undefined`가 아닌 값들과 구분해요.

```typescript
import { isNil } from 'es-toolkit/compat';

// 거짓으로 평가되지만 null/undefined가 아닌 값들
isNil(0); // false
isNil(''); // false
isNil(false); // false
isNil(NaN); // false

// null과 undefined만 true
isNil(null); // true
isNil(undefined); // true
```

#### 파라미터

- `x` (`any`): `null` 또는 `undefined`인지 확인할 값이에요.

### 반환 값

(`x is null | undefined`): 값이 `null` 또는 `undefined`이면 `true`, 아니면 `false`를 반환해요.
