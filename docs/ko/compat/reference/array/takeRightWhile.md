# takeRightWhile (Lodash 호환성)

::: warning `es-toolkit`의 [takeRightWhile](../../array/takeRightWhile.md)를 사용하세요

이 `takeRightWhile` 함수는 `null`이나 `undefined` 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [takeRightWhile](../../array/takeRightWhile.md)를 사용하세요.

:::

조건을 만족하는 동안 배열의 뒤에서부터 요소들을 가져와요.

```typescript
const result = takeRightWhile(array, predicate);
```

## 사용법

### `takeRightWhile(array, predicate)`

배열의 끝에서부터 시작해서 조건을 만족하는 동안 요소들을 가져와서 새로운 배열을 만들고 싶을 때 `takeRightWhile`를 사용하세요. 조건이 거짓으로 평가되면 멈춰요.

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

// 함수 조건 사용
const numbers = [1, 2, 3, 4, 5];
takeRightWhile(numbers, x => x > 3);
// Returns: [4, 5]

// 객체 속성 조건 사용
const users = [
  { user: 'barney', active: true },
  { user: 'fred', active: false },
  { user: 'pebbles', active: false },
];

takeRightWhile(users, o => !o.active);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// 부분 객체로 조건 매칭
takeRightWhile(users, { active: false });
// Returns: [{ user: 'pebbles', active: false }]

// 속성-값 배열로 조건 매칭
takeRightWhile(users, ['active', false]);
// Returns: [{ user: 'fred', active: false }, { user: 'pebbles', active: false }]

// 속성명으로 참으로 평가되는 값 확인
const items = [{ active: false }, { active: true }, { active: true }];
takeRightWhile(items, 'active');
// Returns: [{ active: true }, { active: true }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { takeRightWhile } from 'es-toolkit/compat';

takeRightWhile(null, x => x > 0); // []
takeRightWhile(undefined, x => x > 0); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 처리할 배열이에요.
- `predicate` (`ListIteratee<T>`, 선택): 각 요소에 대해 실행할 조건이에요. 함수, 부분 객체, 속성-값 배열, 속성명을 사용할 수 있어요. 기본값은 항등 함수예요.

#### 반환 값

(`T[]`): 조건을 만족하는 동안 배열의 뒤에서부터 가져온 요소들의 새로운 배열을 반환해요.
