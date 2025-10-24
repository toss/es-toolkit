# union (Lodash 호환성)

::: warning `es-toolkit`의 [union](../../array/union.md)을 사용하세요

이 `union` 함수는 복잡한 배열 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [union](../../array/union.md)을 사용하세요.

:::

여러 배열에서 고유한 값들만 모아서 새로운 배열을 만들어요.

```typescript
const result = union(...arrays);
```

## 레퍼런스

### `union(...arrays)`

여러 배열들을 합치고 중복을 제거해서 고유한 값들만 포함하는 새로운 배열을 만들고 싶을 때 `union`을 사용하세요. 각 값이 처음 나타나는 순서를 유지해요.

```typescript
import { union } from 'es-toolkit/compat';

// 숫자 배열들 합치기
union([2], [1, 2]);
// Returns: [2, 1]

// 여러 배열 합치기
union([2], [1, 2], [2, 3]);
// Returns: [2, 1, 3]

// 중첩된 배열은 평평하게 하지 않아요
union([1, 3, 2], [1, [5]], [2, [4]]);
// Returns: [1, 3, 2, [5], [4]]

// 배열이 아닌 값은 무시해요
union([0], 3, { '0': 1 }, null, [2, 1]);
// Returns: [0, 2, 1]

// 배열과 유사한 객체도 처리해요
union([0], { 0: 'a', length: 1 }, [2, 1]);
// Returns: [0, 'a', 2, 1]
```

`null`이나 `undefined`는 무시해요.

```typescript
import { union } from 'es-toolkit/compat';

union([1, 2], null, undefined, [3, 4]);
// Returns: [1, 2, 3, 4]
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 합칠 배열들이에요. 배열이 아닌 값들은 무시돼요.

#### 반환 값

(`T[]`): 모든 배열의 고유한 값들을 포함하는 새로운 배열을 반환해요.
