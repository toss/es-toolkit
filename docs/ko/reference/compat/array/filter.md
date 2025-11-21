# filter (Lodash 호환성)

::: warning `Array.prototype.filter()`를 사용하세요

이 `filter` 함수는 복잡한 객체 처리, 다양한 조건 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.filter()`를 사용하세요.

:::

주어진 조건을 만족하는 요소들로 새로운 배열을 만들어요.

```typescript
const result = filter(collection, predicate);
```

## 사용법

### `filter(collection, predicate)`

배열이나 객체에서 특정 조건을 만족하는 요소들만 걸러내고 싶을 때 `filter`를 사용하세요. 조건은 함수, 부분 객체, 프로퍼티-값 쌍, 프로퍼티 이름 등 다양한 형태로 지정할 수 있어요.

```typescript
import { filter } from 'es-toolkit/compat';

// 검사 함수 사용
const numbers = [1, 2, 3, 4, 5];
filter(numbers, x => x % 2 === 0);
// Returns: [2, 4]

// 프로퍼티 이름 사용
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];
filter(users, 'active');
// Returns: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// 부분 객체 사용
filter(users, { active: true });
// Returns: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]

// 프로퍼티-값 쌍 사용
filter(users, ['active', true]);
// Returns: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
```

객체에 대해서도 동일하게 동작해서 조건을 만족하는 값들의 배열을 반환해요.

```typescript
import { filter } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
filter(scores, score => score >= 80);
// Returns: [90, 85]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { filter } from 'es-toolkit/compat';

filter(null, x => x > 0);
// Returns: []

filter(undefined, x => x > 0);
// Returns: []
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 필터링할 배열이나 객체예요.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): 필터링 조건이에요. 함수, 부분 객체, 프로퍼티-값 쌍, 프로퍼티 이름을 사용할 수 있어요.

#### 반환 값

(`T[]`): 조건을 만족하는 요소들로 이루어진 새로운 배열을 반환해요.
