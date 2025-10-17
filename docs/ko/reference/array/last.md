# last

배열의 마지막 요소를 반환해요.

```typescript
const lastElement = last(arr);
```

## 레퍼런스

### `last(arr)`

배열의 마지막 요소를 가져오고 싶을 때 `last`를 사용하세요. 배열이 비어 있으면 `undefined`를 반환해요. 배열의 끝 부분에 있는 데이터에 접근할 때 유용해요.

```typescript
import { last } from 'es-toolkit/array';

// 숫자 배열의 마지막 요소를 가져와요.
const numbers = [1, 2, 3, 4, 5];
last(numbers);
// Returns: 5

// 문자열 배열의 마지막 요소를 가져와요.
const strings = ['a', 'b', 'c'];
last(strings);
// Returns: 'c'

// 빈 배열은 undefined를 반환해요.
const emptyArray: number[] = [];
last(emptyArray);
// Returns: undefined
```

타입이 안전하게 처리돼요.

```typescript
import { last } from 'es-toolkit/array';

// 비어있지 않은 배열의 경우 타입이 확실해요.
const nonEmptyArray = [1, 2, 3] as const;
last(nonEmptyArray);
// Returns: 3 (타입: 3)

// 일반 배열의 경우 undefined 가능성이 있어요.
const maybeEmptyArray = [1, 2, 3];
last(maybeEmptyArray);
// Returns: 3 | undefined (타입: number | undefined)
```

큰 배열에서도 효율적으로 작동해요.

```typescript
import { last } from 'es-toolkit/array';

// 성능상 최적화되어 있어요.
const largeArray = Array(1000000)
  .fill(0)
  .map((_, i) => i);
last(largeArray);
// Returns: 999999 (빠른 접근)

// 중첩 배열도 처리할 수 있어요.
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
last(nested);
// Returns: [5, 6]
```

#### 파라미터

- `arr` (`readonly T[]`): 마지막 요소를 가져올 배열이에요.

#### 반환 값

(`T | undefined`): 배열의 마지막 요소예요. 배열이 비어 있으면 `undefined`를 반환해요.
