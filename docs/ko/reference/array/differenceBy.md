# differenceBy

두 배열의 요소를 변환 함수로 바꾸고, 차집합을 구해 새 배열을 반환해요.

```typescript
const result = differenceBy(firstArr, secondArr, mapper);
```

## 사용법

### `differenceBy(firstArr, secondArr, mapper)`

두 배열의 요소를 특정 기준으로 비교해서 차집합을 구하고 싶을 때 `differenceBy`를 사용하세요. 각 요소를 변환 함수로 바꾼 값을 기준으로 비교해서, 첫 번째 배열에만 있는 요소들을 반환해요.

```typescript
import { differenceBy } from 'es-toolkit/array';

// 객체 배열에서 id를 기준으로 차집합을 구해요.
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
differenceBy(array1, array2, item => item.id);
// Returns: [{ id: 1 }, { id: 3 }]
// id가 2인 요소는 두 배열에 모두 있어서 제외돼요.

// 서로 다른 타입의 배열도 비교할 수 있어요.
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
differenceBy(objects, numbers, item => (typeof item === 'object' ? item.id : item));
// Returns: [{ id: 1 }, { id: 3 }]
```

문자열 길이를 기준으로 차집합을 구할 수도 있어요.

```typescript
import { differenceBy } from 'es-toolkit/array';

const words1 = ['apple', 'banana', 'cherry'];
const words2 = ['grape', 'lemon'];
differenceBy(words1, words2, word => word.length);
// Returns: ['banana', 'cherry']
// 'apple'은 'grape'나 'lemon'과 길이가 같아서 제외돼요.
```

#### 파라미터

- `firstArr` (`T[]`): 차집합을 구할 기준 배열이에요.
- `secondArr` (`U[]`): 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요.
- `mapper` (`(value: T | U) => unknown`): 두 배열의 요소를 매핑하는 함수예요. 이 함수가 반환한 값을 기준으로 요소를 비교해요.

#### 반환 값

(`T[]`): 변환된 값을 기준으로 첫 번째 배열에만 있는 요소들로 이루어진 새 배열이에요.
