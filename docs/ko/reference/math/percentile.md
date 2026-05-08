# percentile

숫자 배열에서 주어진 백분위수에 해당하는 값을 계산해요.

```typescript
const value = percentile(arr, p);
```

## 인터페이스

```typescript
function percentile(arr: readonly number[], percentile: number): number;
```

### 파라미터

- `arr` (`readonly number[]`): 백분위수를 계산할 숫자 배열이에요.
- `percentile` (`number`): 계산할 백분위수예요. `[0, 100]` 범위의 값이어야 해요.

### 반환 값

(`number`): 주어진 백분위수에 해당하는 값을 반환해요. 빈 배열이면 `NaN`을 반환해요.

### 에러

`percentile`이 `NaN`이거나, `0`보다 작거나, `100`보다 크면 `Error`를 던져요.

## 동작 방식

배열을 오름차순으로 정렬한 다음, 아래 위치의 요소를 반환해요.

```typescript
const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
return sorted[index];
```

이건 **nearest-rank**(가장 가까운 순위) 방식이에요. 배열 길이에 `percentile / 100`을 곱하면 1부터 시작하는 순위(rank)가 나와요. `Math.ceil`로 올림하면 요청한 비율 이상을 포함하는 가장 작은 순위가 선택되고, 거기에 `1`을 빼서 0부터 시작하는 배열 인덱스로 변환해요.

예를 들어, 길이가 100인 정렬된 배열에서 `percentile = 75`이면:

- `Math.ceil(100 * 0.75) - 1` → `74`
- 75번째로 작은 값(`sorted[74]`)을 반환해요.

`percentile = 0`은 위 공식대로면 `-1`이 되기 때문에, 별도로 처리해서 가장 작은 값을 반환해요.

## 예시

```typescript
import { percentile } from 'es-toolkit/math';

// 배열의 중앙값(50번째 백분위수)을 반환해요
percentile([1, 2, 3, 4, 5], 50);
// 3을 반환해요

// 75번째 백분위수를 계산해요
percentile([1, 2, 3, 4, 5], 75);
// 4를 반환해요

// 정렬되지 않은 배열도 자동으로 정렬해요
percentile([50, 10, 30, 20, 40], 50);
// 30을 반환해요

// 0번째 백분위수에서는 가장 작은 값을 반환해요
percentile([5, 1, 4, 2, 3], 0);
// 1을 반환해요

// 빈 배열의 경우 NaN을 반환해요
percentile([], 50);
// NaN을 반환해요
```
