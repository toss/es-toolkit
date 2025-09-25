# dropWhile (Lodash 호환성)

::: warning `es-toolkit`의 `dropWhile`을 사용하세요

이 `dropWhile` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [dropWhile](../../array/dropWhile.md)을 사용하세요.

:::

조건 함수에 따라 배열의 시작에서부터 요소를 제거해요.

```typescript
const result = dropWhile(array, predicate);
```

## 레퍼런스

### `dropWhile(array, predicate)`

배열의 시작에서부터 특정 조건을 만족하는 요소들을 연속으로 제거하고 싶을 때 `dropWhile`을 사용하세요. 조건 함수가 `false`를 반환하면 제거를 중단해요.

```typescript
import { dropWhile } from 'es-toolkit/compat';

// 함수를 조건으로 사용해요.
dropWhile([1, 2, 3, 4, 5], n => n < 3);
// Returns: [3, 4, 5]

// 객체 패턴으로 매칭해요.
const users = [
  { name: 'alice', active: false },
  { name: 'bob', active: false },
  { name: 'charlie', active: true },
];

dropWhile(users, { active: false });
// Returns: [{ name: 'charlie', active: true }]

// 배열 형태로 속성과 값을 지정해요.
dropWhile(users, ['active', false]);
// Returns: [{ name: 'charlie', active: true }]

// 속성 이름으로 조건을 확인해요.
const items = [{ visible: false }, { visible: false }, { visible: true }];

dropWhile(items, 'visible');
// Returns: [{ visible: false }, { visible: false }, { visible: true }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { dropWhile } from 'es-toolkit/compat';

dropWhile(null, x => x > 0); // []
dropWhile(undefined, x => x > 0); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 제거할 배열이에요.
- `predicate` (`ListIteratee<T>`, 선택): 각 요소에 적용할 조건 함수예요. 함수, 객체 패턴, 배열 패턴, 또는 속성 이름을 받을 수 있어요. 기본값은 `identity`예요.

#### 반환 값

(`T[]`): 조건을 만족하지 않는 첫 번째 요소부터의 새로운 배열을 반환해요.
