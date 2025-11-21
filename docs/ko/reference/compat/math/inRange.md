# inRange (Lodash 호환성)

::: warning `es-toolkit`의 [inRange](../../math/inRange.md)을 사용하세요

이 `inRange` 함수는 복잡한 타입 변환과 null/undefined 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [inRange](../../math/inRange.md)을 사용하세요.

:::

숫자가 지정된 범위 내에 있는지 확인해요.

```typescript
const result = inRange(value, minimum, maximum);
```

## 사용법

### `inRange(value, minimum, maximum?)`

숫자가 특정 범위 안에 있는지 확인하고 싶을 때 `inRange`을 사용하세요. 최솟값은 포함되고 최댓값은 포함되지 않아요.

```typescript
import { inRange } from 'es-toolkit/compat';

// 기본 사용법
inRange(3, 2, 4);
// Returns: true (2 ≤ 3 < 4)

inRange(1, 2, 5);
// Returns: false (1 < 2)

inRange(5, 2, 5);
// Returns: false (5는 포함되지 않음)

// 범위 경계값
inRange(2, 2, 4);
// Returns: true (최솟값은 포함)

inRange(4, 2, 4);
// Returns: false (최댓값은 포함되지 않음)
```

### `inRange(value, maximum)`

두 개의 인수만 제공하면 0부터 maximum까지의 범위로 처리해요.

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5);
// Returns: true (0 ≤ 3 < 5)

inRange(-1, 5);
// Returns: false (-1 < 0)

inRange(0, 5);
// Returns: true (0 ≤ 0 < 5)

inRange(5, 5);
// Returns: false (5는 포함되지 않음)
```

최솟값이 최댓값보다 크면 자동으로 교체해요.

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5, 2);
// Returns: true (범위가 2~5로 바뀌고, 2 ≤ 3 < 5)

inRange(1, 5, 2);
// Returns: false (1 < 2)
```

잘못된 값들은 적절히 변환해요.

```typescript
import { inRange } from 'es-toolkit/compat';

// 문자열 숫자 변환
inRange(3, '2', '4');
// Returns: true

// falsy 값은 0으로 처리
inRange(1, null, 5);
// Returns: true (null이 0으로 처리되어 0~5 범위)

inRange(3, false, 5);
// Returns: true (false가 0으로 처리)
```

#### 파라미터

- `value` (`number`): 범위 안에 있는지 확인할 숫자예요.
- `minimum` (`number`): 범위의 최솟값이에요 (포함). `maximum`이 없으면 이 값이 최댓값이 돼요.
- `maximum` (`number`, 선택): 범위의 최댓값이에요 (포함되지 않음).

#### 반환 값

(`boolean`): 값이 지정된 범위 안에 있으면 `true`, 아니면 `false`를 반환해요.
