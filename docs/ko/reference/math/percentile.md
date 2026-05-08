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
