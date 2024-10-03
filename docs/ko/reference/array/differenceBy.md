# differenceBy

제공된 함수로 요소들을 매핑한 후 두 배열의 차이를 계산해요.

이 함수는 두 배열과 매퍼 함수를 받아, 매퍼 함수로 계산된 결과를 기준으로 첫 번째 배열에 있지만 두 번째 배열에는 없는 요소들을 포함한 새로운 배열을 반환해요. 즉, 매핑된 값이 두 번째 배열의 매핑된 값과 일치하는 첫 번째 배열의 요소들을 제외한 나머지 요소들로 구성된 배열을 만들어줘요.

## 인터페이스

```typescript
function differenceBy<T, U>(firstArr: T[], secondArr: T[], mapper: (value: T) => U): T[];
```

### 파라미터

- `firstArr` (`T[]`): 차이를 계산할 배열이에요. 이 배열이 주 배열이고, 이 배열의 요소들이 비교되고 필터링돼요.
- `secondArr` (`T[]`): 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요.
- `mapper` (`(value: T) => U`): 두 배열의 요소들을 매핑할 함수에요. 이 함수는 두 배열의 각 요소에 적용되며, 매핑된 값들을 기준으로 비교를 해요.

### 반환 값

(`T[]`): 첫 번째 배열에는 있지만 매핑된 값이 두 번째 배열의 매핑된 값과 일치하지 않는 요소들이 담긴 새로운 배열이에요.

## 예시

```typescript
import { differenceBy } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = differenceBy(array1, array2, mapper);
// result는 [{ id: 1 }, { id: 3 }, { id: 5 }]가 돼요. id가 2인 요소들은 두 배열 모두에 있어서 결과에서 제외돼요.
```

## Lodash 호환성

`es-toolkit/compat`에서 `differenceBy`를 가져오면 lodash와 호환돼요.

- `differenceBy`는 첫 번째 유사 배열 객체와 하나 이상의 후속 유사 배열 객체를 비교해요.
- `differenceBy`는 선택적으로 마지막 인자로 함수 또는 속성 키를 받아요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

differenceBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], item => item.x); // Returns [{ x: 2 }]
differenceBy([{ x: 1 }, { x: 2 }], [{ x: 1 }], 'x'); // Returns [{ x: 2 }]
differenceBy([{ x: 1 }, { x: 2 }, { x: 3 }], [{ x: 2 }], [{ x: 3 }], 'x'); // Returns [{ x: 1 }]
differenceBy([1, 2, 3], [2], [3]); // Returns [1]
```
