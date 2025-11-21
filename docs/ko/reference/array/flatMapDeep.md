# flatMapDeep

배열의 각 요소를 함수가 반환하는 값으로 바꾼 후, 모든 깊이를 평탄화한 새 배열을 반환해요.

```typescript
const result = flatMapDeep(arr, iteratee);
```

## 사용법

### `flatMapDeep(arr, iteratee)`

배열의 각 요소를 변환하면서 동시에 모든 중첩 배열을 완전히 평탄화하고 싶을 때 `flatMapDeep`을 사용하세요. 먼저 각 요소에 함수를 적용한 후, 결과 배열을 모든 깊이까지 평탄화해요.

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// 각 요소를 두 번 복사한 후 완전히 평탄화해요.
const result1 = flatMapDeep([1, 2, 3], item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]
```

아무리 깊게 중첩된 배열도 모든 깊이를 평탄화해요.

```typescript
import { flatMapDeep } from 'es-toolkit/array';

// 중첩 배열도 완전히 평탄화해요.
const result = flatMapDeep([1, 2, 3], item => [[item, item]]);
// Returns: [1, 1, 2, 2, 3, 3]

// 여러 레벨의 중첩도 모두 평탄화해요.
const result2 = flatMapDeep([1, 2, 3], item => [[[item, item]]]);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### 파라미터

- `arr` (`T[]`): 변환할 배열이에요.
- `iteratee` (`(item: T) => U`): 각 배열 요소를 변환하는 함수예요.

#### 반환 값

(`Array<ExtractNestedArrayType<U>>`): 각 요소가 변환되고 모든 깊이가 평탄화된 새 배열을 반환해요.
