# dropWhile

배열의 시작부터 조건을 만족하는 동안 요소를 제거한 새 배열을 반환해요.

```typescript
const result = dropWhile(arr, canContinueDropping);
```

## 사용법

### `dropWhile(arr, canContinueDropping)`

배열의 앞에서부터 특정 조건을 만족하는 요소들을 제거하고 싶을 때 `dropWhile`을 사용하세요. 배열의 시작부터 조건 함수가 `true`를 반환하는 동안 요소를 제거하고, 조건 함수가 `false`를 반환하면 중단해요.

```typescript
import { dropWhile } from 'es-toolkit/array';

// 시작부터 3보다 작은 요소들을 제거해요.
const numbers = [1, 2, 3, 4, 2, 5];
dropWhile(numbers, x => x < 3);
// Returns: [3, 4, 2, 5]
// 1과 2가 조건을 만족해서 제거되고, 3에서 조건이 false가 되어 중단돼요.

// 객체 배열에서 특정 조건의 요소들을 제거해요.
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
  { name: 'David', active: true },
];
dropWhile(users, user => !user.active);
// Returns: [{ name: 'Charlie', active: true }, { name: 'David', active: true }]
```

빈 배열이나 조건을 만족하는 요소가 없으면 원본 배열과 같은 새 배열을 반환해요.

```typescript
import { dropWhile } from 'es-toolkit/array';

dropWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropWhile([], x => true); // []
```

#### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열이에요.
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 요소를 계속 제거할지 결정하는 조건 함수예요. 배열의 각 요소와 인덱스, 전체 배열을 받아서 참 또는 거짓을 반환해요.

#### 반환 값

(`T[]`): 조건을 만족하지 않는 요소부터 배열의 끝까지를 포함한 새 배열이에요.
