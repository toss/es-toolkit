# percentile

숫자 배열에서 주어진 백분위수에 해당하는 값을 계산해요.

`percentile` 함수는 배열을 오름차순으로 정렬하고, 가장 가까운 순위에 있는 요소를 반환해요 ([Nearest rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method)).

```typescript
const value = percentile(arr, p);
```

## 사용법

### `percentile(arr, percentile)`

숫자 배열에서 특정 백분위수에 해당하는 값을 찾고 싶을 때 `percentile`을 사용하세요. 예를 들어 50번째 백분위수는 중앙값이고, 75번째 백분위수는 전체 데이터의 75%가 그 아래에 있는 값이에요.

```typescript
import { percentile } from 'es-toolkit/math';

// 배열의 중앙값(50번째 백분위수)을 구해요
const median = percentile([1, 2, 3, 4, 5], 50); // median은 3이 돼요

// 75번째 백분위수를 구해요
const p75 = percentile([1, 2, 3, 4, 5], 75); // p75는 4가 돼요

// 정렬되지 않은 배열도 자동으로 정렬해요
const result = percentile([50, 10, 30, 20, 40], 50); // result는 30이 돼요

// 0번째 백분위수는 가장 작은 값을 반환해요
const min = percentile([5, 1, 4, 2, 3], 0); // min은 1이 돼요

// 빈 배열의 경우 NaN을 반환해요
const empty = percentile([], 50); // empty는 NaN이 돼요
```

#### 파라미터

- `arr` (`readonly number[]`): 백분위수를 계산할 숫자 배열이에요.
- `percentile` (`number`): 계산할 백분위수예요. `[0, 100]` 범위의 값이어야 해요.

#### 반환 값

(`number`): 주어진 백분위수에 해당하는 값을 반환해요. 빈 배열이면 `NaN`을 반환해요.

#### 에러

`percentile`이 `NaN`이거나, `0`보다 작거나, `100`보다 크면 에러를 던져요.
