# median

숫자 배열의 중앙값을 계산해요.

```typescript
const middle = median(nums);
```

## 레퍼런스

### `median(nums)`

숫자 배열의 중앙값을 구하고 싶을 때 `median`을 사용하세요. 배열을 오름차순으로 정렬한 후, 가운데에 위치한 값을 찾아요. 홀수 개 요소를 가진 배열이면 정확히 가운데 값을, 짝수 개 요소를 가진 배열이면 가운데 두 값의 평균을 반환해요. 빈 배열이 주어지면 `NaN`을 반환해요.

```typescript
import { median } from 'es-toolkit/math';

// 홀수 개 요소가 있는 배열의 중앙값을 계산해요
const oddNumbers = [1, 2, 3, 4, 5];
const oddResult = median(oddNumbers);
// oddResult는 3이 돼요 (정렬된 배열 [1, 2, 3, 4, 5]에서 가운데 값)

// 짝수 개 요소가 있는 배열의 중앙값을 계산해요
const evenNumbers = [1, 2, 3, 4];
const evenResult = median(evenNumbers);
// evenResult는 2.5가 돼요 ((2 + 3) / 2 = 2.5)

// 정렬되지 않은 배열도 자동으로 정렬해요
const unordered = [3, 1, 4, 1, 5];
const unorderedResult = median(unordered);
// unorderedResult는 3이 돼요 (정렬 후 [1, 1, 3, 4, 5]에서 가운데 값)

// 빈 배열의 경우 NaN을 반환해요
const emptyResult = median([]);
// emptyResult는 NaN이 돼요
```

#### 파라미터

- `nums` (`readonly number[]`): 중앙값을 계산할 숫자 배열이에요.

#### 반환 값

(`number`): 배열에 있는 모든 숫자의 중앙값을 반환해요. 빈 배열이면 `NaN`을 반환해요.
