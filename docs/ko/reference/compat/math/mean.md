# mean (Lodash 호환성)

::: warning es-toolkit의 [mean](../../math/mean.md)를 사용하세요

이 `mean` 함수는 타입 변환과 null/undefined 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [mean](../../math/mean.md)를 사용하세요.

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

유효하지 않은 값은 0으로 간주되어 계산에 포함돼요.

```typescript
import { mean } from 'es-toolkit/compat';

mean([1, undefined, 2, null, 3]);
// Returns: 1.2 (1 + 2 + 3) / 5 = 1.2
```

문자열 숫자도 처리돼요.

```typescript
import { mean } from 'es-toolkit/compat';

mean(['1', '2', '3']);
// Returns: 41 (123 / 3 = 41)
```

#### 파라미터

- `array` (`ArrayLike<any> | null | undefined`): 평균을 구할 숫자들이 있는 배열이에요.

#### 반환 값

(`number`): 배열의 평균값을 반환해요. 빈 배열이면 `NaN`을 반환해요.
