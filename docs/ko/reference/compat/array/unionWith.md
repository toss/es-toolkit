# unionWith (Lodash 호환성)

::: warning `es-toolkit`의 `unionWith`를 사용하세요

이 `unionWith` 함수는 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [unionWith](../../array/unionWith.md)를 사용하세요.

:::

여러 배열을 합치고 비교 함수로 고유한 값들만 남겨요.

```typescript
const result = unionWith(...arrays, comparator);
```

## 레퍼런스

### `unionWith(...arrays, comparator)`

여러 배열들을 합치고 커스텀 비교 함수로 중복을 제거해서 고유한 값들만 포함하는 새로운 배열을 만들고 싶을 때 `unionWith`를 사용하세요. 각 값이 처음 나타나는 순서를 유지해요.

```typescript
import { unionWith } from 'es-toolkit/compat';

// 커스텀 비교 함수 사용
const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];

unionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// Returns: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]

// 간단한 동등성 비교
unionWith([1, 2], [2, 3], (a, b) => a === b);
// Returns: [1, 2, 3]

// 문자열 길이로 비교
unionWith(['ab', 'cd'], ['ef', 'gh', 'ab'], (a, b) => a.length === b.length);
// Returns: ['ab', 'ef']
```

`null`이나 `undefined` 배열은 무시해요.

```typescript
import { unionWith } from 'es-toolkit/compat';

unionWith([1, 2], null, undefined, [3, 4], (a, b) => a === b);
// Returns: [1, 2, 3, 4]
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 합칠 배열들이에요.
- `comparator` (`(a: T, b: T) => boolean`): 두 값이 같은지 판단하는 비교 함수예요.

### 반환 값

(`T[]`): 비교 함수로 중복을 제거한 고유한 값들을 포함하는 새로운 배열을 반환해요.
