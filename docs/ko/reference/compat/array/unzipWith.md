# unzipWith (Lodash 호환성)

::: warning 네이티브 배열 메서드를 사용하세요

이 `unzipWith` 함수는 `null`이나 `undefined` 처리, 복잡한 인자 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 네이티브 JavaScript 배열 메서드와 구조 분해 할당을 사용하세요.

:::

묶여있는 배열의 같은 위치에 있는 요소들을 모아서 변환 함수를 적용한 새 배열을 만들어요.

```typescript
const result = unzipWith(array, iteratee);
```

## 레퍼런스

### `unzipWith(array, iteratee)`

중첩된 배열에서 같은 인덱스에 있는 요소들을 모아서 변환 함수를 적용해요. `unzip` 함수와 비슷하지만, 각 그룹에 변환 함수를 적용할 수 있어요. 변환 함수를 제공하지 않으면 기본 `unzip` 동작을 수행해요.

```typescript
import { unzipWith } from 'es-toolkit/compat';

// 같은 위치의 요소들을 더하기
unzipWith([[1, 10, 100], [2, 20, 200]], (a, b) => a + b);
// Returns: [3, 30, 300]

// 변환 함수 없이 사용 (기본 unzip 동작)
unzipWith([[1, 4], [2, 5], [3, 6]]);
// Returns: [[1, 2, 3], [4, 5, 6]]

// 문자열 연결
unzipWith([['a', 'x'], ['b', 'y'], ['c', 'z']], (a, b) => a + b);
// Returns: ['abc', 'xyz']

// 최대값 찾기
unzipWith([[1, 10], [2, 20], [3, 5]], Math.max);
// Returns: [3, 20]
```

`null`이나 `undefined`, 빈 배열은 빈 배열로 처리해요.

```typescript
import { unzipWith } from 'es-toolkit/compat';

unzipWith(null, (a, b) => a + b); // []
unzipWith(undefined, (a, b) => a + b); // []
unzipWith([], (a, b) => a + b); // []
```

#### 파라미터

- `array` (`ArrayLike<ArrayLike<T>> | null | undefined`): 언집할 중첩 배열이에요.
- `iteratee` (`(...values: T[]) => R`, 선택): 각 그룹의 요소들에 적용할 변환 함수예요. 제공하지 않으면 기본 `unzip` 동작을 수행해요.

### 반환 값

(`R[]` 또는 `T[][]`): 변환 함수가 있으면 변환된 결과 배열을, 없으면 언집된 배열을 반환해요.
