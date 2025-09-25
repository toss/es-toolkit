# xor (Lodash 호환성)

::: warning `es-toolkit`의 [xor](../../array/xor.md)을 사용하세요

이 `xor` 함수는 `null`이나 `undefined` 처리, 복잡한 중복 계산 로직 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [xor](../../array/xor.md)를 사용하세요.

:::

여러 배열들에서 정확히 하나의 배열에만 존재하는 요소들로 구성된 새 배열을 만들어요.

```typescript
const result = xor(...arrays);
```

## 레퍼런스

### `xor(...arrays)`

여러 배열의 대칭 차집합을 계산해요. 즉, 주어진 배열들 중 정확히 하나의 배열에만 존재하는 요소들을 반환해요. 두 개 이상의 배열을 비교할 때 겹치지 않는 고유한 요소들을 찾고 싶을 때 유용해요.

```typescript
import { xor } from 'es-toolkit/compat';

// 두 배열의 대칭 차집합
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// Returns: [1, 2, 5, 6]

// 세 배열의 대칭 차집합
xor([1, 2], [2, 3], [4, 5]);
// Returns: [1, 3, 4, 5]

// 문자열 배열
xor(['a', 'b'], ['b', 'c']);
// Returns: ['a', 'c']

// 하나의 배열만 제공
xor([1, 2, 3]);
// Returns: [1, 2, 3]
```

`null`이나 `undefined`, 빈 배열은 무시되고 유효한 배열만 처리해요.

```typescript
import { xor } from 'es-toolkit/compat';

xor([1, 2], null, [2, 3]);
// Returns: [1, 3]

xor([], [1, 2], [2, 3]);
// Returns: [1, 3]
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 대칭 차집합을 계산할 배열들이에요. `null`이나 `undefined`는 무시돼요.

#### 반환 값

(`T[]`): 정확히 하나의 배열에만 존재하는 요소들로 구성된 새 배열을 반환해요.
