# initial

배열의 마지막 요소를 제외한 모든 요소로 이루어진 새 배열을 반환해요.

```typescript
const result = initial(arr);
```

## 레퍼런스

### `initial(arr)`

배열에서 마지막 요소만 제외하고 나머지 모든 요소를 가져오고 싶을 때 `initial`을 사용하세요. 배열이 비어있거나 요소가 하나뿐이면 빈 배열을 반환해요. 배열의 끝 부분을 제외하고 처리할 때 유용해요.

```typescript
import { initial } from 'es-toolkit/array';

// 숫자 배열에서 마지막 요소를 제외해요.
const numbers = [1, 2, 3, 4, 5];
initial(numbers);
// Returns: [1, 2, 3, 4]

// 문자열 배열에서 마지막 요소를 제외해요.
const strings = ['a', 'b', 'c'];
initial(strings);
// Returns: ['a', 'b']

// 요소가 하나뿐인 배열은 빈 배열을 반환해요.
const single = [42];
initial(single);
// Returns: []
```

빈 배열이나 특수한 경우도 안전하게 처리해요.

```typescript
import { initial } from 'es-toolkit/array';

// 빈 배열은 빈 배열을 반환해요.
const empty: number[] = [];
initial(empty);
// Returns: []

// 중첩 배열도 처리할 수 있어요.
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
initial(nested);
// Returns: [[1, 2], [3, 4]]
```

#### 파라미터

- `arr` (`readonly T[]`): 마지막 요소를 제외할 배열이에요.

#### 반환 값

(`T[]`): 마지막 요소를 제외한 새 배열을 반환해요. 입력 배열이 비어있거나 요소가 하나뿐이면 빈 배열을 반환해요.
