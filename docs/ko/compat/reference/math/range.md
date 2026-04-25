# range (Lodash 호환성)

::: warning es-toolkit의 [range](../../math/range.md)를 사용하세요

이 `range` 함수는 복잡한 인수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [range](../../math/range.md)를 사용하세요.

:::

숫자 범위 배열을 만들어요.

```typescript
const numbers = range(start, end, step);
```

## 사용법

### `range(end)`

0부터 end까지 1씩 증가하는 배열을 만들어요.

```typescript
import { range } from 'es-toolkit/compat';

range(4);
// Returns: [0, 1, 2, 3]

range(0);
// Returns: []

range(-4);
// Returns: [0, -1, -2, -3]
```

### `range(start, end)`

start부터 end까지 1씩 증가하는 배열을 만들어요.

```typescript
import { range } from 'es-toolkit/compat';

range(1, 5);
// Returns: [1, 2, 3, 4]

range(5, 1);
// Returns: [5, 4, 3, 2] (자동으로 -1씩 감소)

range(-2, 3);
// Returns: [-2, -1, 0, 1, 2]
```

### `range(start, end, step)`

start부터 end까지 step만큼 증가하는 배열을 만들어요.

```typescript
import { range } from 'es-toolkit/compat';

range(0, 20, 5);
// Returns: [0, 5, 10, 15]

range(0, -4, -1);
// Returns: [0, -1, -2, -3]

range(1, 4, 0);
// Returns: [1, 1, 1]
```

소수 step도 가능해요.

```typescript
import { range } from 'es-toolkit/compat';

range(0, 1, 0.2);
// Returns: [0, 0.2, 0.4, 0.6, 0.8]

range(1, 0, -0.25);
// Returns: [1, 0.75, 0.5, 0.25]
```

iteratee로 사용할 때는 guard 객체로 처리해요.

```typescript
import { range } from 'es-toolkit/compat';

[1, 2, 3].map(range);
// Returns: [[0], [0, 1], [0, 1, 2]]
```

#### 파라미터

- `start` (`number`): 범위의 시작값이에요 (포함). `end`가 없으면 이 값이 end가 돼요.
- `end` (`number`, 선택): 범위의 끝값이에요 (포함되지 않음).
- `step` (`number`, 선택): 증가폭이에요. 기본값은 1 또는 -1이에요.

#### 반환 값

(`number[]`): 지정된 범위의 숫자 배열을 반환해요.
