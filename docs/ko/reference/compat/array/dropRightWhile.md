# dropRightWhile (Lodash 호환성)

::: warning `es-toolkit`의 `dropRightWhile`을 사용하세요

이 `dropRightWhile` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 다양한 조건 함수 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [dropRightWhile](../../array/dropRightWhile.md)을 사용하세요.

:::

조건 함수에 따라 배열의 끝에서부터 요소를 제거해요.

```typescript
const result = dropRightWhile(array, predicate);
```

## 레퍼런스

### `dropRightWhile(array, predicate)`

배열의 끝에서부터 특정 조건을 만족하는 요소들을 연속으로 제거하고 싶을 때 `dropRightWhile`을 사용하세요. 조건 함수가 `false`를 반환하면 제거를 중단해요.

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

// 함수를 조건으로 사용해요.
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

dropRightWhile(users, user => !user.active);
// Returns: [{ user: 'barney', active: true }]

// 객체 패턴으로 매칭해요.
dropRightWhile(users, { user: 'pebbles', active: false });
// Returns: [{ user: 'barney', active: true }, { user: 'fred', active: false }]

// 배열 형태로 속성과 값을 지정해요.
dropRightWhile(users, ['active', false]);
// Returns: [{ user: 'barney', active: true }]

// 속성 이름으로 조건을 확인해요.
dropRightWhile(users, 'active');
// Returns: [{ user: 'barney', active: true }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { dropRightWhile } from 'es-toolkit/compat';

dropRightWhile(null, x => x > 0); // []
dropRightWhile(undefined, x => x > 0); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 제거할 배열이에요.
- `predicate` (`ListIteratee<T>`, 선택): 각 요소에 적용할 조건 함수예요. 함수, 객체 패턴, 배열 패턴, 또는 속성 이름을 받을 수 있어요.

#### 반환 값

(`T[]`): 조건을 만족하지 않는 첫 번째 요소부터의 새로운 배열을 반환해요.
