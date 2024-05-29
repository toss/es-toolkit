# differenceWith

인자로 제공된 비교 함수에 따라 두 배열의 차이를 계산해요.

이 함수는 두 배열과 비교 함수를 받아요. 이 비교 함수로 요소들이 동일한지 비교해서 첫 번째 배열에 있지만 두 번째 배열에는 없는 요소들을 포함한 새로운 배열을 반환해요.

## 인터페이스

```typescript
function differenceWith<T>(firstArr: T[], secondArr: T[], areItemsEqual: (x: T, y: T) => boolean): T[]
```

### 파라미터

- `firstArr` (`T[]`): 차이를 계산할 배열이에요. 이 배열이 주 배열이고, 이 배열의 요소들이 비교되고 필터링돼요.
- `secondArr` (`T[]`) : 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요.
- `areItemsEqual` (`(x: T, y: T) => boolean`): 두 요소가 동일한지 결정할 함수에요.

### 반환 값
(`T[]`) 비교 함수에 따라 첫 번째 배열에는 있지만 두 번째 배열에는 존재하지 않는다고 결정된 요소들이 담긴 새로운 배열이에요.


## 예시

```typescript
import { differenceWith } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = differenceWith(array1, array2, areItemsEqual);
// result는 [{ id: 1 }, { id: 3 }]가 돼요. id가 2인 요소들은 동일하다고 간주돼서 결과에서 제외돼요.
```
