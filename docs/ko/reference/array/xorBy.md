# xorBy

주어진 함수로 각 요소를 바꾼 값을 기준으로, 두 배열 중 하나에만 있는 요소들로 새 배열을 만들어요.

```typescript
const result = xorBy(arr1, arr2, mapper);
```

## 레퍼런스

### `xorBy(arr1, arr2, mapper)`

두 배열의 요소를 특정 기준으로 비교해서 대칭 차집합을 구하고 싶을 때 `xorBy`를 사용하세요. 각 요소를 매핑 함수로 변환한 후, 두 배열 중 하나에만 있는 요소들로 새 배열을 만들어요.

```typescript
import { xorBy } from 'es-toolkit/array';

// 객체의 id로 대칭 차집합을 구해요.
xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], obj => obj.id);
// Returns: [{ id: 1 }, { id: 3 }]

// 문자열의 길이로 대칭 차집합을 구해요.
xorBy(['apple', 'banana'], ['grape', 'cherry', 'apple'], str => str.length);
// Returns: ['banana', 'cherry'] (길이 6인 요소들)
```

매핑 함수의 결과가 같은 요소는 하나로 취급해요.

```typescript
import { xorBy } from 'es-toolkit/array';

xorBy([1, 2, 3, 4], [3, 4, 5, 6], n => n % 3);
// Returns: [2, 5] (3으로 나눈 나머지가 2인 요소들)
```

#### 파라미터

- `arr1` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `arr2` (`readonly T[]`): 비교할 두 번째 배열이에요.
- `mapper` (`(item: T) => U`): 각 요소를 비교 가능한 값으로 바꾸는 함수예요.

#### 반환 값

(`T[]`): 매핑 함수의 결과를 기준으로 계산된 대칭 차집합을 나타내는 새 배열을 반환해요.
