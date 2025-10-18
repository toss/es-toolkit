# sampleSize

배열에서 지정된 크기만큼 무작위로 선택된 요소들로 이루어진 새 배열을 반환해요.

```typescript
const sampled = sampleSize(array, size);
```

## 레퍼런스

### `sampleSize(array, size)`

배열에서 여러 개의 요소를 무작위로 샘플링하고 싶을 때 `sampleSize`를 사용하세요. Floyd의 알고리즘을 사용해서 효율적으로 중복 없는 랜덤 샘플을 생성해요. 설문조사에서 표본을 추출하거나, 게임에서 여러 아이템을 랜덤하게 선택할 때 유용해요.

```typescript
import { sampleSize } from 'es-toolkit/array';

// 숫자 배열에서 3개를 무작위로 선택해요.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomNumbers = sampleSize(numbers, 3);
// Returns: [2, 7, 9] (예시, 실제로는 무작위)

// 문자열 배열에서 2개를 무작위로 선택해요.
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const randomFruits = sampleSize(fruits, 2);
// Returns: ['cherry', 'apple'] (예시, 실제로는 무작위)
```

다양한 크기로 샘플링할 수 있어요.

```typescript
import { sampleSize } from 'es-toolkit/array';

const items = ['a', 'b', 'c', 'd', 'e'];

// 1개 선택
const single = sampleSize(items, 1);
// Returns: ['c'] (예시)

// 전체 배열 크기와 같게 선택 (섞은 효과)
const all = sampleSize(items, 5);
// Returns: ['b', 'd', 'a', 'e', 'c'] (예시)

// 빈 배열 선택
const none = sampleSize(items, 0);
// Returns: []
```

#### 파라미터

- `array` (`readonly T[]`): 샘플링할 배열이에요.
- `size` (`number`): 선택할 요소의 개수예요.

#### 반환 값

(`T[]`): 무작위로 선택된 요소들로 구성된 새 배열을 반환해요.

#### 에러

`size`가 배열의 길이보다 크면 에러를 던져요.
