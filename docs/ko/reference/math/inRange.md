# inRange

값이 지정된 범위 내에 있는지 확인해요.

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

## 레퍼런스

### `inRange(value, maximum)`

값이 0부터 최댓값 미만 범위에 있는지 확인하고 싶을 때 `inRange`를 사용하세요. 최솟값은 자동으로 0이 돼요.

```typescript
import { inRange } from 'es-toolkit/math';

// 0부터 5 미만 범위에서 확인해요
const result1 = inRange(3, 5); // result1은 true가 돼요 (0 <= 3 < 5)
const result2 = inRange(5, 5); // result2는 false가 돼요 (5는 5 미만이 아님)
const result3 = inRange(-1, 5); // result3은 false가 돼요 (-1 < 0)
```

#### 파라미터

- `value` (`number`): 확인할 값이에요.
- `maximum` (`number`): 범위의 최댓값(미포함)이에요.

#### 반환 값

(`boolean`): 값이 0 이상 최댓값 미만 범위에 있으면 `true`, 그렇지 않으면 `false`를 반환해요.

### `inRange(value, minimum, maximum)`

값이 지정된 최솟값과 최댓값 범위에 있는지 확인하고 싶을 때 `inRange`를 사용하세요.

```typescript
import { inRange } from 'es-toolkit/math';

// 최솟값과 최댓값 범위에서 확인해요
const result1 = inRange(3, 2, 5); // result1은 true가 돼요 (2 <= 3 < 5)
const result2 = inRange(1, 2, 5); // result2는 false가 돼요 (1 < 2)
const result3 = inRange(5, 2, 5); // result3은 false가 돼요 (5는 5 미만이 아님)

// 음수 범위에서도 사용할 수 있어요
const result4 = inRange(-3, -5, -1); // result4는 true가 돼요 (-5 <= -3 < -1)
```

#### 파라미터

- `value` (`number`): 확인할 값이에요.
- `minimum` (`number`): 범위의 최솟값(포함)이에요.
- `maximum` (`number`): 범위의 최댓값(미포함)이에요.

#### 반환 값

(`boolean`): 값이 지정된 범위 내에 있으면 `true`, 그렇지 않으면 `false`를 반환해요.

#### 에러

최솟값이 최댓값보다 크거나 같으면 에러를 던져요.
