# every (Lodash 호환성)

::: warning `Array.prototype.every()`를 사용하세요

이 `every` 함수는 복잡한 객체 처리, 다양한 조건 형태 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.every()`를 사용하세요.

:::

배열이나 객체의 모든 값이 주어진 조건에 맞는지 반환해요.

```typescript
const result = every(collection, predicate);
```

## 레퍼런스

### `every(collection, predicate?)`

배열이나 객체의 모든 요소가 특정 조건을 만족하는지 확인하고 싶을 때 `every`를 사용하세요. 조건은 함수, 부분 객체, 프로퍼티-값 쌍, 프로퍼티 이름 등 다양한 형태로 지정할 수 있어요.

```typescript
import { every } from 'es-toolkit/compat';

// 검사 함수 사용
const numbers = [2, 4, 6, 8];
every(numbers, x => x % 2 === 0);
// Returns: true

// 프로퍼티 이름 사용
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true }
];
every(users, 'active');
// Returns: true

// 부분 객체 사용
every(users, { active: true });
// Returns: true

// 프로퍼티-값 쌍 사용
every(users, ['active', true]);
// Returns: true
```

객체에 대해서도 동일하게 동작해요.

```typescript
import { every } from 'es-toolkit/compat';

const scores = { math: 90, english: 85, science: 92 };
every(scores, score => score >= 80);
// Returns: true
```

`null`이나 `undefined`는 빈 컬렉션으로 처리하여 `true`를 반환해요.

```typescript
import { every } from 'es-toolkit/compat';

every(null);
// Returns: true

every(undefined);
// Returns: true
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, any> | null | undefined`): 검사할 배열이나 객체예요.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 선택): 검사 조건이에요. 함수, 부분 객체, 프로퍼티-값 쌍, 프로퍼티 이름을 사용할 수 있어요. 기본값은 `identity` 함수예요.

### 반환 값

(`boolean`): 모든 요소가 조건을 만족하면 `true`, 그렇지 않으면 `false`를 반환해요.