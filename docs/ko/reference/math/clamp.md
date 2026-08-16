# clamp

숫자를 지정된 범위 내에 고정해요.

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

## 사용법

### `clamp(value, maximum)`

숫자를 주어진 최댓값 이하로 제한하고 싶을 때 `clamp`를 사용하세요. 값이 최댓값보다 크면 최댓값으로 고정되고, 그렇지 않으면 원래 값을 반환해요.

```typescript
import { clamp } from 'es-toolkit/math';

// 최댓값으로 제한해요
const result1 = clamp(10, 5); // result1은 5가 돼요 (10이 최댓값 5로 제한됨)
const result2 = clamp(3, 5); // result2는 3이 돼요 (5보다 작으므로 그대로)
```

#### 파라미터

- `value` (`number`): 고정할 숫자예요.
- `maximum` (`number`): 최댓값이에요.

#### 반환 값

(`number`): 최댓값 이하로 고정된 숫자를 반환해요.

### `clamp(value, minimum, maximum)`

숫자를 주어진 최솟값과 최댓값 범위 내에 고정하고 싶을 때 `clamp`를 사용하세요. 값이 범위를 벗어나면 가장 가까운 경계값으로 제한돼요.

```typescript
import { clamp } from 'es-toolkit/math';

// 최솟값과 최댓값 범위 내에 고정해요
const result1 = clamp(10, 5, 15); // result1은 10이 돼요 (5와 15 범위 내에 있음)
const result2 = clamp(2, 5, 15); // result2는 5가 돼요 (최솟값 5로 제한됨)
const result3 = clamp(20, 5, 15); // result3은 15가 돼요 (최댓값 15로 제한됨)
```

#### 파라미터

- `value` (`number`): 고정할 숫자예요.
- `minimum` (`number`): 최솟값이에요.
- `maximum` (`number`): 최댓값이에요.

#### 반환 값

(`number`): 지정된 범위 내에서 고정된 숫자를 반환해요.
