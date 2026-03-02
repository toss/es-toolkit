# round (Lodash 호환성)

::: warning `Math.round()`를 사용하세요

이 `round` 함수는 정밀도 처리로 인해 느리게 동작해요.

대신 `Math.round()`를 사용하거나 원하는 소수점으로 계산하세요.

:::

숫자를 반올림해요.

```typescript
const rounded = round(number, precision);
```

## 사용법

### `round(number, precision?)`

숫자를 지정한 소수점 자리까지 반올림해요.

```typescript
import { round } from 'es-toolkit/compat';

// 기본 반올림 (소수점 0자리)
round(4.006);
// Returns: 4

round(4.6);
// Returns: 5

// 소수점 지정
round(4.006, 2);
// Returns: 4.01

round(4.123456, 3);
// Returns: 4.123
```

음수 정밀도도 가능해요.

```typescript
import { round } from 'es-toolkit/compat';

// 십의 자리 반올림
round(4060, -2);
// Returns: 4100

round(1234, -1);
// Returns: 1230

round(1234, -3);
// Returns: 1000
```

음수도 처리해요.

```typescript
import { round } from 'es-toolkit/compat';

round(-4.006);
// Returns: -4

round(-4.006, 2);
// Returns: -4.01

round(-1234, -2);
// Returns: -1200
```

#### 파라미터

- `number` (`number`): 반올림할 숫자예요.
- `precision` (`number`, 선택): 반올림할 소수점 자릿수예요. 기본값은 `0`이에요.

#### 반환 값

(`number`): 반올림된 숫자를 반환해요.
