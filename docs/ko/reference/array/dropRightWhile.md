# dropRightWhile

배열의 끝부터 조건을 만족하는 동안 요소를 제거한 새 배열을 반환해요.

```typescript
const result = dropRightWhile(arr, canContinueDropping);
```

## 레퍼런스

### `dropRightWhile(arr, canContinueDropping)`

배열의 뒤에서부터 특정 조건을 만족하는 요소들을 제거하고 싶을 때 `dropRightWhile`을 사용하세요. 배열의 끝부터 시작해서 조건 함수가 `true`를 반환하는 동안 요소를 제거하고, 조건 함수가 `false`를 반환하면 중단해요.

```typescript
import { dropRightWhile } from 'es-toolkit/array';

// 끝에서부터 3보다 큰 요소들을 제거해요.
const numbers = [1, 2, 3, 4, 5];
dropRightWhile(numbers, x => x > 3);
// Returns: [1, 2, 3]
// 4와 5가 조건을 만족해서 제거되고, 3에서 조건이 false가 되어 중단돼요.

// 객체 배열에서 특정 조건의 요소들을 제거해요.
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: false },
  { name: 'David', active: false },
];
dropRightWhile(users, user => !user.active);
// Returns: [{ name: 'Alice', active: true }, { name: 'Bob', active: true }]
```

빈 배열이나 조건을 만족하는 요소가 없으면 원본 배열과 같은 새 배열을 반환해요.

```typescript
import { dropRightWhile } from 'es-toolkit/array';

dropRightWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropRightWhile([], x => true); // []
```

#### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열이에요.
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 요소를 계속 제거할지 결정하는 조건 함수예요. 배열의 각 요소와 인덱스, 전체 배열을 받아서 참 또는 거짓을 반환해요.

#### 반환 값

(`T[]`): 조건을 만족하지 않는 요소부터 배열의 시작까지를 포함한 새 배열이에요.
