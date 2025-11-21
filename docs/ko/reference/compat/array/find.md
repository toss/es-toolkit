# find (Lodash 호환성)

::: warning `Array.prototype.find()`를 사용하세요

이 `find` 함수는 복잡한 객체 처리, 다양한 조건 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.find()`를 사용하세요.

:::

배열이나 객체에서 조건에 맞는 첫 번째 요소를 찾아요.

```typescript
const result = find(collection, predicate, fromIndex);
```

## 사용법

### `find(collection, predicate, fromIndex?)`

배열이나 객체에서 특정 조건을 만족하는 첫 번째 요소를 찾고 싶을 때 `find`를 사용하세요. 조건은 함수, 부분 객체, 프로퍼티-값 쌍, 프로퍼티 이름 등 다양한 형태로 지정할 수 있어요.

```typescript
import { find } from 'es-toolkit/compat';

// 검사 함수 사용
const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 3);
// Returns: 4

// 프로퍼티 이름 사용
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
];
find(users, 'active');
// Returns: { name: 'Bob', active: true }

// 부분 객체 사용
find(users, { active: true });
// Returns: { name: 'Bob', active: true }

// 프로퍼티-값 쌍 사용
find(users, ['name', 'Charlie']);
// Returns: { name: 'Charlie', active: true }
```

시작 인덱스를 지정할 수 있어요.

```typescript
import { find } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
find(numbers, x => x > 2, 2);
// Returns: 3 (인덱스 2부터 검색 시작)
```

객체에 대해서도 동일하게 동작해요.

```typescript
import { find } from 'es-toolkit/compat';

const scores = { math: 90, english: 75, science: 85 };
find(scores, score => score >= 80);
// Returns: 90
```

`null`이나 `undefined`는 빈 컬렉션으로 처리해서 `undefined`를 반환해요.

```typescript
import { find } from 'es-toolkit/compat';

find(null, x => x > 0);
// Returns: undefined

find(undefined, x => x > 0);
// Returns: undefined
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 검색할 배열이나 객체예요.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`): 검색 조건이에요. 함수, 부분 객체, 프로퍼티-값 쌍, 프로퍼티 이름을 사용할 수 있어요.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스예요. 기본값은 `0`이에요.

#### 반환 값

(`T | undefined`): 조건을 만족하는 첫 번째 요소를 반환해요. 찾지 못하면 `undefined`를 반환해요.
