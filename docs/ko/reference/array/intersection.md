# intersection

두 배열에 공통으로 포함된 요소들로 이루어진 새 배열을 반환해요.

```typescript
const result = intersection(firstArr, secondArr);
```

## 사용법

### `intersection(firstArr, secondArr)`

두 배열에서 공통 요소만 찾고 싶을 때 `intersection`을 사용하세요. 첫 번째 배열의 요소 중에서 두 번째 배열에도 존재하는 것들만 새 배열로 반환해요. 두 데이터 세트의 교집합을 구할 때 유용해요.

```typescript
import { intersection } from 'es-toolkit/array';

// 숫자 배열의 교집합을 구해요.
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
intersection(numbers1, numbers2);
// Returns: [3, 4, 5]

// 문자열 배열의 교집합을 구해요.
const strings1 = ['apple', 'banana', 'cherry'];
const strings2 = ['banana', 'cherry', 'date'];
intersection(strings1, strings2);
// Returns: ['banana', 'cherry']
```

교집합이 없거나 특별한 경우도 처리해요.

```typescript
import { intersection } from 'es-toolkit/array';

// 교집합이 없는 경우 빈 배열을 반환해요.
const noCommon1 = [1, 2, 3];
const noCommon2 = [4, 5, 6];
intersection(noCommon1, noCommon2);
// Returns: []

// 한쪽이 빈 배열인 경우도 빈 배열을 반환해요.
const numbers = [1, 2, 3];
const empty: number[] = [];
intersection(numbers, empty);
// Returns: []
```

#### 파라미터

- `firstArr` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `secondArr` (`readonly T[]`): 비교할 두 번째 배열이에요.

#### 반환 값

(`T[]`): 두 배열에 공통으로 포함된 요소들로 이루어진 새 배열을 반환해요.
