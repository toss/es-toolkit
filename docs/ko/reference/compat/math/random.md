# random (Lodash 호환성)

::: warning `Math.random()`을 사용하세요

이 `random` 함수는 복잡한 인수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 더 빠른 `Math.random()`을 사용하세요.

:::

범위 내에서 랜덤한 숫자를 만들어요.

```typescript
const result = random(min, max, floating);
```

## 레퍼런스

### `random(floating?)`

0과 1 사이의 랜덤한 숫자를 만들어요.

```typescript
import { random } from 'es-toolkit/compat';

random();
// Returns: 0.123456789 (0~1 사이 소수)

random(true);
// Returns: 0.987654321 (소수로 반환)

random(false);
// Returns: 0 또는 1 (정수로 반환)
```

### `random(max, floating?)`

0부터 max까지의 랜덤한 숫자를 만들어요.

```typescript
import { random } from 'es-toolkit/compat';

random(5);
// Returns: 3.456789 (0~5 사이 소수)

random(10, true);
// Returns: 7.123456 (0~10 사이 소수)

random(3, false);
// Returns: 2 (0~3 사이 정수)
```

### `random(min, max, floating?)`

min부터 max까지의 랜덤한 숫자를 만들어요.

```typescript
import { random } from 'es-toolkit/compat';

random(1, 5);
// Returns: 3.456789 (1~5 사이 소수)

random(0, 10, true);
// Returns: 6.789012 (0~10 사이 소수)

random(1, 6, false);
// Returns: 4 (1~6 사이 정수)
```

범위가 바뀌면 자동으로 교체해요.

```typescript
import { random } from 'es-toolkit/compat';

random(5, 1);
// Returns: 3.456789 (범위가 1~5로 바뀜)
```

guard 객체로 특별한 경우를 처리해요.

```typescript
import { random } from 'es-toolkit/compat';

const guard = { 5: 5 };
random(5, 5, guard);
// Returns: 2.345678 (0~5 사이 소수)
```

#### 파라미터

- `floating` (`boolean`, 선택): 소수를 반환할지 정해요. 기본값은 `true`예요.
- `max` (`number`): 범위의 최댓값이에요 (포함되지 않음).
- `min` (`number`): 범위의 최솟값이에요 (포함).
- `index` (`string | number`): guard 객체에서 확인할 키예요.
- `guard` (`object`): 파라미터를 검증하는 guard 객체예요.

### 반환 값

(`number`): 지정된 범위 내의 랜덤한 숫자를 반환해요.
