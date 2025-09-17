# mean (Lodash 호환성)

::: warning `reduce()`를 사용하세요

이 `mean` 함수는 타입 변환과 null/undefined 처리로 인해 느리게 동작해요.

대신 직접 계산하세요: `array.reduce((a, b) => a + b, 0) / array.length`

:::

배열의 평균값을 구해요.

```typescript
const average = mean(array);
```

## 레퍼런스

### `mean(array)`

숫자 배열의 평균값을 계산해요.

```typescript
import { mean } from 'es-toolkit/compat';

// 숫자 배열
mean([1, 2, 3, 4, 5]);
// Returns: 3

mean([10, 20, 30]);
// Returns: 20

mean([1.5, 2.5, 3.5]);
// Returns: 2.5
```

빈 배열은 NaN을 반환해요.

```typescript
import { mean } from 'es-toolkit/compat';

mean([]);
// Returns: NaN

mean(null);
// Returns: NaN

mean(undefined);
// Returns: NaN
```

잘못된 값들은 무시하고 계산해요.

```typescript
import { mean } from 'es-toolkit/compat';

mean([1, undefined, 2, null, 3]);
// Returns: 2 (1 + 2 + 3) / 3 = 2
```

문자열 숫자도 처리해요.

```typescript
import { mean } from 'es-toolkit/compat';

mean(['1', '2', '3']);
// Returns: 2 (문자열이 숫자로 변환됨)
```

#### 파라미터

- `array` (`ArrayLike<any> | null | undefined`): 평균을 구할 숫자들이 있는 배열이에요.

### 반환 값

(`number`): 배열의 평균값을 반환해요. 빈 배열이면 `NaN`을 반환해요.