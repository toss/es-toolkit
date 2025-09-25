# toNumber (Lodash 호환성)

::: warning Number 생성자를 사용하세요

이 `toNumber` 함수는 심볼 타입 검증과 추가 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 Number 생성자를 사용하세요.

:::

값을 숫자로 변환해요.

```typescript
const number = toNumber(value);
```

## 레퍼런스

### `toNumber(value)`

값을 숫자로 변환해요. 심볼은 NaN으로 처리해요.

```typescript
import { toNumber } from 'es-toolkit/compat';

// 일반 숫자는 그대로 반환
toNumber(3.2);
// Returns: 3.2

// 문자열 숫자를 변환
toNumber('3.2');
// Returns: 3.2

// 무한대도 그대로 반환
toNumber(Infinity);
// Returns: Infinity

// 매우 작은 수도 그대로 반환
toNumber(Number.MIN_VALUE);
// Returns: 5e-324
```

심볼과 NaN은 NaN으로 변환해요.

```typescript
import { toNumber } from 'es-toolkit/compat';

toNumber(Symbol.iterator);
// Returns: NaN

toNumber(NaN);
// Returns: NaN
```

#### 파라미터

- `value` (`unknown`): 변환할 값이에요.

#### 반환 값

(`number`): 변환된 숫자를 반환해요.
