# flatMap

배열의 각 요소를 함수가 반환하는 값으로 바꾼 후, 지정된 깊이까지 평탄화한 새 배열을 반환해요.

```typescript
const result = flatMap(arr, iteratee, depth);
```

## 사용법

### `flatMap(arr, iteratee, depth = 1)`

배열의 각 요소를 변환하면서 동시에 평탄화하고 싶을 때 `flatMap`을 사용하세요. 먼저 각 요소에 함수를 적용한 후, 결과 배열을 지정된 깊이까지 평탄화해요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)을 [Array#map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)과 함께 `map(iteratee).flat(depth)`으로 호출했을 때와 동일하게 동작하지만, 더 빨라요.

```typescript
import { flatMap } from 'es-toolkit/array';

// 숫자 배열의 각 요소를 두 번 복사해요.
const arr = [1, 2, 3];
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// 깊이 2로 평탄화해요.
flatMap(arr, item => [[item, item]], 2);
// Returns: [1, 1, 2, 2, 3, 3]
```

다양한 깊이로 평탄화할 수 있어요.

```typescript
import { flatMap } from 'es-toolkit/array';

const arr = [1, 2, 3];

// 기본 깊이 1로 평탄화해요.
flatMap(arr, item => [item, item]);
// Returns: [1, 1, 2, 2, 3, 3]

// 깊이 3으로 평탄화해요.
flatMap(arr, item => [[[item, item]]], 3);
// Returns: [1, 1, 2, 2, 3, 3]
```

#### 파라미터

- `arr` (`T[]`): 변환할 배열이에요.
- `iteratee` (`(item: T) => U`): 각 배열 요소를 변환하는 함수예요.
- `depth` (`D`, 선택): 평탄화할 깊이예요. 기본값은 `1`이에요.

#### 반환 값

(`Array<FlatArray<U[], D>>`): 각 요소가 변환되고 지정된 깊이까지 평탄화된 새 배열을 반환해요.
