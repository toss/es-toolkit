# isNull (Lodash 호환성)

::: warning `es-toolkit`의 `isNull`을 사용하세요

이 `isNull` 함수는 Lodash 호환성을 위한 함수이지만, 메인 라이브러리와 같은 구현이에요.

대신 `es-toolkit`의 [isNull](../../predicate/isNull.md)를 사용하세요.

:::

값이 `null`인지 확인해요.

```typescript
const result = isNull(value);
```

## 레퍼런스

### `isNull(value)`

값이 정확히 `null`인지 타입 안전하게 확인하고 싶을 때 `isNull`을 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isNull } from 'es-toolkit/compat';

// null만 true
isNull(null); // true

// undefined도 false
isNull(undefined); // false

// 다른 모든 값들도 false
isNull(0); // false
isNull(''); // false
isNull(false); // false
isNull([]); // false
isNull({}); // false
isNull('null'); // false
isNull(NaN); // false
```

`null`과 `undefined`를 구분해서 확인할 수 있어요.

```typescript
import { isNull } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isNull(value)) {
    console.log('값이 명시적으로 null이에요');
  } else if (value === undefined) {
    console.log('값이 undefined에요');
  } else {
    console.log(`값이 있어요: ${value}`);
  }
}

handleValue(null); // "값이 명시적으로 null이에요"
handleValue(undefined); // "값이 undefined에요"
handleValue('hello'); // "값이 있어요: hello"
```

#### 파라미터

- `value` (`any`): `null`인지 확인할 값이에요.

### 반환 값

(`value is null`): 값이 `null`이면 `true`, 아니면 `false`를 반환해요.
