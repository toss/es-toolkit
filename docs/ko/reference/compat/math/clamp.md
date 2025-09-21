# clamp (Lodash 호환성)

::: warning `es-toolkit`의 [clamp](../../math/clamp.md)를 사용하세요

이 `clamp` 함수는 NaN 검증과 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [clamp](../../math/clamp.md)를 사용하세요.

:::

숫자를 지정된 범위 내로 제한해요.

```typescript
const clamped = clamp(number, lower, upper);
```

## 레퍼런스

### `clamp(number, lower, upper)`

숫자를 지정된 최솟값과 최댓값 사이로 제한하고 싶을 때 `clamp`를 사용하세요.

```typescript
import { clamp } from 'es-toolkit/compat';

// 기본 사용법
clamp(3, 2, 4);
// Returns: 3 (범위 안에 있음)

clamp(0, 5, 10);
// Returns: 5 (최솟값으로 제한)

clamp(15, 5, 10);
// Returns: 10 (최댓값으로 제한)

// 음수도 처리
clamp(-5, -10, -1);
// Returns: -5

clamp(-15, -10, -1);
// Returns: -10 (최솟값으로 제한)
```

### `clamp(number, upper)`

하나의 인수만 제공하면 그 값을 최댓값으로 사용해요.

```typescript
import { clamp } from 'es-toolkit/compat';

// 최댓값만 지정
clamp(5, 3);
// Returns: 3 (최댓값으로 제한)

clamp(2, 3);
// Returns: 2 (범위 안에 있음)

clamp(1, 5);
// Returns: 1
```

NaN 값은 0으로 처리해요.

```typescript
import { clamp } from 'es-toolkit/compat';

clamp(5, NaN, 10);
// Returns: 5 (NaN이 0으로 처리되어 범위는 0~10)

clamp(5, 2, NaN);
// Returns: 2 (NaN이 0으로 처리되어 범위는 0~2)
```

#### 파라미터

- `number` (`number`): 제한할 숫자예요.
- `lower` (`number`): 최솟값이에요. 두 번째 파라미터만 있으면 최댓값이 돼요.
- `upper` (`number`, 선택): 최댓값이에요.

### 반환 값

(`number`): 지정된 범위 내로 제한된 숫자를 반환해요.
