# head

배열의 첫 번째 요소를 반환해요.

```typescript
const firstElement = head(arr);
```

## 레퍼런스

### `head(arr)`

배열의 첫 번째 요소를 가져오고 싶을 때 `head`를 사용하세요. 배열이 비어 있으면 `undefined`를 반환해요. 배열의 시작 부분에 있는 데이터에 접근할 때 유용해요.

```typescript
import { head } from 'es-toolkit/array';

// 숫자 배열의 첫 번째 요소를 가져와요.
const numbers = [1, 2, 3, 4, 5];
head(numbers);
// Returns: 1

// 문자열 배열의 첫 번째 요소를 가져와요.
const strings = ['a', 'b', 'c'];
head(strings);
// Returns: 'a'

// 빈 배열은 undefined를 반환해요.
const emptyArray: number[] = [];
head(emptyArray);
// Returns: undefined
```

타입이 안전하게 처리돼요.

```typescript
import { head } from 'es-toolkit/array';

// 비어있지 않은 배열의 경우 타입이 확실해요.
const nonEmptyArray = [1, 2, 3] as const;
head(nonEmptyArray);
// Returns: 1 (타입: 1)

// 일반 배열의 경우 undefined 가능성이 있어요.
const maybeEmptyArray = [1, 2, 3];
head(maybeEmptyArray);
// Returns: 1 | undefined (타입: number | undefined)
```

#### 파라미터

- `arr` (`readonly T[]`): 첫 번째 요소를 가져올 배열이에요.

#### 반환 값

(`T | undefined`): 배열의 첫 번째 요소예요. 배열이 비어 있으면 `undefined`를 반환해요.