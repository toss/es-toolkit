# flatten

중첩된 배열을 지정된 깊이까지 평탄화한 새 배열을 반환해요.

```typescript
const result = flatten(arr, depth);
```

## 사용법

### `flatten(arr, depth = 1)`

중첩된 배열을 특정 깊이까지 평탄화하고 싶을 때 `flatten`을 사용하세요. 배열 안의 배열들을 지정된 레벨까지 풀어서 평면적인 구조로 만들어줘요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)과 동일하게 동작하지만, 더 빨라요.

```typescript
import { flatten } from 'es-toolkit/array';

// 기본 깊이 1로 평탄화해요.
const array = [1, [2, 3], [4, [5, 6]]];
flatten(array);
// Returns: [1, 2, 3, 4, [5, 6]]

// 깊이 2로 평탄화해요.
flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

깊이를 조절해서 원하는 레벨까지만 평탄화할 수 있어요.

```typescript
import { flatten } from 'es-toolkit/array';

const array = [1, [2, 3], [4, [5, 6]]];

// 깊이 1로 평탄화 (기본값)
const result1 = flatten(array, 1);
// Returns: [1, 2, 3, 4, [5, 6]]

// 깊이 2로 평탄화
const result2 = flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### 파라미터

- `arr` (`T[]`): 평탄화할 중첩 배열이에요.
- `depth` (`D`, 선택): 평탄화할 깊이예요. 기본값은 `1`이에요.

#### 반환 값

(`Array<FlatArray<T[], D>>`): 지정된 깊이까지 평탄화된 새 배열을 반환해요.
