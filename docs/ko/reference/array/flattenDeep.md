# flattenDeep

중첩된 배열의 모든 깊이를 평탄화한 새 배열을 반환해요.

```typescript
const result = flattenDeep(arr);
```

## 레퍼런스

### `flattenDeep(arr)`

중첩된 배열을 아무리 깊더라도 완전히 평탄화하고 싶을 때 `flattenDeep`을 사용하세요. 배열 안의 모든 중첩 배열들을 풀어서 하나의 평면적인 구조로 만들어줘요.

JavaScript 언어에 포함된 [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)을 `flat(Infinity)`로 호출했을 때와 동일하게 동작하지만, 더 빨라요.

```typescript
import { flattenDeep } from 'es-toolkit/array';

// 모든 중첩 레벨을 평탄화해요.
const array = [1, [2, [3]], [4, [5, 6]]];
const result = flattenDeep(array);
// Returns: [1, 2, 3, 4, 5, 6]
```

아무리 복잡한 중첩 구조도 완전히 평탄화해요.

```typescript
import { flattenDeep } from 'es-toolkit/array';

const complexArray = [1, [2, [3, [4, [5]]]], 6];
const result = flattenDeep(complexArray);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### 파라미터

- `arr` (`T[]`): 평탄화할 중첩 배열이에요.

#### 반환 값

(`Array<ExtractNestedArrayType<T>>`): 모든 깊이가 평탄화된 새 배열을 반환해요.
