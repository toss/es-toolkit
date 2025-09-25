# flattenDeep (Lodash 호환성)

::: warning `es-toolkit`의 `flattenDeep`을 사용하세요

이 `flattenDeep` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flattenDeep](../../array/flattenDeep.md)을 사용하세요.

:::

배열을 완전히 평탄화해요.

```typescript
const result = flattenDeep(array);
```

## 레퍼런스

### `flattenDeep(value)`

중첩 배열을 모든 깊이에서 재귀적으로 평탄화해요. 모든 중첩 수준이 제거되어 완전히 평탄화된 1차원 배열을 반환해요.

```typescript
import { flattenDeep } from 'es-toolkit/compat';

// 깊이 중첩된 배열 완전 평탄화
flattenDeep([1, [2, [3, [4]], 5]]);
// 결과: [1, 2, 3, 4, 5]

// 복잡한 중첩 구조도 완전 평탄화
flattenDeep([1, [2, [3, [[[[4]]]]], 5]]);
// 결과: [1, 2, 3, 4, 5]

// 혼합된 타입도 지원
flattenDeep(['a', ['b', ['c', [['d']]]]]);
// 결과: ['a', 'b', 'c', 'd']
```

빈 배열이나 null, undefined는 빈 배열을 반환해요.

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep(null); // []
flattenDeep(undefined); // []
flattenDeep([]); // []
```

이미 평탄화된 배열은 그대로 복사돼요.

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep([1, 2, 3, 4, 5]);
// 결과: [1, 2, 3, 4, 5]
```

#### 파라미터

- `value` (`ListOfRecursiveArraysOrValues<T> | null | undefined`): 완전히 평탄화할 배열이에요.

#### 반환 값

(`Array<T>`): 모든 중첩이 제거된 완전히 평탄화된 새 배열을 반환해요.
