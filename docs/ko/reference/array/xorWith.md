# xorWith

주어진 비교 함수를 사용해서, 두 배열 중 하나에만 있는 요소들로 새 배열을 만들어요.

```typescript
const result = xorWith(arr1, arr2, areElementsEqual);
```

## 사용법

### `xorWith(arr1, arr2, areElementsEqual)`

복잡한 객체나 특별한 비교 조건으로 대칭 차집합을 구하고 싶을 때 `xorWith`를 사용하세요. 사용자가 정의한 동등성 함수로 요소들을 비교해서, 두 배열 중 하나에만 있는 요소들로 새 배열을 만들어요.

```typescript
import { xorWith } from 'es-toolkit/array';

// 객체의 id로 비교해요.
xorWith(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  [
    { id: 2, name: 'Bobby' },
    { id: 3, name: 'Charlie' },
  ],
  (a, b) => a.id === b.id
);
// Returns: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// 대소문자를 무시하고 비교해요.
xorWith(['Apple', 'Banana'], ['APPLE', 'Cherry'], (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Banana', 'Cherry']
```

더 복잡한 비교도 가능해요.

```typescript
import { xorWith } from 'es-toolkit/array';

// 절댓값으로 비교해요.
xorWith([-1, -2, 3], [1, 2, -4], (a, b) => Math.abs(a) === Math.abs(b));
// Returns: [3, -4]

// 깊은 객체 비교를 해요.
xorWith(
  [{ specs: { ram: 8, storage: 256 } }],
  [{ specs: { ram: 8, storage: 256 } }],
  (a, b) => a.specs.ram === b.specs.ram && a.specs.storage === b.specs.storage
);
// Returns: []
```

#### 파라미터

- `arr1` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `arr2` (`readonly T[]`): 비교할 두 번째 배열이에요.
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): 두 요소가 같은지 판단하는 함수예요. 같으면 `true`, 다르면 `false`를 반환해야 해요.

#### 반환 값

(`T[]`): 사용자 정의 동등성 함수를 기준으로 계산된 대칭 차집합을 나타내는 새 배열을 반환해요.
