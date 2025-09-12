# tail

배열의 첫 번째 요소를 제외한 모든 요소로 이루어진 새 배열을 반환해요.

```typescript
const result = tail(arr);
```

## 레퍼런스

### `tail(arr)`

배열에서 첫 번째 요소만 제외하고 나머지 모든 요소를 가져오고 싶을 때 `tail`을 사용하세요. 배열이 비어있거나 요소가 하나뿐이면 빈 배열을 반환해요. 스택이나 큐에서 첫 번째 요소를 제외한 나머지를 처리할 때 유용해요.

```typescript
import { tail } from 'es-toolkit/array';

// 숫자 배열에서 첫 번째 요소를 제외해요.
const numbers = [1, 2, 3, 4, 5];
tail(numbers);
// Returns: [2, 3, 4, 5]

// 문자열 배열에서 첫 번째 요소를 제외해요.
const strings = ['first', 'second', 'third'];
tail(strings);
// Returns: ['second', 'third']

// 요소가 하나뿐인 배열은 빈 배열을 반환해요.
const single = [42];
tail(single);
// Returns: []
```

빈 배열이나 특수한 경우도 안전하게 처리해요.

```typescript
import { tail } from 'es-toolkit/array';

// 빈 배열은 빈 배열을 반환해요.
const empty: number[] = [];
tail(empty);
// Returns: []

// 중첩 배열도 처리할 수 있어요.
const nested = [[1, 2], [3, 4], [5, 6]];
tail(nested);
// Returns: [[3, 4], [5, 6]]

// 객체 배열도 처리할 수 있어요.
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
tail(users);
// Returns: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

#### 파라미터

- `arr` (`readonly T[]`): 첫 번째 요소를 제외할 배열이에요.

#### 반환 값

(`T[]`): 첫 번째 요소를 제외한 새 배열을 반환해요. 입력 배열이 비어있거나 요소가 하나뿐이면 빈 배열을 반환해요.