# isNaN (Lodash 호환성)

::: warning `Number.isNaN`을 사용하세요

이 `isNaN` 함수는 추가적인 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Number.isNaN`을 사용하세요.

:::

값이 `NaN`인지 확인해요.

```typescript
const result = isNaN(value);
```

## 레퍼런스

### `isNaN(value)`

값이 `NaN`인지 확인하고 싶을 때 `isNaN`을 사용하세요.

```typescript
import { isNaN } from 'es-toolkit/compat';

// NaN 확인
isNaN(NaN);
// Returns: true

isNaN(Number.NaN);
// Returns: true

// 다른 값들
isNaN(undefined);
// Returns: false

isNaN(null);
// Returns: false

isNaN(0);
// Returns: false

isNaN('NaN');
// Returns: false
```

#### 파라미터

- `value` (`unknown`): NaN인지 확인할 값이에요.

### 반환 값

(`boolean`): 값이 NaN이면 `true`, 아니면 `false`를 반환해요.