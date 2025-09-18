# reject (Lodash 호환성)

::: warning `Array.filter()`를 사용하세요

이 `reject` 함수는 Lodash와의 호환성을 위해 여러 형태의 predicate를 지원하므로 복잡하게 구현되어 있어요. 간단한 함수 predicate를 사용하는 경우에는 `Array.filter()`가 더 간단하고 빠르게 동작해요.

대신 더 빠르고 현대적인 `Array.filter()`를 사용하세요.

:::

컬렉션을 순회하며 predicate에 맞지 않는 요소들을 새 배열로 반환해요.

```typescript
const filtered = reject(collection, predicate);
```

## 레퍼런스

### `reject(collection, predicate)`

배열, 객체, 또는 문자열에서 주어진 조건에 맞지 않는 요소들만 골라서 새 배열로 반환해요. `filter`의 반대 동작을 수행해요.

```typescript
import { reject } from 'es-toolkit/compat';

// 짝수가 아닌 숫자들을 필터링해요
reject([1, 2, 3, 4, 5], n => n % 2 === 0);
// => [1, 3, 5]

// 특정 속성을 가지지 않는 객체들을 필터링해요
reject([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
// => [{ b: 1 }]

// 특정 속성값을 가지지 않는 객체들을 필터링해요
reject([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// => [{ a: 1 }, { a: 3 }]

// 문자열에서 특정 문자가 아닌 문자들을 필터링해요
reject('abc', char => char === 'b');
// => ['a', 'c']
```

이 함수는 다양한 형태의 predicate를 지원해요.

```typescript
import { reject } from 'es-toolkit/compat';

// 함수를 사용한 조건
reject(users, user => user.age < 18);

// 객체의 부분 매칭
reject(users, { active: false });

// 속성-값 배열
reject(users, ['status', 'pending']);

// 속성명으로 truthy 값 확인
reject(users, 'premium');
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 순회할 컬렉션이에요.
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, 선택): 각 요소에 대해 실행할 조건이에요. 기본값은 `identity`예요.

### 반환 값

(`T[]`): predicate 조건에 맞지 않는 요소들로 구성된 새 배열을 반환해요.
