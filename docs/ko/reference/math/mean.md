# mean

숫자 배열의 평균을 계산해요.

```typescript
const average = mean(nums);
```

## 레퍼런스

### `mean(nums)`

숫자 배열의 평균값을 구하고 싶을 때 `mean`을 사용하세요. 모든 숫자를 더한 후 배열의 길이로 나누어 평균을 계산해요. 빈 배열이 주어지면 `NaN`을 반환해요.

```typescript
import { mean } from 'es-toolkit/math';

// 숫자 배열의 평균을 계산해요
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// result는 3이 돼요 ((1 + 2 + 3 + 4 + 5) / 5 = 15 / 5 = 3)

// 소수점이 있는 숫자들의 평균을 계산해요
const decimals = [1.5, 2.5, 3.5];
const decimalResult = mean(decimals);
// decimalResult는 2.5가 돼요

// 빈 배열의 경우 NaN을 반환해요
const emptyResult = mean([]);
// emptyResult는 NaN이 돼요
```

#### 파라미터

- `nums` (`readonly number[]`): 평균을 계산할 숫자 배열이에요.

#### 반환 값

(`number`): 배열에 있는 모든 숫자의 평균을 반환해요. 빈 배열이면 `NaN`을 반환해요.
