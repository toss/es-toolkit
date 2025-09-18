# unionWith

사용자 정의 동일함수를 기준으로 두 배열의 고유한 요소를 포함하는 새 배열을 만들어요.

```typescript
const unified = unionWith(arr1, arr2, areItemsEqual);
```

## 레퍼런스

### `unionWith(arr1, arr2, areItemsEqual)`

복잡한 조건으로 요소들의 동일함을 판단하고 싶을 때 `unionWith`를 사용하세요. 제공한 함수가 참을 반환하면 두 요소를 같은 것으로 판단해 중복을 제거해요.

```typescript
import { unionWith } from 'es-toolkit/array';

// 객체의 id를 기준으로 합집합을 구해요.
const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const array2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
const areItemsEqual = (a, b) => a.id === b.id;
unionWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

더 복잡한 비교 로직도 사용할 수 있어요.

```typescript
import { unionWith } from 'es-toolkit/array';

// 좌표를 기준으로 합집합을 구해요.
const points1 = [
  { x: 1, y: 2 },
  { x: 3, y: 4 }
];
const points2 = [
  { x: 3, y: 4 },
  { x: 5, y: 6 }
];
const arePointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
unionWith(points1, points2, arePointsEqual);
// Returns: [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }]
```

대소문자를 무시한 문자열 비교 예시예요.

```typescript
import { unionWith } from 'es-toolkit/array';

const words1 = ['Apple', 'banana'];
const words2 = ['BANANA', 'orange'];
const areWordsEqual = (a, b) => a.toLowerCase() === b.toLowerCase();
unionWith(words1, words2, areWordsEqual);
// Returns: ['Apple', 'orange']
// 'banana'와 'BANANA'는 같은 것으로 판단되어 첫 번째 배열의 'Apple'만 남아요.
```

#### 파라미터

- `arr1` (`T[]`): 합칠 첫 번째 배열이에요.
- `arr2` (`T[]`): 합칠 두 번째 배열이에요.
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 두 요소가 같은지 판단하는 함수예요. 같다고 판단되면 `true`를, 아니면 `false`를 반환해야 해요.

#### 반환 값

(`T[]`): 사용자 정의 동일함수를 기준으로 중복이 제거된 두 배열의 합집합을 반환해요.
