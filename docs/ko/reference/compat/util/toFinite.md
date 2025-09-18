# toFinite (Lodash 호환성)

::: warning `Number` 함수를 사용하세요

이 `toFinite` 함수는 `Number.MAX_VALUE` 변환이나 `NaN` 처리 등의 추가 로직으로 인해 복잡하고 느리게 동작해요.

대신 더 빠르고 현대적인 `Number` 함수를 사용하세요.

:::

값을 유한한 숫자로 변환해요.

```typescript
const finite = toFinite(value);
```

## 레퍼런스

### `toFinite(value)`

값을 유한한 숫자로 변환하고 싶을 때 `toFinite`를 사용하세요. `Infinity`나 `-Infinity`는 `Number.MAX_VALUE`나 `-Number.MAX_VALUE`로 변환되고, `NaN`은 `0`으로 변환돼요.

```typescript
import { toFinite } from 'es-toolkit/compat';

toFinite(3.2);
// Returns: 3.2

toFinite(Number.MIN_VALUE);
// Returns: 5e-324

toFinite(Infinity);
// Returns: 1.7976931348623157e+308

toFinite(-Infinity);
// Returns: -1.7976931348623157e+308

toFinite('3.2');
// Returns: 3.2

toFinite(NaN);
// Returns: 0

toFinite(Symbol.iterator);
// Returns: 0
```

#### 파라미터

- `value` (`unknown`): 변환할 값이에요.

### 반환 값

(`number`): 유한한 숫자를 반환해요.