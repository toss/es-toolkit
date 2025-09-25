# unionBy (Lodash 호환성)

::: warning `es-toolkit`의 [unionBy](../../array/unionBy.md)를 사용하세요

이 `unionBy` 함수는 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [unionBy](../../array/unionBy.md)를 사용하세요.

:::

여러 배열을 합치고 지정한 기준으로 고유한 값들만 남겨요.

```typescript
const result = unionBy(...arrays, iteratee);
```

## 레퍼런스

### `unionBy(...arrays, iteratee)`

여러 배열들을 합치고 주어진 기준 함수로 중복을 제거해서 고유한 값들만 포함하는 새로운 배열을 만들고 싶을 때 `unionBy`를 사용하세요. 각 값이 처음 나타나는 순서를 유지해요.

```typescript
import { unionBy } from 'es-toolkit/compat';

// 소수점을 내림해서 비교
unionBy([2.1], [1.2, 2.3], Math.floor);
// Returns: [2.1, 1.2]

// 객체의 속성으로 비교
unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// Returns: [{ x: 1 }, { x: 2 }]

// 함수로 비교
unionBy(
  [{ id: 1, name: 'a' }],
  [
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
  ],
  item => item.id
);
// Returns: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]

// 부분 객체로 비교
unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], { x: 1 });
// Returns: [{ x: 1, y: 1 }]

// 속성-값 배열로 비교
unionBy([{ active: true, name: 'a' }], [{ active: false, name: 'b' }], ['active', true]);
// Returns: [{ active: true, name: 'a' }, { active: false, name: 'b' }]
```

`null`이나 `undefined` 배열은 무시해요.

```typescript
import { unionBy } from 'es-toolkit/compat';

unionBy([1, 2], null, undefined, [3, 4], x => x);
// Returns: [1, 2, 3, 4]
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 합칠 배열들이에요.
- `iteratee` (`ValueIteratee<T>`): 고유성을 결정할 기준이에요. 함수, 속성 이름, 부분 객체, 속성-값 배열을 사용할 수 있어요.

#### 반환 값

(`T[]`): 지정한 기준으로 중복을 제거한 고유한 값들을 포함하는 새로운 배열을 반환해요.
