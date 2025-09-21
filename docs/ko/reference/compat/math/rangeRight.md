# rangeRight (Lodash 호환성)

::: warning es-toolkit의 [rangeRight](../../math/rangeRight.md)를 사용하세요

이 `rangeRight` 함수는 복잡한 인수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [rangeRight](../../math/rangeRight.md)를 사용하세요.

:::

숫자 범위 배열을 역순으로 만들어요.

```typescript
const numbers = rangeRight(start, end, step);
```

## 레퍼런스

### `rangeRight(end)`

0부터 end까지 1씩 증가한 뒤 역순으로 배열을 만들어요.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(4);
// Returns: [3, 2, 1, 0]

rangeRight(0);
// Returns: []

rangeRight(-4);
// Returns: [-3, -2, -1, 0]
```

### `rangeRight(start, end)`

start부터 end까지 1씩 증가한 뒤 역순으로 배열을 만들어요.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(1, 5);
// Returns: [4, 3, 2, 1]

rangeRight(5, 1);
// Returns: [2, 3, 4, 5] (자동으로 -1씩 감소했다가 역순)

rangeRight(-2, 3);
// Returns: [2, 1, 0, -1, -2]
```

### `rangeRight(start, end, step)`

start부터 end까지 step만큼 증가한 뒤 역순으로 배열을 만들어요.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 8, 2);
// Returns: [6, 4, 2, 0]

rangeRight(0, -4, -1);
// Returns: [-3, -2, -1, 0]

rangeRight(1, 4, 0);
// Returns: [] (step이 0이면 빈 배열)
```

소수 step도 가능해요.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 1, 0.2);
// Returns: [0.8, 0.6, 0.4, 0.2, 0]

rangeRight(1, 0, -0.25);
// Returns: [0.25, 0.5, 0.75, 1]
```

iteratee로 사용할 때는 guard 객체로 처리해요.

```typescript
import { rangeRight } from 'es-toolkit/compat';

[1, 2, 3].map(rangeRight);
// Returns: [[0], [1, 0], [2, 1, 0]]
```

#### 파라미터

- `start` (`number`): 범위의 시작값이에요 (포함). `end`가 없으면 이 값이 end가 돼요.
- `end` (`number`, 선택): 범위의 끝값이에요 (포함되지 않음).
- `step` (`number`, 선택): 증가폭이에요. 기본값은 1 또는 -1이에요.

### 반환 값

(`number[]`): 지정된 범위의 숫자 배열을 역순으로 반환해요.
