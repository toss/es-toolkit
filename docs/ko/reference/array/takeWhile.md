# takeWhile

조건 함수가 참을 반환하는 동안 배열의 처음부터 요소를 가져와 새 배열을 만들어요.

```typescript
const taken = takeWhile(arr, predicate);
```

## 레퍼런스

### `takeWhile(arr, predicate)`

배열의 처음부터 특정 조건을 만족하는 요소들만 필요할 때 `takeWhile`을 사용하세요. 조건을 만족하지 않는 첫 번째 요소를 만나면 가져오기를 멈춰요.

```typescript
import { takeWhile } from 'es-toolkit/array';

// 3보다 작은 요소들만 가져와요.
takeWhile([1, 2, 3, 4], x => x < 3);
// Returns: [1, 2]

// 3보다 큰 요소는 처음부터 없으므로 빈 배열을 반환해요.
takeWhile([1, 2, 3, 4], x => x > 3);
// Returns: []
```

객체 배열에서도 사용할 수 있어요.

```typescript
import { takeWhile } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 40 },
];

// 30세 미만의 사용자들만 가져와요.
takeWhile(users, user => user.age < 30);
// Returns: [{ name: 'Alice', age: 25 }]
```

#### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `predicate` (`(element: T) => boolean`): 각 요소에 대해 호출되는 조건 함수예요. 이 함수가 참을 반환하는 동안 요소들을 가져와요.

#### 반환 값

(`T[]`): 조건 함수가 참을 반환하는 동안 처음부터 가져온 요소들을 포함한 새 배열을 반환해요.
